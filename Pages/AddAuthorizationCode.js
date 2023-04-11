import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppButton from '../app/components/appButton';
import { TextInput, StyleSheet, Image, Text } from 'react-native';
import FormInput from '../app/components/appInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import * as Linking from 'expo-linking';
import Constants from "expo-constants";
const { manifest } = Constants;


// TODO: get user info from smth
const user = { email : "test@gmail.com" };

function AddAuthorizationCode({route, navigation}) {
    const authorization_code = route.params.code;
    const url = `http://${manifest.debuggerHost.split(':').shift()}:8888/addAuthorizationCode`;
    console.log("auth code", authorization_code);
    console.log(url);

    fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'email' : user.email,
            'authorization_code' : authorization_code
        })
        // body: `email=${user.email}&authorization_code=${auth_code}`
    })
    .then(response => response.json())
    .then(json => {
        console.log('auth code added', json);
        navigation.navigate('Home');
    }).catch(error => {
        console.log(error);
    });

    return (
        <View style = {styles.back}>
        <Icon size = {20} name = 'arrow-left' onPress = {() => navigation.goBack()}/>
        </View>
    );

}

export default AddAuthorizationCode;