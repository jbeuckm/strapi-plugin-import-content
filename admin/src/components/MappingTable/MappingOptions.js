import React, { Component } from 'react';
import TargetFieldSelect from './TargetFieldSelect';

const MappingOptions = ({ stat, onChange, targetModel }) => {
  console.log({ stat });
  switch (stat.format) {
    case 'xml':
      return (
        <div>
          <div>
            <label style={{ marginRight: 10 }}>strip tags</label>
            <input
              type="checkbox"
              onChange={e => onChange({ stripTags: e.target.checked })}
            />
          </div>
          {stat.hasImageUrls && (
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

    default:
      return null;
  }
};

export default MappingOptions;
