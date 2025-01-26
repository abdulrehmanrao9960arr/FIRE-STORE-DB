import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD69sX75mm-1wvWq1gN9YNm21KrSmfC2FE",
    authDomain: "first-e99e9.firebaseapp.com",
    projectId: "first-e99e9",
    storageBucket: "first-e99e9.firebasestorage.app",
    messagingSenderId: "767812875218",
    appId: "1:767812875218:web:a4c714606245b9412e4e0b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);