import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import pluginId from 'pluginId';

import Button from 'components/Button';
import PluginHeader from 'components/PluginHeader';
import InputSelect from 'components/InputSelect';
import InputSpacer from 'components/InputSpacer';
import Label from 'components/Label';

import ExternalUrlForm from './ExternalUrlForm';
import UploadFileForm from './UploadFileForm';
import RawInputForm from './RawInputForm';
import InputFormatSettings from './InputFormatSettings';
import MappingTable from '../../components/MappingTable';

import styles from './styles.scss';
import { loadModels, preAnalyze, saveImportConfig } from './actions';
import {
  makeSelectLoading,
  makeSelectModels,
  makeSelectAnalyzing,
  makeSelectAnalysis,
  makeSelectCreated,
  makeSelectSaving
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class CreateImportPage extends Component {
  importSources = [
    { label: 'External URL ', value: 'url' },
    { label: 'Upload file', value: 'upload' },
    { label: 'Raw text', value: 'raw' }
  ];

  state = {
    importSource: 'url',
    analysisConfig: null,
    selectedContentType: null,
    fieldMapping: {},
    inputFormatSettings: { delimiter: ',', skipRows: 0 }
  };

  componentDidMount() {
    this.props.loadModels();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.models && !this.state.selectedContentType) {
      this.setState({ selectedContentType: nextProps.models[0].name });
    }
    if (!this.props.created && nextProps.created) {
      this.props.history.push(`/plugins/${pluginId}`);
    }
  }

  getAnalysisConfigWithSettings = analysisConfig => {
    const { inputFormatSettings } = this.state;

    return {
      ...analysisConfig,
      options: {
        ...analysisConfig.options,
        ...inputFormatSettings
      }
    };
  };

  onRequestAnalysis = async analysisConfig => {
    this.analysisConfig = analysisConfig;

    const analysisConfigWithSettings = this.getAnalysisConfigWithSettings(
      analysisConfig
    );

    this.props.preAnalyze(analysisConfigWithSettings);
  };

  selectContentType = event => {
    const selectedContentType = event.target.value;

    this.setState({ selectedContentType });
  };

  getTargetModel = () => {
    const { models } = this.props;
    if (!models) return null;

    return models.find(model => model.name === this.state.selectedContentType);
  };

  setFieldMapping = fieldMapping => {
    this.setState({ fieldMapping });
  };

  onSaveImport = () => {
    const { selectedContentType, fieldMapping } = this.state;
    const { analysisConfig } = this;

    const analysisConfigWithSettings = this.getAnalysisConfigWithSettings(
      analysisConfig
    );

    const importConfig = {
      ...analysisConfigWithSettings,
      contentType: selectedContentType,
      fieldMapping
    };

    this.props.saveImportConfig(importConfig);
  };

  selectImportSource = event => {
    this.setState({ importSource: event.target.value });
  };

  updateInputFormatSettings = newSettings => {
    this.setState({ inputFormatSettings: newSettings });
  };

  render() {
    const { models, loading, loadingAnalysis, saving, analysis } = this.props;

    const { importSource, inputFormatSettings, fieldMapping } = this.state;

    const saveDisabled = loading || saving || fieldMapping === {};

    const modelOptions =
      models &&
      models.map(({ name }) => ({
        label: name,
        value: name
      }));

    return (
      <div className={styles.createImportPage}>
        <PluginHeader title={'Import Content'} />

        <div className="row">
          <div className="col-md-12">
            <table>
              <tr>
                <td style={{ minWidth: 200 }}>
                  <Label message="Import from..." />
                  <InputSelect
                    selectOptions={this.importSources}
                    value={importSource}
                    onChange={this.selectImportSource}
                  />
                </td>
                <td>
                  {loading && <p>Loading content types...</p>}
                  {modelOptions && (
                    <Fragment>
                      <Label message="Import to content of this type:" />
                      <InputSelect
                        selectOptions={modelOptions}
                        onChange={this.selectContentType}
                      />
                    </Fragment>
                  )}
                </td>
              </tr>
            </table>

            <InputSpacer />

            {importSource === 'upload' && (
              <UploadFileForm
                onRequestAnalysis={this.onRequestAnalysis}
                loadingAnalysis={loadingAnalysis}
              />
            )}

            {importSource === 'url' && (
              <ExternalUrlForm
                onRequestAnalysis={this.onRequestAnalysis}
                loadingAnalysis={loadingAnalysis}
              />
            )}

            {importSource === 'raw' && (
              <RawInputForm
                onRequestAnalysis={this.onRequestAnalysis}
                loadingAnalysis={loadingAnalysis}
              />
            )}
            <InputSpacer />

            <InputFormatSettings
              type={analysis && analysis.sourceType}
              settings={inputFormatSettings}
              onChange={this.updateInputFormatSettings}
            />

            {loadingAnalysis && <p>Analyzing...</p>}
            <InputSpacer />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {analysis && (
              <MappingTable
                analysis={analysis}
                targetModel={this.getTargetModel()}
                onChange={this.setFieldMapping}
              />
            )}

            <InputSpacer />

            <Button
              label={loading ? 'Loading...' : 'Import'}
              loader={saveDisabled}
              onClick={this.onSaveImport}
              primary
            />
          </div>
        </div>
      </div>
    );
  }
}

CreateImportPage.contextTypes = {
  router: PropTypes.object
};

CreateImportPage.propTypes = {
  models: PropTypes.object.isRequired,
  loadModels: PropTypes.func.isRequired,
  preAnalyze: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  created: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  loadModels,
  preAnalyze,
  saveImportConfig
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  models: makeSelectModels(),
  loadingAnalysis: makeSelectAnalyzing(),
  analysis: makeSelectAnalysis(),
  created: makeSelectCreated(),
  saving: makeSelectSaving()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = strapi.injectReducer({
  key: 'createImportPage',
  reducer,
  pluginId
});

const withSaga = strapi.injectSaga({ key: 'createImportPage', saga, pluginId });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(CreateImportPage));
