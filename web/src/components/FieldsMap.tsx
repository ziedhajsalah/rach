import React from 'react';

import { Field } from '../App';

export const FieldsMap = ({ fields }: { fields: Field[] }) => (
  <div className="responsive-margin responsive-padding">
    {fields.map((field) => (
      <React.Fragment key={field.name}>
        <hr />
        <div>field name: {field.name}</div>
        <div>field type: {field.type}</div>
      </React.Fragment>
    ))}
  </div>
);
