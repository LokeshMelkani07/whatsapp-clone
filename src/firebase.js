import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
// import { initializeApp } from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2_1MIz6GCMd-9Rga-fJot6bCATbm9KP4",
  authDomain: "whatsapp-clone-35a51.firebaseapp.com",
  projectId: "whatsapp-clone-35a51",
  storageBucket: "whatsapp-clone-35a51.appspot.com",
  messagingSenderId: "678646013768",
  appId: "1:678646013768:web:75e423d69274a8fcf15d7d",
  measurementId: "G-P8W33W76P4",
};

// Use this to initialize the firebase App
export const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
// To get goggle authentication
const provider = new firebase.auth.GoogleAuthProvider();
const storage = getStorage(firebaseApp);
// const storage = getStorage(firebaseApp);

export default firebase;
export { auth, db, storage, provider };
