import {configureStore, createReducer, createSlice} from  '@reduxjs/toolkit'

//Speech

const SpeechStore = createSlice(
    {
        name: "speech",
        initialState: {
            speech : '',
            length: 0
        },
        reducers: {
            updateSpeech(state, action) {
                state.speech = action.payload;
                state.length = state.speech.length
            }
        }
    }
)
export const speechAction = SpeechStore.actions;
export default SpeechStore;