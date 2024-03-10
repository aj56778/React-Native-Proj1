import Voice from '@react-native-community/voice'
import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'


export default function Speech() {
    const [result, setResult] = useState('');
    const [isLoading, setLoading] = useState(false);
    
    const speechStartHandler = e => {
        console.log('speechStart successful', e);
      };
    
      const speechEndHandler = e => {
        setLoading(false);
        console.log('stop handler', e);
      };
    
      const speechResultsHandler = e => {
        const text = e.value[0];
        setResult(text);
      };
    
      const startRecording = async () => {
        setLoading(true);
        try {
          await Voice.start('en-Us');
        } catch (error) {
          console.log('error', error);
        }
      };
    
      const stopRecording = async () => {
        try {
          await Voice.stop();
          setLoading(false);
          console.log(result);
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
            <View >
              {isLoading ? (
                <ActivityIndicator size="large" color="black" />
              ) : (
                <TouchableOpacity onPress={startRecording}>
                  <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize:35}}>Speak</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={stopRecording}>
                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize:35}}>Stop</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={clear}>
              <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize:35}}>Clear</Text>
            </TouchableOpacity>
            <View>
              <Text>{result}</Text>
            </View>
        </View>
    )
}
