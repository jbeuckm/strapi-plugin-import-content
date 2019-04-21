import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import pluginId from 'pluginId';

import Button from 'components/Button';
import PluginHeader from 'components/PluginHeader';

import styles from './styles.scss';
import { loadModels } from './actions';
import { makeSelectLoading, makeSelectModels } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ExamplePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { models: null, analysis: null };

    props.loadModels();
  }

  getModels = async () => {
    const response = await fetch('/content-type-builder/models');
    const json = await response.json();

    this.setState({ models: json });
  };

  preAnalyzeImportFile = async event => {
    const url = event.target.value;
    const response = await fetch(`/import/preAnalyzeImportFile?url=${url}`);
    const json = await response.json();

    this.setState({ analysis: json });
  };

  render() {
    const { models, loading } = this.props;
    const { analysis } = this.state;

    return (
      <div className={styles.examplePage}>
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
            />
          </div>
          {loading ? <p>loading...</p> : null}
        </div>

        {analysis && (
          <div className="row">
            <div className="col-md-12">
              <div>Found {analysis.itemCount} items...</div>
              <table>
                <tr>
                  <th>Field Name</th>
                  <th>Count</th>
                  <th>Format</th>
                  <th>Min Length</th>
                  <th>Max Length</th>
                  <th>Avg Length</th>
                </tr>
                {analysis.fieldStats.map(stat => (
                  <tr>
                    <td>{stat.fieldName}</td>
                    <td>{stat.count}</td>
                    <td>{stat.format}</td>
                    <td>{stat.minLength}</td>
                    <td>{stat.maxLength}</td>
                    <td>{stat.meanLength}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-12">
            <Button
              label={loading ? 'Loading...' : 'Submit'}
              disabled={loading}
              onClick={this.props.loadData}
              primary
            />
          </div>
        </div>
      </div>
    );
  }
}

ExamplePage.contextTypes = {
  router: PropTypes.object
};

ExamplePage.propTypes = {
  models: PropTypes.object.isRequired,
  loadModels: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  loadModels
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
  key: 'examplePage',
  reducer,
  pluginId
});
const withSaga = strapi.injectSaga({ key: 'examplePage', saga, pluginId });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(ExamplePage));
