import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MappingOptions from './MappingOptions';
import _ from 'lodash';

class MappingTable extends Component {
  state = { mapping: {} };

  changeMappingOptions = stat => options => {
    console.log(stat, options);

    let state = this.state;
    for (let key in options) {
      state = _.set(state, `mapping[${stat.fieldName}][${key}]`, options[key]);
    }
    this.setState(state, () => this.props.onChange(this.state.mapping));
  };

  setMapping = (source, targetField) => {
    const state = _.set(
      this.state,
      `mapping[${source}]['targetField']`,
      targetField
    );
    this.setState(state, () => this.props.onChange(this.state.mapping));
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
              <th>Options</th>
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
                  <MappingOptions
                    stat={stat}
                    onChange={this.changeMappingOptions(stat)}
                  />
                </td>
                <td>
                  {targetModel && (
                    <select
                      onChange={event =>
                        this.setMapping(stat.fieldName, event.target.value)
                      }
                    >
                      <option value="none">(none)</option>
                      {targetModel &&
                        targetModel.attributes.map(attribute => {
                          const type = attribute.params.type;
                          return type ? (
                            <option value={attribute.name}>
                              {attribute.name} ({type})
                            </option>
                          ) : null;
                        })}
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
