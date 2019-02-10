import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text, Icon, Card } from 'react-native-elements';

import { apiUrl } from '../constants/Utils';
import Axios from 'axios';

export default class HomeScreen extends React.Component {
  state = {
    forms: [],
    isLoading: true,
    error: null
  };

  componentDidMount() {
    this.fetchForms();
  }

  fetchForms = () => {
    this.setState({ isLoading: true });
    Axios.get(`${apiUrl}/forms`).then(
      (res) => {
        this.setState({ forms: res.data, isLoading: false });
      },
      (e) => {
        this.setState({ isLoading: false, error: e });
        console.log('error fetching forms', e);
      }
    );
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {!this.state.isLoading && (
          <Button
            icon={<Icon name="loop" size={36} />}
            onPress={() => {
              this.fetchForms();
            }}
          />
        )}
        {this.state.isLoading && <Icon name="cloud" size={72} />}
        {this.state.error && !this.state.isLoading && (
          <Text>{JSON.stringify(this.state.error, null, 2)}</Text>
        )}
        {this.state.forms.map((form) => (
          <Button
            key={form.id}
            containerStyle={styles.forms}
            onPress={() => {
              this.props.navigation.navigate('Links', { form });
            }}
            title={form.name}
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  forms: {
    width: '100%',
    marginBottom: 4
  }
});
