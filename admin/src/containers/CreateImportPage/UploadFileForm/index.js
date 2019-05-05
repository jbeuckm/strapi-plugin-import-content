import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Button from 'components/Button';
import Label from 'components/Label';
import InputSpacer from 'components/InputSpacer';

function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export class UploadFileForm extends Component {
  state = {
    source: 'url',
    file: null,
    type: null,
    options: {
      delimiter: ',',
      filename: null
    }
  };

  onChangeImportFile = event => {
    const file = event.target.files[0];

    console.log({ file });

    this.setState({
      file,
      type: file.type,
      options: {
        ...this.state.options,
        filename: file.name
      }
    });
  };

  clickAnalyzeUploadFile = async () => {
    const { file, options } = this.state;

    const data = await readFileContent(file);

    this.props.onRequestAnalysis({
      source: 'upload',
      type: file.type,
      options,
      data
    });
  };

  onChangeOption = option => event => {
    this.setState({
      options: { ...this.state.options, [option]: event.target.value }
    });
  };

  render() {
    const { loadingAnalysis } = this.props;
    const { type, options } = this.state;

    return (
      <Fragment>
        <input type="file" accept=".csv" onChange={this.onChangeImportFile} />
        <InputSpacer />
        <div>
          {type === 'text/csv' && (
            <Fragment>
              <Label message="delimiter:" />
              <input
                onChange={this.onChangeOption('delimiter')}
                value={options.delimiter}
                style={{
                  backgroundColor: '#fff',
                  marginLeft: 10,
                  width: 30,
                  paddingLeft: 7,
                  paddingRight: 7
                }}
              />
            </Fragment>
          )}
          <Button
            label={'Analyze'}
            onClick={this.clickAnalyzeUploadFile}
            secondaryHotline
            loading={loadingAnalysis}
          />
        </div>
      </Fragment>
    );
  }
}

UploadFileForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
};

export default injectIntl(UploadFileForm);
