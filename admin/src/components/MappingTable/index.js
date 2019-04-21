import React from 'react';
import PropTypes from 'prop-types';

const MappingTable = ({ analysis, targetModel }) => {
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
          </tr>
          {analysis.fieldStats.map(stat => (
            <tr>
              <td>{stat.fieldName}</td>
              <td>{stat.count}</td>
              <td>{stat.format}</td>
              <td>{stat.minLength}</td>
              <td>{stat.maxLength}</td>
              <td>{stat.meanLength}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

MappingTable.propTypes = {
  analysis: PropTypes.object.isRequired,
  targetModel: PropTypes.object
};

export default MappingTable;
