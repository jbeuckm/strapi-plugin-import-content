import React from 'react';

const TargetFieldSelect = ({ targetModel, onChange }) => (
  <select onChange={event => onChange(event.target.value)}>
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
);

export default TargetFieldSelect;
