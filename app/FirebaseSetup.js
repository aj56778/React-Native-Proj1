// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { Auth } from "firebase/auth";
import {getAuth} from "firebase/auth";
import {getStorage} from 'firebase/storage';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5KY79leuIRcQqNw-n0nSwgbiMfQ_rYfo",
  authDomain: "dance-off-6751e.firebaseapp.com",
  projectId: "dance-off-6751e",
  storageBucket: "dance-off-6751e.appspot.com",
  messagingSenderId: "922308703484",
  appId: "1:922308703484:web:f29b5a78ee476d18589379",
  measurementId: "G-BCEY91DJWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
export {storage, auth};