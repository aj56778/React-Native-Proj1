// import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, Pressable, StyleSheet, Text, View , Image,ScrollView, TouchableOpacity} from 'react-native';
// import Styles from './Styles';
import { useState, useRef, useEffect} from 'react';
import EachChat from './EachChat';
// import { Dimensions, Animated } from "react-native";
import { storage } from './FirebaseSetup';
// import { auth } from './FirebaseSetup';
import auth from '@react-native-firebase/auth';
import Styles from './Styles';
import { getStorage, ref, uploadBytes,getDownloadURL, listAll, list } from 'firebase/storage';
import { TextInput } from 'react-native-gesture-handler';

export default function Chat({navigation}) {
    const styles = Styles;
    const [chats, setChats] = useState([]);
    const user = auth().currentUser.email
    useEffect(() => {
        setChats([]);
        const starter = `users/${user}`;
        const offset = 'gs://dance-off-6751e.appspot.com/users/' + user + '/Self';
        listAll(ref(storage,starter))
        .then((res)=>{
            console.log("res", res);
            res.prefixes.forEach((pref) => {
                console.log("pref", pref.fullPath);
                let temp = pref.fullPath.substring(starter.length+1, pref.fullPath.length);
                setChats(chats => [...chats, temp]);
            })
        })
        .catch((err)=>console.log(err));
    }, []);
    return (
        <ScrollView  >
            <NewChat/>
            {chats.map((item) => (
                <View style={styles.headerContainer1}>
                    <Text style={{fontSize: 40, width: '100%', backgroundColor:'rgb(255,255,242)', padding:'3%'}} onPress={()=>navigation.navigate('EachChat', {loc:item, user:user})}>{item}</Text>
                </View> 
            ))}

            
        </ScrollView>
    )
}
const NewChat = () => {
    const [newUser, setNU] = useState('');

    const createNewUser = () => {
            let theFile = null;
            let metadata = null;
            
            //mesage format: {from}:--message--:{to}:{time}
            let date = new Date();
            let startChat = auth.currentUser.email+ ":New chat has started with " + newUser + ":" + newUser +":" + date.getTime();
            
            const storageRef = ref(storage,`users/${auth.currentUser.email}/${newUser}/${startChat}`);
            uploadBytes(storageRef, theFile, metadata)
              .then(() => {
                console.log('Message uploaded successfully!');
              })
              .catch(error => {
                console.error('Error uploading image:', error);
              });
             startChat = newUser+ ":New chat has started with " + auth.currentUser.email + ":" + auth.currentUser.email +":" + date.getTime();

            const recieverRef = ref(storage,`users/${newUser}/${auth.currentUser.email}/${startChat}`);
            uploadBytes(recieverRef, theFile, metadata)
              .then(() => {
                console.log('Message uploaded successfully!');
              })
              .catch(error => {
                console.error('Error uploading image:', error);
              });
    }
    return (
        <View style={{
            backgroundColor:'rgba(12,1,24,0.2)',
            height:50,
            borderRadius:20,
            margin:'2%',
            flexDirection:'row'
        }}>
            <TextInput style={{
                backgroundColor:'rgba(192,244,245, 0.6)',
                marginTop: 5,
                height:40,
                borderRadius:20,
                margin:"2%",
                width:'80%',
                paddingLeft:4
            }} placeholder='Who do you want to chat with?'
            onChangeText={(text) => setNU(text)}
            >
                
            </TextInput>
            <TouchableOpacity >
                <Text style={{
                fontSize:'40%',
                paddingLeft:'4%',
                color:'blue'
                }}
                onPress={createNewUser}>
                    +
                    </Text>
            </TouchableOpacity>
        </View>
    )
}