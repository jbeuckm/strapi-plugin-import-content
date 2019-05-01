import React, { Component } from 'react';
import TargetFieldSelect from './TargetFieldSelect';

const MappingOptions = ({ stat, onChange, targetModel }) => {
  return (
    <div>
      {stat.format === 'xml' && (
        <div>
          <label style={{ marginRight: 10 }}>strip tags</label>
          <input
            type="checkbox"
            onChange={e => onChange({ stripTags: e.target.checked })}
          />
        </div>
      )}
      {stat.hasMediaUrls && (
        <div>
          <label style={{ marginRight: 10 }}>import media to field</label>
          <TargetFieldSelect
            targetModel={targetModel}
            onChange={targetField =>
              onChange({ importMediaToField: targetField })
            }
          />
        </div>
      )}
    </div>
  );
};

export default MappingOptions;
