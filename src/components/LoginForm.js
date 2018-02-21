import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, StyleSheet } from 'react-native';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {
    
    state = { email: '', password: '', error: '', loading: false };
    
    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });    
    }

    onLoginFail() {
        this.setState({ loading: false, error: 'Authentication Failed' }); 
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }
        
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Sign In
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@example.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />             
                </CardSection>
                
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />   
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                
                <CardSection>
                    {this.renderButton()}    
                </CardSection>
            </Card>
        );        
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        alignSelf: 'center',
        color: 'red',
        fontSize: 20
    }
  });

export default LoginForm;
