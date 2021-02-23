import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation'; 
import {SafeAreaProvider} from 'react-native-safe-area-context'
import HomeScreen from './screens/HomeScreen'

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
      <View style={{flex:1}}>
        <Appcontainer />
      </View>
      </SafeAreaProvider>
    )
  }
}

var switchContainer = createSwitchNavigator({
  HomeScreen : HomeScreen
})
const Appcontainer = createAppContainer(switchContainer)