import {createSlice} from  '@reduxjs/toolkit'

const User = createSlice({
    name: "user",
    initialState: {
        passkey:"balloon",
        email: "Tester2@tester.com",
        password:"Tester2"
    },
    reducers: {
        //Im going to leave this here to remind me how
        getLogin(state, action) {
                return ({
                    email: state.email,
                    password: state.password
                })
        },
        setPasskey(state, action) {
            if (action.payload !== null) {
                state.passkey = action.payload.passkey;
                state.email = action.payload.email;
                state.passkey = action.payload.password;
            }
        }
    }
})
export const userAction = User.actions;
export default User;