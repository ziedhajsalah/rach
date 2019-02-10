import React from 'react';

import { Field, Choice } from '../App';
import { ShowForm } from './ShowField';
import { FieldForm } from './FieldForm';
import { NameForm } from './NameForm';
import { FieldsMap } from './FieldsMap';

export const FormsApp = ({
  name,
  setFormName,
  fields,
  fieldToAdd,
  setFieldName,
  setFieldType,
  addField,
  removeField,
  saveForm,
  isLoading,
  fieldChoice,
  setFieldChoiceLabel,
  setFieldChoiceValue,
  addFieldChoices,
  error
}: {
  name: string;
  setFormName: (event: React.FormEvent<HTMLInputElement>) => void;
  fields: Field[];
  fieldToAdd: Field;
  setFieldName: (event: React.FormEvent<HTMLInputElement>) => void;
  setFieldType: (event: React.FormEvent<HTMLSelectElement>) => void;
  addField: () => void;
  removeField: (fieldName: string) => void;
  saveForm: () => void;
  isLoading: boolean;
  fieldChoice: Choice;
  setFieldChoiceValue: (event: React.FormEvent<HTMLInputElement>) => void;
  setFieldChoiceLabel: (event: React.FormEvent<HTMLInputElement>) => void;
  addFieldChoices: () => void;
  error: any;
}) => (
  <div className="row">
    <div className="col-sm-12 col-md-10 col-md-offset-1">
      <h3>Ajouter une nouvelle formulaire</h3>
      <NameForm name={name} setFormName={setFormName} />

      <FieldForm
        fieldToAdd={fieldToAdd}
        setFieldName={setFieldName}
        setFieldType={setFieldType}
        addField={addField}
        fieldChoice={fieldChoice}
        setFieldChoiceLabel={setFieldChoiceLabel}
        setFieldChoiceValue={setFieldChoiceValue}
        addFieldChoices={addFieldChoices}
      />

      <FieldsMap fields={fields} removeField={removeField} />

      <button
        disabled={isLoading || !name}
        onClick={saveForm}
        className="tertiary large"
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>Envoyer</div>
          {isLoading && <div className="spinner" />}
        </div>
      </button>
      {/* <ShowForm fields={fields} name={name} /> */}
      {error && <div className="card error">{JSON.stringify(error.message)}</div>}
    </div>
  </div>
);
