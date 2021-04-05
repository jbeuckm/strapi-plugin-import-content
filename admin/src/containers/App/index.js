/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import pluginId from '../../pluginId';

import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import CreateImportPage from '../CreateImportPage';

import reducer from './reducer';

class App extends React.Component {
  render() {
    return (
      <div className={pluginId}>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route
            path={`/plugins/${pluginId}/create`}
            component={CreateImportPage}
            exact
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.contextTypes = {
  plugins: PropTypes.object,
  updatePlugin: PropTypes.func
};

App.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps);
const withReducer = strapi.injectReducer({ key: 'global', reducer, pluginId });

export default compose(
  withReducer,
  withConnect
)(App);
