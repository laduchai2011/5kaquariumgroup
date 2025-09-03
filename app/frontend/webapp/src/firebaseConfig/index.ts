import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCjbUjJVfRA7kh5Bscvf2KmKWuu91AfcJs",
    authDomain: "kaquariumgroup.firebaseapp.com",
    projectId: "kaquariumgroup",
    storageBucket: "kaquariumgroup.firebasestorage.app",
    messagingSenderId: "559063636084",
    appId: "1:559063636084:web:743a6b8a78a67dad179921",
    measurementId: "G-P1B964S849"
};

const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);