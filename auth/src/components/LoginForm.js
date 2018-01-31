import React, { Component } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common'


class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFailed.bind(this))
            });
    }

    onLoginSuccess(){
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: '',
        })
    }

    onLoginFailed(){
        this.setState({
            error: 'Invalid Email and Password Combination',
            loading: false,
        })
    }

    renderButton(){
        if (this.state.loading) {
            return <Spinner size='small' />
        }
            return (
                <Button onPress={this.onButtonPress.bind(this)}>
                    Log In
                </Button>
            );
    }


    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        placeholder='example@domain.com'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry={true} // can be written as secureTextEntry as well,  default value is true
                        label='Password'
                        placeholder='password'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    { this.renderButton() }
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
}

export default LoginForm;