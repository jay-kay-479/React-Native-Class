import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import { Button, Header, Spinner } from './components/common';


class App extends Component {
    state = {loggedIn: null};

    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyBei_bL_l3ny7EaQUBXFBcKSeCYuiAKLfw",
            authDomain: "auth-96223.firebaseapp.com",
            databaseURL: "https://auth-96223.firebaseio.com",
            projectId: "auth-96223",
            storageBucket: "auth-96223.appspot.com",
            messagingSenderId: "656965322052"
          });

        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                this.setState({ loggedIn: true})
            }
            else{
                this.setState({ loggedIn: false})
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn){
            case true:
                return (
                <Button onPress={() => {firebase.auth().signOut()}}>Log Out</Button>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner />;
        }
    }

    render(){
        return(
            <View>
                <Header headerText="Auth" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App; 