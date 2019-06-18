import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/utilities/AppNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import searchReducer from './src/reducers/SearchReducer';


const store = createStore(searchReducer);

export default class App extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      
      <Provider store={ store }> 
        <AppNavigator/>
      </Provider>
 
    );
  }
}
