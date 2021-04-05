import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Label } from 'strapi-helper-plugin';

import styles from './styles.css';

export class ExternalUrlForm extends Component {
  state = {
    url: null
  };

  preAnalyzeImportFile = async event => {
    const url = event.target.value;

    this.props.onRequestAnalysis({ source: 'url', options: { url } });
  };

  render() {
    const { loadingAnalysis } = this.props;

    return (
      <Fragment>
        <Label message="Import from this URL:" />
        <input
          className={styles.urlInput}
          onChange={this.preAnalyzeImportFile}
          disabled={loadingAnalysis}
        />
      </Fragment>
    );
  }
}

ExternalUrlForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
};

export default injectIntl(ExternalUrlForm);
