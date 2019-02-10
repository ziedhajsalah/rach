import React from 'react';
import { Field, fieldTypes } from '../App';

export const FieldForm = ({
  fieldToAdd,
  setFieldName,
  setFieldType
}: {
  fieldToAdd: Field;
  setFieldName: (event: React.FormEvent<HTMLInputElement>) => void;
  setFieldType: (event: React.FormEvent<HTMLSelectElement>) => void;
}) => (
  <div className="row">
    <div className="col-sm-12 col-md-6">
      <label>field name</label>
      <input value={fieldToAdd.name} onChange={setFieldName} />
    </div>
    <div className="col-sm-12 col-md-6">
      <label>type</label>
      <select value={fieldToAdd.type} onChange={setFieldType}>
        {fieldTypes.map((t) => (
          <option value={t.id} key={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
    <div>
      {fieldToAdd.type === 'singleChoice' ||
        (fieldToAdd.type === 'multipleChoice' && (
          <div>
            value: <input />
            label: <input />
            <button>+</button>
          </div>
        ))}
    </div>
  </div>
);

