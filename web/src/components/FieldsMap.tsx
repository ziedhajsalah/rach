import React from 'react';

import { Field } from '../App';

export const FieldsMap = ({
  fields,
  removeField
}: {
  fields: Field[];
  removeField: (fieldName: string) => void;
}) => (
  <div className="row">
    {fields.map((field) => (
      <div className="card small" key={field.id}>
        <div className="section dark">
          <div className="row">
            <div className="col-sm-10">
              <b>Nom du champ: </b>
              {field.name}
            </div>
            <div className="col-sm-2">
              <button
                onClick={() => {
                  removeField(field.id);
                }}
                className="small secondary"
              >
                X
              </button>
            </div>
          </div>
        </div>
        <div className="section">
          <b>type du champ: </b>
          {field.type}
        </div>
      </div>
    ))}
  </div>
);
