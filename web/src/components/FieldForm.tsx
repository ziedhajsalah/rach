import React from 'react';
import { Field, fieldTypes, Choice } from '../App';

export const FieldForm = ({
  fieldToAdd,
  setFieldName,
  setFieldType,
  addField,
  fieldChoice,
  setFieldChoiceLabel,
  setFieldChoiceValue,
  addFieldChoices
}: {
  fieldToAdd: Field;
  setFieldName: (event: React.FormEvent<HTMLInputElement>) => void;
  setFieldType: (event: React.FormEvent<HTMLSelectElement>) => void;
  addField: () => void;
  fieldChoice: Choice;
  setFieldChoiceValue: (event: React.FormEvent<HTMLInputElement>) => void;
  setFieldChoiceLabel: (event: React.FormEvent<HTMLInputElement>) => void;
  addFieldChoices: () => void;
}) => (
  <div className="row">
    <div className="col-sm-12">
      <div className="card fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <label>Nom du champ</label>
            <input value={fieldToAdd.name} onChange={setFieldName} />
          </div>
          <div className="col-sm-12 col-md-6">
            <label>type du champ</label>
            <select value={fieldToAdd.type} onChange={setFieldType}>
              {fieldTypes.map((t) => (
                <option value={t.id} key={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          {(fieldToAdd.type === 'singleChoice' ||
            fieldToAdd.type === 'multipleChoice') && (
            <>
              <div className="col-sm-12">
                <div>
                  <label>valeur</label>
                  <input
                    value={fieldChoice.value}
                    onChange={setFieldChoiceValue}
                  />
                  <label>label</label>{' '}
                  <input
                    value={fieldChoice.label}
                    onChange={setFieldChoiceLabel}
                  />
                  <button
                    className="primary shadowed"
                    onClick={addFieldChoices}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-sm-12">
                {fieldToAdd.choices.length > 0 && 'Choix:'}
                <ul>
                  {fieldToAdd.choices.map((ch) => (
                    <li key={ch.value}>{ch.label}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <div className="col-sm-12">
            <button className="primary" onClick={addField}>
              Ajouter champ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
