import React, { Component } from 'react';
import * as axios from 'axios';
import uuidv1 from 'uuid/v1';

import { FormsApp } from './components/FormsApp';

const apiUrl = 'https://cryptic-brushlands-53893.herokuapp.com';

export type FieldTypes =
  | 'text'
  | 'number'
  | 'singleChoice'
  | 'multipleChoice'
  | 'email'
  | 'textArea';

export type Choice = { value: string; label: string };

export type Field = {
  id: string;
  name: string;
  type: FieldTypes;
  choices: Choice[];
};

export const fieldTypes: Array<{ id: FieldTypes; label: string }> = [
  { id: 'text', label: 'text simple' },
  { id: 'number', label: 'numero' },
  { id: 'email', label: 'email' },
  { id: 'multipleChoice', label: 'choix multiple' },
  { id: 'singleChoice', label: 'un seul choix' },
  { id: 'textArea', label: 'champ de text' }
];

type IForm = {
  fields: Field[];
  name: string;
  id: string;
};

type State = {
  fields: Field[];
  name: string;
  fieldToAdd: Field;
  fieldChoice: Choice;
  forms: IForm[];
  isLoading: boolean;
  error: any;
};

type Props = {};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fields: [],
      name: '',
      fieldToAdd: {
        id: uuidv1(),
        name: '',
        type: 'text',
        choices: []
      },
      fieldChoice: {
        label: '',
        value: ''
      },
      forms: [],
      isLoading: false,
      error: null
    };
  }

  setFormName = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ name: e.currentTarget.value });
  };

  setFieldName = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    this.setState((state) => ({
      ...state,
      fieldToAdd: {
        ...state.fieldToAdd,
        name
      }
    }));
  };

  setFieldType = (e: React.FormEvent<HTMLSelectElement>) => {
    const type = e.currentTarget.value as FieldTypes;
    this.setState((state) => ({
      ...state,
      fieldToAdd: {
        ...state.fieldToAdd,
        type
      }
    }));
  };

  setFieldChoiceLabel = (e: React.FormEvent<HTMLInputElement>) => {
    const label = e.currentTarget.value;
    this.setState((state) => ({
      ...state,
      fieldChoice: {
        ...state.fieldChoice,
        label
      }
    }));
  };

  setFieldChoiceValue = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState((state) => ({
      ...state,
      fieldChoice: {
        ...state.fieldChoice,
        value
      }
    }));
  };

  addFieldChoices = () => {
    if (!this.state.fieldChoice.value || !this.state.fieldChoice.label) return;

    this.setState((state) => ({
      ...state,
      fieldToAdd: {
        ...state.fieldToAdd,
        choices: [...state.fieldToAdd.choices, state.fieldChoice]
      },
      fieldChoice: {
        label: '',
        value: ''
      }
    }));
  };

  addField = () => {
    if (!this.state.fieldToAdd.name) return;

    this.setState((state) => ({
      ...state,
      fields: [...state.fields, state.fieldToAdd],
      fieldToAdd: {
        id: uuidv1(),
        name: '',
        type: 'text',
        choices: []
      }
    }));
  };

  removeField = (fieldName: string) => {
    this.setState((state) => ({
      ...state,
      fields: state.fields.filter((f) => f.id !== fieldName)
    }));
  };

  saveForm = () => {
    this.setState({ isLoading: true, error: null });
    axios.default
      .post(`${apiUrl}/forms`, {
        name: this.state.name,
        fields: this.state.fields
      })
      .then(
        (res) => {
          this.setState((state) => ({
            fields: [],
            name: '',
            fieldToAdd: {
              id: uuidv1(),
              name: '',
              type: 'text',
              choices: []
            },
            fieldChoice: {
              label: '',
              value: ''
            },
            forms: [...state.forms, res.data],
            isLoading: false
          }));
        },
        (e) => {
          console.log(e);
          this.setState({ isLoading: false, error: e });
        }
      );
  };

  getForms = () => {
    this.setState({ isLoading: true, error: null });
    axios.default.get(`${apiUrl}/forms`).then(
      (res) => {
        this.setState({ forms: res.data, isLoading: false });
      },
      (e) => {
        console.error(e);
        this.setState({ isLoading: false, error: e });
      }
    );
  };

  componentDidMount() {
    this.getForms();
  }

  render() {
    return (
      <FormsApp
        name={this.state.name}
        setFormName={this.setFormName}
        fields={this.state.fields}
        fieldToAdd={this.state.fieldToAdd}
        setFieldName={this.setFieldName}
        setFieldType={this.setFieldType}
        addField={this.addField}
        removeField={this.removeField}
        saveForm={this.saveForm}
        isLoading={this.state.isLoading}
        fieldChoice={this.state.fieldChoice}
        setFieldChoiceLabel={this.setFieldChoiceLabel}
        setFieldChoiceValue={this.setFieldChoiceValue}
        addFieldChoices={this.addFieldChoices}
        error={this.state.error}
      />
    );
  }
}

export default App;
