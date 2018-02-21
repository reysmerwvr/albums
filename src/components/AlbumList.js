import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { CardSection, Button } from './common';

class AlbumList extends Component {
    
    //state = { albums: [] };
    constructor(props) {
        super(props);

        this.state = {
          albums: []
        };
    }
    
    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then(response => this.setState({ albums: response.data }));
    }

    renderAlbums() {
        return this.state.albums.map(album => 
            <AlbumDetail key={album.title} album={album} />
        );
    }

    renderLogOutButton() {
        return (
            <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>
                    Log Out
                </Button>
            </CardSection>      
        );
    }
    
    render() {
        return (
            <ScrollView>
                {this.renderAlbums()}
                {this.renderLogOutButton()}
            </ScrollView>
        );
    }
}

// Functional Component
/* const AlbumList = () => {
    return (
        <View>
            <Text>Album List!!!</Text>
        </View>
    );
}; */

export default AlbumList;
