import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import pluginId from 'pluginId';

import Button from 'components/Button';
import PluginHeader from 'components/PluginHeader';
import MappingTable from '../../components/MappingTable';

import styles from './styles.scss';
import { loadModels, saveImportConfig } from './actions';
import { makeSelectLoading, makeSelectModels } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class CreateImportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      analysis: null,
      loadingAnalysis: false,
      selectedName: null,
      fieldMapping: {}
    };

    props.loadModels();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.models && nextProps.models) {
      this.setState({ selectedName: nextProps.models[0].name });
    }
  }

  preAnalyzeImportFile = async event => {
    const url = event.target.value;

    this.setState({ loadingAnalysis: true });
    const response = await fetch(
      `/import-content/preAnalyzeImportFile?url=${url}`
    );

    const json = await response.json();

    this.setState({ loadingAnalysis: false });
    this.setState({ url, analysis: json });
  };

  selectContentType = event => {
    const selectedName = event.target.value;
    this.setState({ selectedName });
  };

  getTargetModel = () => {
    const { models } = this.props;
    if (!models) return null;

    return models.find(model => model.name === this.state.selectedName);
  };

  setFieldMapping = fieldMapping => {
    this.setState({ fieldMapping });
  };

  onSaveImport = () => {
    const importConfig = {
      url: this.state.url,
      fieldMapping: this.state.fieldMapping
    };
    console.log('onSaveImport', importConfig);
    this.props.saveImportConfig(importConfig);
  };

  render() {
    const { models, loading } = this.props;
    const { loadingAnalysis, analysis } = this.state;

    return (
      <div className={styles.createImportPage}>
        <PluginHeader
          title={'Import Content'}
          description={'Import content from an RSS feed.'}
        />

        <div className="row">
          <div className="col-md-12">
            Import from this URL:
            <input
              className={styles.urlInput}
              onChange={this.preAnalyzeImportFile}
              disabled={loadingAnalysis}
            />
            {loadingAnalysis && <p>Loading...</p>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {loading && <p>Loading content types...</p>}
            {models && (
              <Fragment>
                <span>Import to content of this type:</span>
                <select onChange={this.selectContentType}>
                  {models.map(model => (
                    <option value={model.name}>{model.name}</option>
                  ))}
                </select>
              </Fragment>
            )}
          </div>
        </div>

        {analysis && (
          <MappingTable
            analysis={analysis}
            targetModel={this.getTargetModel()}
            onChange={this.setFieldMapping}
          />
        )}

        <div className="row">
          <div className="col-md-12">
            <Button
              label={loading ? 'Loading...' : 'Import'}
              disabled={loading}
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
  loading: PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  loadModels,
  saveImportConfig
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  models: makeSelectModels()
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
