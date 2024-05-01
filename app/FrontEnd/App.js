import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import MainPage from './MainPage';
import Chat from './Chat';
import EachChat from './EachChat';
import Login from './Login';
import Speech from './Speech';
import { Provider } from 'react-redux';
import store from '../store/store';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store = {store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#87CDEE'
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize:25
        },
      }}>
        <Stack.Screen name="Home" component={MainPage}></Stack.Screen>
        <Stack.Screen name="Chats" component={Chat}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="EachChat" component={EachChat} 
        options={({route})=>({
          title : route.params.name,
          })}></Stack.Screen>
          <Stack.Screen name="DontUse" component={Speech}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}