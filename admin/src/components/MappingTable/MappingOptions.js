import React, { Component } from 'react';

const MappingOptions = ({ stat, onChange }) => {
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
              <label style={{ marginRight: 10 }}>import media</label>
              <input
                type="checkbox"
                onChange={e => onChange({ importMedia: e.target.checked })}
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
