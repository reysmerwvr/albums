import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Header, Spinner } from './src/components/common';
import AlbumList from './src/components/AlbumList';
//import LibraryList from './src/components/LibraryList';
import LoginForm from './src/components/LoginForm';
import reducers from './src/reducers';

const store = createStore(reducers);

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
        //return <LibraryList />;
      case false:
        return <LoginForm />;
      default: 
        return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.albumsContainer}>
          <Header headerText={this.state.headerText} />
          {this.renderContent()}
        </View>
      </Provider>
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
