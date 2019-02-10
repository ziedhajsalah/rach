import React from 'react';

import { Field } from '../App';
import { ShowForm } from './ShowField';
import { FieldForm } from './FieldForm';
import { NameForm } from './NameForm';
import { FieldsMap } from './FieldsMap';

export const FormsApp = ({
  name,
  setFormName,
  fields,
  showFieldForm,
  fieldToAdd,
  setFieldName,
  setFieldType,
  showFieldFormFn,
  addField,
  saveForm
}: {
  name: string;
  setFormName: (event: React.FormEvent<HTMLInputElement>) => void;
  fields: Field[];
  showFieldForm: boolean;
  fieldToAdd: Field;
  setFieldName: (event: React.FormEvent<HTMLInputElement>) => void;
  setFieldType: (event: React.FormEvent<HTMLSelectElement>) => void;
  showFieldFormFn: () => void;
  addField: () => void;
  saveForm: () => void;
}) => (
  <div className="row">
    <div className="col-sm-12 col-md-10 col-md-offset-1">
      <h3>Add a new Form</h3>
      <NameForm name={name} setFormName={setFormName} />
      <FieldsMap fields={fields} />
      {showFieldForm && (
        <FieldForm
          fieldToAdd={fieldToAdd}
          setFieldName={setFieldName}
          setFieldType={setFieldType}
        />
      )}
      {!showFieldForm && <button onClick={showFieldFormFn}>new Field</button>}
      {showFieldForm && (
        <button className="responsive-margin" onClick={addField}>
          Add Field
        </button>
      )}
      <br />
      <button onClick={saveForm} className="responsive-margin">
        Save Form
      </button>
      <ShowForm fields={fields} name={name} />
    </div>
  </div>
);
