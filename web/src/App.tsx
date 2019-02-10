import React, { Component } from 'react';
import * as axios from 'axios';

import { FormsApp } from './components/FormsApp';

const apiUrl = 'https://cryptic-brushlands-53893.herokuapp.com';

export type FieldTypes =
  | 'text'
  | 'number'
  | 'singleChoice'
  | 'multipleChoice'
  | 'email'
  | 'textArea';

export type Field = {
  name: string;
  type: FieldTypes;
  choices?: { value: string; label: string }[];
};

export const fieldTypes: Array<{ id: FieldTypes; label: string }> = [
  { id: 'text', label: 'text' },
  { id: 'number', label: 'number' },
  { id: 'email', label: 'email' },
  { id: 'multipleChoice', label: 'multiple choice' },
  { id: 'singleChoice', label: 'single choice' },
  { id: 'textArea', label: 'text area' }
];

type State = {
  fields: Field[];
  name: string;
  showFieldForm: boolean;
  fieldToAdd: Field;
  displayAddedForm: boolean;
};

type Props = {};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fields: [],
      name: '',
      showFieldForm: false,
      fieldToAdd: {
        name: '',
        type: 'text',
        choices: []
      },
      displayAddedForm: false
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

  showFieldForm = () => {
    this.setState({ showFieldForm: true });
  };

  addField = () => {
    this.setState((state) => ({
      ...state,
      fields: [...state.fields, state.fieldToAdd],
      fieldToAdd: { name: '', type: 'text' },
      showFieldForm: false
    }));
  };

  saveForm = () => {
    axios.default
      .post(`${apiUrl}/forms`, {
        name: this.state.name,
        fields: this.state.fields
      })
      .then(
        (res) => {
          console.log(res);
        },
        (e) => {
          console.log(e);
        }
      );
  };

  render() {
    return (
      <FormsApp
        name={this.state.name}
        setFormName={this.setFormName}
        fields={this.state.fields}
        showFieldForm={this.state.showFieldForm}
        fieldToAdd={this.state.fieldToAdd}
        setFieldName={this.setFieldName}
        setFieldType={this.setFieldType}
        showFieldFormFn={this.showFieldForm}
        addField={this.addField}
        saveForm={this.saveForm}
      />
    );
  }
}

export default App;
