import auth from '@react-native-firebase/auth';
// import {auth} from './FirebaseSetup';
import React, { useState } from 'react';
import { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs'
import * as use from '@tensorflow-models/universal-sentence-encoder';
const phrases = require('./SimilarPhrases.json');
 
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
export default function Login ({navigation}){
  // converter.js

  const login = phrases.login;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initializing, setInitializing] = useState(true);

  const [user, setUser]= useState('');
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const convert = async () => {
      // Load the Universal Sentence Encoder model
      try {
        // await tf.ready();
        console.log('line 30')
        use.loadTokenizer().then(tokenizer => {
          console.log("owejvn efjnv")
          tokenizer.encode('Hello, how are you?');
          console.log(tokenizer) // [341, 4125, 8, 140, 31, 19, 54]
        });
        await tf.loadLayersModel(bundle)
        use.load().then(model => {
          console.log(model)
          // Embed an array of sentences.
          const sentences = [
            'Hello.',
            'How are you?'
          ];
          model.embed(sentences).then(embeddings => {
            console.log("hiii")
            console.log(embeddings.data)
            // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
            // So in this example `embeddings` has the shape [2, 512].
            embeddings.print(true /* verbose */);
          }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
      console.log('line 32')

      // console.log(login)
      // Embed the login phrase
      // const embedIt = await model.embed(login);
      // console.log("embed it", embedIt)
      // // Embed the user input phrase
      // const userinputEmb = await model.embed("Log me in");
      
      // // Slice the first embedding (assuming you want the first one)
      // const embedIt1 = embedIt.slice([0, 0], [1]);
      
      // // Compute the similarity score
      // const score = await embedIt1.matMul(userinputEmb, false, true).data();
      // console.log("score", score)
      }
      catch(error)
    {
      console.log(error)
    }    
        // Return the score if you want to use it elsewhere
    }
    convert();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    
      return subscriber; // unsubscribe on unmount
  }, []);
  

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

