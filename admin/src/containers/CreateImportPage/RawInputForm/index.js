import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Label from 'components/Label';
import InputTextArea from 'components/InputTextArea';
import InputSelect from 'components/InputSelect';
import Button from 'components/Button';
import InputSpacer from 'components/InputSpacer';

import styles from './styles.scss';

export class RawInputForm extends Component {
  state = {
    rawText: '',
    dataFormat: 'text/csv'
  };

  dataFormats = [{ label: 'csv', value: 'text/csv' }];

  changeDataFormat = event => {
    this.setState({ dataFormat: event.target.value });
  };

  textChanged = async event => {
    const rawText = event.target.value;
    this.setState({ rawText });
  };

  clickAnalyze = () => {
    const { dataFormat, rawText } = this.state;

    this.props.onRequestAnalysis({
      source: 'raw',
      type: dataFormat,
      options: { rawText }
    });
  };

  render() {
    const { loadingAnalysis } = this.props;
    const { dataFormat, rawText } = this.state;

    return (
      <Fragment>
        <table>
          <tr>
            <td>
              <Label message="data format:" />
            </td>
            <td>
              <InputSelect
                style={{ width: 50 }}
                selectOptions={this.dataFormats}
                value={dataFormat}
                onChange={this.changeDataFormat}
              />
            </td>
            <td>
              <Button
                label={'Analyze'}
                onClick={this.clickAnalyze}
                secondaryHotline
                loading={loadingAnalysis}
              />
            </td>
          </tr>
        </table>

        <InputTextArea
          className={styles.rawTextInput}
          textStyle={{
            fontFamily: 'monospace'
          }}
          onChange={this.textChanged}
          disabled={loadingAnalysis}
          value={rawText}
        />
      </Fragment>
    );
  }
}

RawInputForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
};

export default injectIntl(RawInputForm);
