import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MappingTable extends Component {
  state = { mapping: {} };
  setMapping = (source, target) => {
    this.setState(
      { mapping: { ...this.state.mapping, [source]: target } },
      () => this.props.onChange(this.state.mapping)
    );
  };

  render() {
    const { analysis, targetModel } = this.props;
    return (
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
              <th>Destination</th>
            </tr>
            {analysis.fieldStats.map(stat => (
              <tr>
                <td>{stat.fieldName}</td>
                <td>{stat.count}</td>
                <td>{stat.format}</td>
                <td>{stat.minLength}</td>
                <td>{stat.maxLength}</td>
                <td>{stat.meanLength}</td>
                <td>
                  {targetModel && (
                    <select
                      onChange={event =>
                        this.setMapping(stat.fieldName, event.target.value)
                      }
                    >
                      <option value="none">(none)</option>
                      {targetModel &&
                        targetModel.attributes.map(attribute => (
                          <option value={attribute.name}>
                            {attribute.name} ({attribute.params.type})
                          </option>
                        ))}
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

MappingTable.propTypes = {
  analysis: PropTypes.object.isRequired,
  targetModel: PropTypes.object,
  onChange: PropTypes.func
};

export default MappingTable;
