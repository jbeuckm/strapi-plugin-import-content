import React, { Component } from 'react';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import pluginId from 'pluginId';

import {
  selectImportConfigs,
  selectImportConfigsError,
  selectImportConfigsLoading
} from './selectors';

import styles from './styles.scss';

import { loadImportConfigs, deleteImport } from './actions';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends Component {
  componentDidMount() {
    this.props.loadImportConfigs();
  }

  navigateToCreateImport = () => {
    this.props.history.push(`/plugins/${pluginId}/create`);
  };

  deleteImport = id => () => {
    console.log('delete', id);
    this.props.deleteImport(id);
  };

  render() {
    const { importConfigs } = this.props;

    return (
      <div className={styles.homePage}>
        <Button
          label="Create a new Import"
          onClick={this.navigateToCreateImport}
          secondaryHotlineAdd
        />

        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Created</td>
              <td>URL</td>
              <td>Progress</td>
            </tr>
          </thead>
          <tbody>
            {importConfigs &&
              importConfigs.map(item => (
                <tr className={item.inProgress ? styles.inProgress : null}>
                  <td>{item.id}</td>
                  <td>{item.created_at}</td>
                  <td>{item.url}</td>
                  <td>{item.progress}</td>
                  <td>
                    <Button
                      label="delete"
                      onClick={this.deleteImport(item.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

HomePage.contextTypes = {
  router: PropTypes.object
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  loadImports: PropTypes.func.isRequired,
  importConfigs: PropTypes.array,
  deleteImport: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  loadImportConfigs,
  deleteImport
};

const mapStateToProps = createStructuredSelector({
  importConfigs: selectImportConfigs(),
  loading: selectImportConfigsLoading(),
  error: selectImportConfigsError()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = strapi.injectReducer({
  key: 'homePage',
  reducer,
  pluginId
});
const withSaga = strapi.injectSaga({ key: 'homePage', saga, pluginId });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(HomePage));
