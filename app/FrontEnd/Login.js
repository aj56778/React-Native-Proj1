import auth from '@react-native-firebase/auth';
import React, { useDebugValue, useState } from 'react';
import { useEffect , useRef} from 'react';
const phrases = require('./SimilarPhrases.json');
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet , Modal, Animated} from 'react-native';
import { userAction } from '../store/current_user';
export default function Login ({route, navigation}){
  // converter.js
  //Redux
  const words = useSelector(state => state.speech.speech);
  const passkey = useSelector(state => state.user.passkey);
  const e = useSelector(state => state.user.email)
  const p = useSelector(state => state.user.password)
  const dispatch = useDispatch();
  console.log("passkey", passkey)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log("Login: " + passkey)
    if (words.includes("pass key "+passkey) || words.includes("Paske "+passkey)) {
      
        setEmail(e);
        setPassword(p);
        handleLogin()
    }
  }, [words])

  //
  
  const [initializing, setInitializing] = useState(true);
  const [sKey, setSKey] = useState(false);
  const [isYes, setYes] = useState(false);
  const [user, setUser]= useState();

  function onAuthStateChanged(user) {
    if (initializing) setInitializing(false);
  }
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue:1,
          duration:1000,
          useNativeDriver:true,
        }),
        Animated.timing(animation, {
          toValue:0.7,
          duration:1000,
          useNativeDriver:true,
        }),
        Animated.timing(animation, {
          toValue:1,
          duration:1000,
          useNativeDriver:true,
        }),
      ])
    ).start();
  },[animation]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  
  const SecretKey = () => {
    if (words.includes("set pass key ")) {
      const lengthSP = ("set pass key ").length;
      const passkey = words.substring(lengthSP)
      if (passkey != null)
        {
          dispatch(userAction.setPasskey({
            passkey: passkey,
            email: email,
            password: password
          }))
        }    
      }
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
            {!isYes &&
            <View style={{top:"90%", alignItems:"center", flexDirection:"row"}}>
            
            <Text style ={{backgroundColor:"#90EE90",
            
            fontSize:19,
            borderRadius:10,
            padding:"10%",
            marginRight:"5%",
              textAlign:"center"}}
              onPress={() => setYes(true)}>Yes</Text>
          
            <Text style ={{
              backgroundColor:"#FF7F7F",
              borderRadius:10,
              fontSize:19,
              padding:"10%",
              marginLeft:"5%",
              textAlign:"center"}}
              onPress={() => {
                setYes(false)
                setSKey(false)
                navigation.navigate('Chats')
              }}>No</Text>
          </View>}
          {isYes&&<Text style ={{
              backgroundColor:"#FCEEA7",
              borderRadius:10,
              padding:"10%",
              textAlign:"center",
              top: "45%",
              fontSize:17}}>Say "set pass key" followed by the passkey you want to use to login every time</Text>}
          <View style ={{
backgroundColor: "#B19CD9", top: "50%", borderRadius: 20
          }}>
            <Text style={
            {
              fontSize: 25,
              padding: "5%",
              textAlign:"center"
            }
          } onPress={() => navigation.navigate("Chats")} > close </Text>
          </View>
        </View>
      </Modal>
    )
  }

  if (initializing) return null
  console.log('rendered login', email)
  function handleLogin() {
    // You can implement your login logic here
    console.log('Email:', email);
    console.log('Password: ', password)

    auth().signInWithEmailAndPassword(email,password).
    then((user) => {
      setSKey(true)
      navigation.navigate("Chats")
    })
    .catch((err) => {
      //more of idc if they entered wrong email and password, just make a new one \
      // obviously not appropriate just for testing purposes
      auth().createUserWithEmailAndPassword(email, password).
      then((user) => {
        setSKey(true)
        navigation.navigate("Chats")
      }).catch(err => console.log(err))
    })
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

