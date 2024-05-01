import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query'
//import { query } from 'firebase/database'
import auth from '@react-native-firebase/auth'

const user = auth().currentUser.uid;

const apiSlice = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://dance-off-6751e-default-rtdb.firebaseio.com/"
    }),
    tagTypes: ["Get"],
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => {'/Messages/' + user},
            
        })
    })
})