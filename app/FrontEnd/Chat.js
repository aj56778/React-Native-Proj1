// import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, Pressable, StyleSheet, Text, View , Image,ScrollView, TouchableOpacity} from 'react-native';
// import Styles from './Styles';
import { useState, useRef, useEffect} from 'react';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Styles from './Styles';
//import { getStorage, ref, uploadBytes,getDownloadURL, listAll, list } from 'firebase/storage';
import { TextInput } from 'react-native-gesture-handler';
// import {ref, set, get, child} from 'firebase/database'
import { chatActions } from '../store/chatsSlice';
export default function Chat({navigation}) {
    const styles = Styles;
    const chats = useSelector((state) => state.chats.users);
    const dispatch = useDispatch();
    const user = auth().currentUser.uid
    useEffect(() => {
        dispatch(chatActions.getChats());
        console.log("chats", chats)

    }, []);
    return (
        <ScrollView  >
            <NewChat/>
            {chats.map((item) => (
                <View style={styles.headerContainer1}>
                    <Text style={{
                        fontSize:30, 
                        padding:'1%',}} onPress={()=>navigation.navigate('EachChat', {loc:item, user:user})}>{item}</Text>
                </View> 
            ))}
        </ScrollView>
    )
}
const NewChat = () => {
    const [newUser, setNU] = useState('');
    let date = new Date();
    const dispatch = useDispatch();
    const createNewUser = () => {
        dispatch(chatActions.getChats(newUser))
    }
    return (
        <View style={{
            backgroundColor:'rgba(12,1,24,0.2)',
            height:50,
            borderRadius:20,
            margin:'2%',
            flexDirection:'row',
            
        }}>
            <TextInput style={{
                backgroundColor:'rgba(192,244,245, 0.6)',
                marginTop: 5,
                height:40,
                borderRadius:20,
                margin:"2%",
                width:'80%',
                paddingLeft:4,
                borderColor: "black",
                borderWidth: 2
            }} placeholder='Who do you want to chat with?'
            onChangeText={(text) => setNU(text)}
            >
                
            </TextInput>
            <TouchableOpacity  >
                <View style={{
                    backgroundColor: '#ADD8E6',
                    borderRadius: 50,
                    height: "100%",
                    borderColor: "black",
                    borderWidth: 2
                }}>
                <Text style={{
                fontSize:38,
                paddingLeft:'4%',
                color:'blue',
                width:"100%",
                textAlign: "center",
                
            }}
                onPress={createNewUser}>
                    +
                    </Text>
                    </View>
            </TouchableOpacity>
        </View>
    )
}