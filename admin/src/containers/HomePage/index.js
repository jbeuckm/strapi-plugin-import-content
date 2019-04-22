import React, { Component } from 'react';
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

import { loadImportConfigs } from './actions';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends Component {
  componentDidMount() {
    this.props.loadImportConfigs();
  }

  render() {
    const { importConfigs } = this.props;

    return (
      <div className={styles.homePage}>
        {importConfigs &&
          importConfigs.map(item => (
            <tr>
              <td>{item.id}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
      </div>
    );
  }
}

HomePage.contextTypes = {
  router: PropTypes.object
};

HomePage.propTypes = {
  loadImports: PropTypes.func.isRequired,
  importConfigs: PropTypes.array
};

const mapDispatchToProps = {
  loadImportConfigs
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
