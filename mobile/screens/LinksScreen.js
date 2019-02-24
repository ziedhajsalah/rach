import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Picker,
  View,
  KeyboardAvoidingView
} from 'react-native';
import { Button, Text, Input, CheckBox } from 'react-native-elements';
import { State } from 'react-powerplug';

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
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.container}>
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
                <State key={field.id} initial={{ single: null }}>
                  {({ state, setState }) => (
                    <Picker
                      selectedValue={state.single}
                      onValueChange={(itemValue) => {
                        setState({ single: itemValue });
                      }}
                    >
                      {field.choices.map((choice) => (
                        <Picker.Item
                          key={choice.value}
                          label={choice.label}
                          value={choice.value}
                        />
                      ))}
                    </Picker>
                  )}
                </State>
              );

            if (field.type === 'multipleChoice')
              return (
                <View key={field.id}>
                  {field.choices.map((choice) => (
                    <State initial={{ checked: false }}>
                      {({state, setState}) => (
                        <CheckBox
                          key={choice.value}
                          title={choice.label}
                          checked={state.checked}
                          onPress={() => {
                            setState({ checked: !state.checked });
                          }}
                        />
                      )}
                    </State>
                  ))}
                </View>
              );
          })}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingVertical: 15, backgroundColor: '#fff' },
  keyboard: { flex: 1, flexDirection: 'column', justifyContent: 'center' }
});
