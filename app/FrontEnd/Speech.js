import Voice from '@react-native-community/voice'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TouchableOpacity, ActivityIndicator, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux'
import functions from '@react-native-firebase/functions'
import { speechAction } from '../store/speech_store';
import { userAction } from '../store/current_user';

export default function Speech() {
  //Redux
    const result = useSelector((state) => state.speech.speech);
    const splittedResult = result.split(" ");
    const dispatch = useDispatch()

    const [marvin, setMarvin] = useState(false);
    const navigation = useNavigation();
    const [textOff, setTextOff] = useState(0);
    const [token, setToken] = useState();

    const login_model = ["login", "log me in", "log in", "log-in", "logging"]
    
    const speechStartHandler = e => {
        console.log('speechStart successful', e);
      };
    
      const speechEndHandler = e => {
        console.log('stop handler', e);
      };
      const speechResultsHandler = async(e) => {
        const text = e.value[0] + "";

        //Redux dispatch 
        console.log("text", text)

        dispatch(speechAction.updateSpeech(text))
      };
      useEffect(() => {
        //console.log("Result length",result.length)
        
        //var newResult = result.substring(textOff);
        if (result.includes("Marvin")) {
          setMarvin(true);
          //setTextOff(result.length);
        }
        if (login_model.some(per => result.includes(per))) {
          navigation.navigate('Login')

          /* Work in progress ==> Need pay subscription of firebase function to work...*/
          // if (result.includes("set passkey")) {
          //   var index = result.indexOf("set passkey ") + ("set pass key ").length
          //   var word = result.substring(index)
          //   console.log(word);

          //   setPasskey(word);
          // }
          // else if (result.includes("pass key ")) {
          //   var index = result.indexOf("pass key ") + ("pass key ").length
          //   var word = result.substring(index)
          //   console.log(word);

          //   loginWithPasskey(word);
          // }
        }
        if (result.includes("go back")) {
          navigation.navigate('Home')
          stopRecording()  
          stopRecording()  
          startRecording()
        }
        if (result.includes("stop")||result.includes("Stop")) {
          stopRecording()  
          stopRecording()  
          setMarvin(false);
          console.log("stopped")
        }
        //dispatch(speechAction.updateSpeech(""))
      }, [result])


      //Work in progress...custom tokens can only be created through server side 
      // const setPasskey = async(word) => {
      //   dispatch(userAction.setPasskey())
      //   await functions().httpsCallable('getToken')({userId: auth().currentUser.uid})
      //   .then((token) => setToken(token))
      //   .catch(err=> console.log(err))
        
      //   await AsyncStorage.setItem(word, token.data)
      // }
      // const loginWithPasskey = async(pass) => {
      //   const token = await AsyncStorage.getItem(pass);
      //   auth().signInWithCustomToken(token);
      // }
      //



      const startRecording = async () => {
        try {
          await Voice.start('en-Us');
          
        } catch (error) {
          console.log('error', error);
        }
      };
    
      const stopRecording = async () => {
        try {
          await Voice.stop();
          console.log(result);
          clear();
        } catch (error) {
          console.log('error', error);
        }
      };
    
      const clear = () => {
          dispatch(speechAction.updateSpeech(""))
          };
    
      useEffect(() => {
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        startRecording();
        return () => {
          Voice.destroy().then(Voice.removeAllListeners);
        };
      }, []);
    return (
        <View style={
          {
            marginTop:'20%',
            alignItems:'center'
          }
        }>
          {marvin&&<LottieView
      source={require('./marvin.json')} autoPlay
      style={{width: "100%", height: "100%",marginVertical:"0%",position: "relative"}}/>}
      
        </View>
    )
}