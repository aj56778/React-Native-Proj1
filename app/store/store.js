import { configureStore, combineReducers } from "@reduxjs/toolkit";
import SpeechStore from "./speech_store";
import User from "./current_user";
import chats from "./chatsSlice";

const store = configureStore({
    reducer: {
        speech: SpeechStore.reducer,
        user: User.reducer,
        chats: chats.reducer
    }
})
//export type RootState = ReturnType<typeof store.getState>;
export default store;