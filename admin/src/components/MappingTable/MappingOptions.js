import React, { Component } from 'react';

const MappingOptions = ({ stat, onChange }) => {
  console.log({ stat });
  switch (stat.format) {
    case 'xml':
      return (
        <div>
          <label>strip tags</label>
          <input
            style={{ paddingLeft: 10 }}
            type="checkbox"
            onChange={e => onChange({ stripTags: e.target.checked })}
          />
        </div>
      );

    default:
      return null;
  }
};

export default MappingOptions;
