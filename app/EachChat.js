// import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, Pressable, StyleSheet, Text, View , Image, ScrollView, KeyboardAvoidingView, Touchable, TouchableOpacity} from 'react-native';
// import Styles from './Styles';
import { useState, useRef, useEffect} from 'react';
// import { Dimensions, Animated } from "react-native";
import {storage } from './FirebaseSetup';
// import { getAuth } from 'firebase/auth';
import Styles from './Styles';
import auth from '@react-native-firebase/auth'
import { getStorage, ref, uploadBytes,getDownloadURL, listAll, list } from 'firebase/storage';
import { TextInput} from 'react-native-gesture-handler';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import { useNavigation } from '@react-navigation/native';

export default function EachChat({route}) {
    const styles = Styles;
    const [images, setImages] = useState([]);
    const user = auth().currentUser.email;
    const getMessages = () => {
        setImages([]);
        const starter = `users/${route.params.user}/`+route.params.loc;
        const offset = 'gs://dance-off-6751e.appspot.com/users/' + route.params.user + '/'+route.params.loc;
        listAll(ref(storage,starter))
        .then((res)=>{
            console.log('rendered images')
            res.items.map((item) => {
                getDownloadURL(ref(storage, item))
                .then((url) =>  {
                    item = item+"";
                    //message parsing
                    let currentMessage = item.substring(offset.length+1).split(":");
                    
                    let messageObject = {
                        from: currentMessage[0],
                        message: currentMessage[1],
                        to: currentMessage[2],
                        date: parseInt(currentMessage[3])
                    }
                    setImages(images => [...images, {url: url, mo: messageObject }]);
                })
                .catch(err=>console.log(err));
            })
        })
        .catch((err)=>console.log(err))

        
        
        console.log("After",images)
    }
    useEffect(() => {
        getMessages();
        console.log("rendered messages")
    },[user]);

    // Message section ==>
   
    return (
        <View style={{flex:1, height:'110%'}}>
            <ScrollView style={{flex:2, height:'90%'}}>
                {images.map((item) => (
                    <View style={item.mo.from == user ? styles.headerContainer3 : styles.headerContainer2}>
                       <Text style = {styles.messagesFrom}>{item.mo.message}</Text>
                    </View> 
                ))}
            </ScrollView>
            <Messages route={route} getMessages = {getMessages}style={{flex:1, height:'110%'}}/>
        </View>
    )
}
const Messages = ({route, getMessages}) => {
    const [message, setMessage] = useState('');

    const uploadImage = () => {
        console.log(route)
        let theFile = null;
        let metadata = null;
        
        //mesage format: {from}:--message--:{to}:{time}
        let date = new Date();
        let formattedMessage =  route.params.user + ":" + message + ":" +route.params.loc + ":" +date.getTime();
        
        const storageRef = ref(storage,`users/${route.params.user}/${route.params.loc}/${formattedMessage}`);
        uploadBytes(storageRef, theFile, metadata)
          .then(() => {
            console.log('Message uploaded successfully!');
            getMessages();
          })
          .catch(error => {
            console.error('Error uploading image:', error);
          });
          const receiverRef = ref(storage,`users/${route.params.loc}/${route.params.user}/${formattedMessage}`);
        uploadBytes(receiverRef, theFile, metadata)
          .then(() => {
            console.log('Message uploaded successfully!');
          })
          .catch(error => {
            console.error('Error uploading image:', error);
          });
        }
    return (
        <View style={{bottom:0, padding:'4%', paddingBottom:'10%',backgroundColor:'rgba(111, 143, 175, 0.5)',flexDirection:'row'}}>
            
            <TextInput
            style={{width:250,backgroundColor:'white', borderRadius:25, padding:'5%'}} 
            key={Math.random}
            placeholder='Message'
            onChangeText={(text) => setMessage(text)}/>
            <TouchableOpacity style={{backgroundColor:'rgba(20, 52, 164, 0.2)',borderRadius:50, marginLeft:30, padding:'2%'}}>
                <Text style={{fontSize:30, color:'black'}} onPress={uploadImage}>send</Text>
            </TouchableOpacity>
        </View>
    )
}
