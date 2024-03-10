//import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';
import { useState, useRef, useEffect} from 'react';
import { Dimensions, Animated, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { auth } from './FirebaseSetup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Voice from '@react-native-community/voice'
import Speech from './Speech';


export default function MainPage({navigation}) {
  const nav = useNavigation();
  const [posy, setPosy] = useState();
  const [dark, setDark] = useState();
  const resetRef = useRef(null);
  const dragRef = useRef(null);
  const [r, setr] = useState(0);
  const [d, setd] = useState(0);
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
    ])).start();
  },[animation]);
  
  const styles = Styles;
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerFont}>OfficeSnap</Text>
      </View>
      <Speech/>
      <Animated.View style={[styles.footerContainer1, {transform:[{scale:animation}]}]}>
        <Text style={styles.footerFont} onPress={() => navigation.navigate('Login')}>Login/Sign-Up</Text>
      </Animated.View>
      {/* <Animated.View style={[styles.footerContainer, {transform:[{scale:animation}]}]}>
        <Text style={styles.footerFont} onPress={() => navigation.navigate('Chats')}>Open My Office</Text>
      </Animated.View> */}
      {/* <StatusBar style="auto" /> */}

    </ScrollView>
  );
}