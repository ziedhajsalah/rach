import React from 'react';
import { ScrollView, StyleSheet, Picker, View, KeyboardAvoidingView } from 'react-native';
import { Button, Text, Input, CheckBox } from 'react-native-elements';

function hasSimpleInput(type) {
  return type === 'text' || type === 'number' || type === 'email' || type === 'textArea';
}

function returnAutoComplete(type) {
  switch (type) {
    case 'number':
      return 'cc-number';
    case 'email':
      return 'email';
    default:
      return 'off';
  }
}

function returnKeyboardType(type) {
  switch (type) {
    case 'number':
      return 'numeric';
    case 'email':
      return 'email-address';
    default:
      return 'default';
  }
}

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props) {
    super(props);

    this.form = props.navigation.getParam('form');

    this.state = {
      values: this.form.fields
        .map(field => ({
          id: field.id,
          value:
            field.type === 'multipleChoice'
              ? []
              : field.type === 'singleChoice'
              ? field.choices[0].value
              : null,
        }))
        .reduce(
          (acc, curr) => ({
            ...acc,
            [curr.id]: curr,
          }),
          {}
        ),
    };
  }

  setSingleValue = (field, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [field.id]: {
          ...state.values[field.id],
          value,
        },
      },
    }));
  };

  setMultipleValues = (field, value, idx) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [field.id]: {
          ...state.values[field.id],
          value:
            idx !== -1
              ? [
                  ...state.values[field.id].value.slice(0, idx),
                  ...state.values[field.id].value.slice(idx + 1),
                ]
              : [...state.values[field.id].value, value],
        },
      },
    }));
  };

  render() {
    const form = this.form;
    const { values } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text h1>{form.name}</Text>
          {form.fields.map(field => {
            if (hasSimpleInput(field.type))
              return (
                <Input
                  key={field.id}
                  placeholder={field.name}
                  autoComplete={returnAutoComplete(field.type)}
                  keyboardType={returnKeyboardType(field.type)}
                  multiline={field.type === 'textArea'}
                  value={values[field.id].value}
                  onChangeText={text => {
                    this.setSingleValue(field, text);
                  }}
                />
              );

            if (field.type === 'singleChoice')
              return (
                <Picker
                  key={field.id}
                  selectedValue={values[field.id].value}
                  onValueChange={itemValue => {
                    this.setSingleValue(field, itemValue);
                  }}>
                  {field.choices.map(choice => (
                    <Picker.Item key={choice.value} label={choice.label} value={choice.value} />
                  ))}
                </Picker>
              );

            if (field.type === 'multipleChoice')
              return (
                <View key={field.id}>
                  {field.choices.map(choice => {
                    const idx = values[field.id].value.findIndex(v => v === choice.value);
                    return (
                      <CheckBox
                        key={choice.value}
                        title={choice.label}
                        checked={idx !== -1}
                        onPress={() => {
                          this.setMultipleValues(field, choice.value, idx);
                        }}
                      />
                    );
                  })}
                </View>
              );
          })}

          <Button
            containerStyle={styles.submitButton}
            onPress={() => {
              this.props.navigation.navigate('Results', { form, values });
            }}
            title="Envoyez"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingVertical: 15, backgroundColor: '#fff' },
  keyboard: { flex: 1, flexDirection: 'column', justifyContent: 'center' },
  submitButton: { margin: 5 },
});
