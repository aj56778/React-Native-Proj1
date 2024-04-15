import { HeaderStyleInterpolators } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const {height} = Dimensions.get('screen');
const footerPos = height - 375;
const Styles = StyleSheet.create({
  screen: {
    backgroundColor:'#87CDEE',
    height:"100%"
  },
    headerContainer: {
      flex:1,
      backgroundColor: '#ffe',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: "20%",
      marginHorizontal:"20%",
      padding:'2%',
      position:"absolute"
    },
    headerContainer1: {
      flex:1,
      backgroundColor: '#ffe',
      padding:'1%',
      borderRadius:'20%',
    },
    headerContainer2: {
      flex:1,
      backgroundColor: '#ffe',
      padding:'3%',
      borderRadius:'20%',
      margin:5,
      width:'50%',
    },
    headerContainer3: {
      flex:1,
      backgroundColor: '#ffe',
      padding:'3%',
      borderRadius:'20%',
      margin:5,
      width:'50%',
      marginLeft:'50%'
    },
    messagesFrom: {
      fontFamily:'Arial',
      fontSize:20
    },
    headerFont: {
      fontSize:40,
    },
    button: {
      backgroundColor:'black',
      marginTop:5,
    },
    b1: {
      fontSize:50,
      textAlign:'center',
      color:'white'
    },
    footerContainer: {
      alignItems:'center',
      top:footerPos,
      marginBottom:'5%'
    },
    footerFont : {
      fontSize:50,
      fontWeight:'300'
    },
    footerContainer1: {
      alignItems:'center',
      top:footerPos - 100,
      marginBottom:'5%'
    }
    ,
    input: {
      backgroundColor:'black'
    }
    
  });
export default Styles;  