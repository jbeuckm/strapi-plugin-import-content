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
import { loadData } from './actions';
import { makeSelectLoading, makeSelectData } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ExamplePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { analysis: null };
  }

  preAnalyzeImportFile = async event => {
    const url = event.target.value;
    const response = await fetch(`/import/preAnalyzeImportFile?url=${url}`);
    const json = await response.json();

    this.setState({ analysis: json });
  };

  generateDataBlock() {
    if (this.props.data) {
      const items = this.props.data.map((item, i) => <li key={i}>{item}</li>);
      return (
        <div>
          <p>Data:</p>
          <ul>{items}</ul>
        </div>
      );
    }
    return;
  }

  render() {
    const dataBlock = this.generateDataBlock();

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

          {this.state.analysis && (
            <div>
              <div>Found {this.state.analysis.itemCount} items...</div>
              <table>
                <tr>
                  <th>Field Name</th>
                  <th>Count</th>
                  <th>Format</th>
                  <th>Min Length</th>
                  <th>Max Length</th>
                  <th>Avg Length</th>
                </tr>
                {this.state.analysis.fieldStats.map((stat, index) => (
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
          )}

          <div className="col-md-12">
            <p>This is an example of a fake API call.</p>
            <p>Loading: {this.props.loading ? 'yes' : 'no'}.</p>
            {dataBlock}
            <Button
              label={this.props.loading ? 'Loading...' : 'Submit'}
              disabled={this.props.loading}
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
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  loadData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  loadData
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  data: makeSelectData()
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
