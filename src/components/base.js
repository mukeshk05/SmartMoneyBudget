import firebase from 'firebase'
let config = {
    apiKey: "AIzaSyDYO5FfdKiE6zp2Bt1rdYUnhL3xxNt3uBI",
    authDomain: "react-firebase-auth-272e9.firebaseapp.com",
    databaseURL: "https://react-firebase-auth-272e9.firebaseio.com",
    projectId: "react-firebase-auth-272e9",
    storageBucket: "react-firebase-auth-272e9.appspot.com",
    messagingSenderId: "922542910301",
    appId: "1:922542910301:web:7d9383dd9b746ba41816b4",
    measurementId: "G-7LTMHK4P84"
};
const app=firebase.initializeApp(config);
export default app;