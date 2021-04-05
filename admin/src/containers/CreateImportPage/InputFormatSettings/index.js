import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import _ from 'lodash';

import { Label } from 'strapi-helper-plugin';
import styles from './styles.css';

export class InputFormatSettings extends Component {
  onChangeOption = option => event => {
    const settings = _.clone(this.props.settings);
    settings[option] = event.target.value;

    this.props.onChange(settings);
  };

  render() {
    const { type, settings } = this.props;

    return (
      <div>
        {type === 'csv' && (
          <Fragment>
            <Label message="delimiter:" />
            <input
              className={styles.settingsInputField}
              onChange={this.onChangeOption('delimiter')}
              value={settings.delimiter}
            />
            <Label message="skip rows:" />
            <input
              type="number"
              min="0"
              className={styles.settingsInputField}
              onChange={this.onChangeOption('skipRows')}
              value={settings.skipRows}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

InputFormatSettings.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired
};

export default injectIntl(InputFormatSettings);
