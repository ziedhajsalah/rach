import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ResultsScreen from '../screens/ResultsScreen';

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
      },
      Links: {
        screen: LinksScreen,
      },
      Results: {
        screen: ResultsScreen,
      },
    },
    {
      initialRouteName: 'Home',
    }
  )
);

export default class extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
