import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const Kuzzle = require('kuzzle-sdk');

export default class App extends Component {
  render() {
    // load the Kuzzle SDK module
    // instantiate a Kuzzle client, this will automatically connect to the Kuzzle server
    const kuzzle = new Kuzzle('192.168.115.128', { defaultIndex: 'playground3' });
  
    // add a listener to detect any connection problems
    kuzzle.on("networkError", error => {
      console.error("Network Error:" + error);
    });

    kuzzle
      .createIndexPromise('playground3')
      .then(() => kuzzle.collection('newcollection').createPromise())
      .then(() => {
        console.log('playground3/newcollection ready');
      })  
      .catch(err => {
        console.error(err.message);
      })  
      .finally(() => kuzzle.disconnect());
        console.log('kuzzle test finished');
        
        
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Test React Native kuzzle-sdk !</Text>
      </View>
      
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
