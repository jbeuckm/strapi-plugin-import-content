import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Button from 'components/Button';

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
    file: null
  };

  onChangeImportFile = event => {
    const file = event.target.files[0];

    this.setState({ file });
  };

  clickAnalyzeUploadFile = async () => {
    const data = await readFileContent(this.state.file);

    this.props.onRequestAnalysis({ source: 'upload', data });
  };

  render() {
    const { loadingAnalysis } = this.props;

    return (
      <Fragment>
        <input type="file" accept=".csv" onChange={this.onChangeImportFile} />

        <Button
          label={'Analyze'}
          onClick={this.clickAnalyzeUploadFile}
          secondaryHotline
          loading={loadingAnalysis}
        />
      </Fragment>
    );
  }
}

UploadFileForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
};

export default injectIntl(UploadFileForm);
