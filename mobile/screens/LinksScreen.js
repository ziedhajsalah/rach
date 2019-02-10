import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links'
  };

  render() {
    const form = this.props.navigation.getParam('form');
    return (
      <ScrollView style={styles.container}>
        <Text h1>{form.name}</Text>
        {form.fields.map((field) => (
          <Input key={field.name} placeholder={field.name} />
        ))}
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
