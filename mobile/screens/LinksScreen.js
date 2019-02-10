import React from 'react';
import { ScrollView, StyleSheet, Picker, View } from 'react-native';
import { Button, Text, Input, CheckBox } from 'react-native-elements';

function hasSimpleInput(type) {
  return (
    type === 'text' ||
    type === 'number' ||
    type === 'email' ||
    type === 'textArea'
  );
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
    title: 'Links'
  };

  render() {
    const form = this.props.navigation.getParam('form');
    return (
      <ScrollView style={styles.container}>
        <Text h1>{form.name}</Text>
        {form.fields.map((field) => {
          if (hasSimpleInput(field.type))
            return (
              <Input
                key={field.id}
                placeholder={field.name}
                autoComplete={returnAutoComplete(field.type)}
                keyboardType={returnKeyboardType(field.type)}
                multiline={field.type === 'textArea'}
              />
            );

          if (field.type === 'singleChoice')
            return (
              <Picker key={field.id}>
                {field.choices.map((choice) => (
                  <Picker.Item
                    key={choice.value}
                    label={choice.label}
                    value={choice.value}
                  />
                ))}
              </Picker>
            );

          if (field.type === 'multipleChoice')
            return (
              <View key={field.id}>
                {field.choices.map((choice) => (
                  <CheckBox key={choice.value} title={choice.label} />
                ))}
              </View>
            );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
