import auth from '@react-native-firebase/auth';
// import {auth} from './FirebaseSetup';
import React, { useState } from 'react';
import { useEffect } from 'react';
const phrases = require('./SimilarPhrases.json');
import Styles from './Styles';
import { View, Text, TextInput, Button, StyleSheet , Modal, Touchable} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchEventType } from 'react-native-gesture-handler/lib/typescript/TouchEventType';
export default function Login ({navigation}){
  // converter.js
  const style = Styles;
  const login = phrases.login;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [sKey, setSKey] = useState(true);
  const [user, setUser]= useState('');
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  const SecretKey = () => {
    return (
      <Modal
      animationType='slide'
      visible={sKey}
      onRequestClose={() => setSKey(false)}
      >
        <View  style = {{backgroundColor:'#87CDEE',
          alignItems:"center",
          width:"100%", 
          height:"100%",
        }}
          >
            <Text style={{top:"40%", fontSize:30}}>Wanna set passkey?</Text>
            <View style={{top:"90%", alignItems:"center", flexDirection:"row"}}>
            <Text style ={{backgroundColor:"#90EE90",
            borderRadius:10,
            padding:"10%",
            marginRight:"5%",
              textAlign:"center"}}>Say Yes!</Text>
          
            <Text style ={{backgroundColor:"#FF7F7F",
            borderRadius:10,
            padding:"10%",
            marginLeft:"5%",textAlign:"center"}}>Say No!</Text>
          </View>
        </View>
      </Modal>
    )
  }

  if (initializing) return null
  console.log('rendered login', email)
  const handleLogin = () => {
    // You can implement your login logic here
    console.log('Email:', email);
    auth().signInWithEmailAndPassword(email,password).
    then((user) => navigation.navigate('Chats'))
    .catch((err) => {
        auth().createUserWithEmailAndPassword(email, password).
        then((user) => navigation.navigate("Chats"))
    })
    console.log('Password:', password)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LOGIN</Text>
      <SecretKey/>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#ADD8E6"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#ADD8E6"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
});

