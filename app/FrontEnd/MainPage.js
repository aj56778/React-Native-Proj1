//import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';
import { useState, useRef, useEffect} from 'react';
import { Dimensions, Animated, ActivityIndicator } from "react-native";
import { auth } from './FirebaseSetup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Voice from '@react-native-community/voice'
import Speech from './Speech';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainPage({navigation}) {
  // const nav = useNavigation()
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
  
  const styles = Styles;
  return (
    <SafeAreaView style={styles.screen}>
      <View style={{flex:1,
      backgroundColor: '#ffe',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: "20%",
      width: "100%",
      height:"20%",
      padding:'2%',
      position:"absolute"}}>
        <Text style={styles.headerFont}>OfficeSnap</Text>
      </View>
      <View style ={
        {position:'absolute',
        marginVertical:"70%",
        width:"100%", 
        height:"100%", 
        alignContent:"center",
        }
        }>
      <Text style={{fontSize:30,
      textAlign:"center"}}>Say "Hey Marvin!"</Text>
      </View>
      <Speech/>
      {/* <Animated.View style={[styles.footerContainer1, {transform:[{scale:animation}]}]}>
        <Text style={styles.footerFont} onPress={() => navigation.navigate('Login')}>Login/Sign-Up</Text>
      </Animated.View> */}
      {/* <Animated.View style={[styles.footerContainer, {transform:[{scale:animation}]}]}>
        <Text style={styles.footerFont} onPress={() => navigation.navigate('Chats')}>Open My Office</Text>
      </Animated.View> */}
      {/* <StatusBar style="auto" /> */}

    </SafeAreaView>
  );
}