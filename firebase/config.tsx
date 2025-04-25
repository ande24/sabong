import { initializeApp } from "firebase/app";
import { initializeAuth, browserSessionPersistence, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebase_app = initializeApp(firebaseConfig);

const auth = initializeAuth(firebase_app, {
    persistence: Platform.OS === "web"
    ? browserSessionPersistence 
    : getReactNativePersistence(ReactNativeAsyncStorage), 
});

export const firebase_auth = auth;

export default firebase_app;
  