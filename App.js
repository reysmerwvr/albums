import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import firebase from 'firebase';
import { Header, Spinner } from './src/components/common';
import AlbumList from './src/components/AlbumList';
import LoginForm from './src/components/LoginForm';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  
  state = { headerText: 'Login', loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyCvfMjejYv50rB4ieSv123SBFa4Eno3ZUA',
        authDomain: 'albums-8a71b.firebaseapp.com',
        databaseURL: 'https://albums-8a71b.firebaseio.com',
        projectId: 'albums-8a71b',
        storageBucket: 'albums-8a71b.appspot.com',
        messagingSenderId: '1026453128307'
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true, headerText: 'Albums' });
        } else {
          this.setState({ loggedIn: false, headerText: 'Login' });
        }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <AlbumList />;
      case false:
        return <LoginForm />;
      default: 
        return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <View style={styles.albumsContainer}>
        <Header headerText={this.state.headerText} />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  albumsContainer: {
    flex: 1
  },
});
