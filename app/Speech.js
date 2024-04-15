import Voice from '@react-native-community/voice'
import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function Speech() {
    const [result, setResult] = useState('');
    const [marvin, setMarvin] = useState(false);
    const navigation = useNavigation();
    const [textOff, setTextOff] = useState(0);
    const [textToRead, setTTR] = useState("")

    const login_model = ["login", "log me in", "log in", "log-in", "logging"]
    
    const speechStartHandler = e => {
        console.log('speechStart successful', e);
      };
    
      const speechEndHandler = e => {
        console.log('stop handler', e);
      };
      const speechResultsHandler = async(e) => {
        const text = e.value[0] + "";  
        setResult(text);
        console.log("result",text.slice(textOff, text.length));
        
        setTextOff(length => length + text.length);

      };
      useEffect(() => {
        if (result.includes("Marvin")) {
          setMarvin(true);
        }
        if (login_model.some(per => result.includes(per))) {
          navigation.navigate('Login')
          console.log("text length ", textOff)
        }
        if (result.includes("go back")) {
          navigation.navigate('Home')
        }
        if (result.includes("stop")) {
          stopRecording()  
          setMarvin(false);
        }
        setResult("");
      }, [result])

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
        setResult('');
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
      
            
            {/* <View>
              <Text style={
                {fontSize:30, 
                position:'relative',
                textAlign: "center",
                margin: 'auto',
                marginVertical: "40%",
      width:"100%"
              }}>{result}</Text>
            </View> */}
        </View>
    )
}