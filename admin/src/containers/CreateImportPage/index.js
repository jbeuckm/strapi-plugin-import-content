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
import MappingTable from '../../components/MappingTable';

import styles from './styles.scss';
import { loadModels, saveImportConfig } from './actions';
import {
  makeSelectLoading,
  makeSelectModels,
  makeSelectCreated,
  makeSelectSaving
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class CreateImportPage extends Component {
  importSources = [
    { label: 'External URL ', value: 'url' },
    { label: 'Upload file', value: 'upload' }
  ];

  state = {
    importSource: 'url',
    analysisConfig: null,
    analysis: null,
    loadingAnalysis: false,
    selectedContentType: null,
    fieldMapping: {}
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

  onRequestAnalysis = async analysisConfig => {
    this.setState({ analysisConfig, loadingAnalysis: true });

    try {
      const response = await fetch('/import-content/preAnalyzeImportFile', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(analysisConfig)
      });

      const json = await response.json();

      this.setState({
        loadingAnalysis: false,
        analysis: response.status === 200 ? json : null
      });
    } catch (error) {
      this.setState({ loadingAnalysis: false });
      console.log({ error });
    }
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
    const importConfig = {
      ...this.state.analysisConfig,
      contentType: this.state.selectedContentType,
      fieldMapping: this.state.fieldMapping
    };

    this.props.saveImportConfig(importConfig);
  };

  selectImportSource = event => {
    this.setState({ importSource: event.target.value, analysis: null });
  };

  render() {
    const { models, loading, saving } = this.props;
    const {
      importSource,
      loadingAnalysis,
      analysis,
      fieldMapping
    } = this.state;

    const saveDisabled = loading || saving || fieldMapping === {};

    const modelOptions =
      models &&
      models.map(({ name }) => ({
        label: name,
        value: name
      }));

    return (
      <div className={styles.createImportPage}>
        <PluginHeader
          title={'Import Content'}
          description={'Import content from an RSS feed.'}
        />

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
  loading: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  created: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  loadModels,
  saveImportConfig
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  models: makeSelectModels(),
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
