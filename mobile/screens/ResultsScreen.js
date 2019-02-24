import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

class ResultsScreen extends Component {
  static navigationOptions = {
    title: 'Resultat',
  };

  render() {
    const values = this.props.navigation.getParam('values');
    const form = this.props.navigation.getParam('form');
    return (
      <ScrollView>
        {form.fields.map(field => (
          <Text key={field.id}>
            {field.name}:{' '}
            {values[field.id] && Array.isArray(values[field.id].value)
              ? values[field.id].value.join(', ')
              : values[field.id].value}
          </Text>
        ))}
      </ScrollView>
    );
  }
}

export default ResultsScreen;
