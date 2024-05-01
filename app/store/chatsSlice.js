import auth from '@react-native-firebase/auth';
import {ref, set, get, child} from 'firebase/database'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../FrontEnd/FirebaseSetup';


const chats = createSlice({
    name:"Chats",
    initialState: {
        users: [],
        messages:[],
        chatCount:0,
        sp:null,
        currentUser:null
    },
    reducers: {
        setChats(state, action)  {
            state.sp = action.payload;
            state.users = Object.keys(state.sp)
        },
        setCurrentUser(state,action) {
            state.currentUser = action.payload
            state.messages = state.sp[state.currentUser]
        }
    }
})

export default chats;
export const chatActions = chats.actions;