import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDrUMajljt55p23RwseV2tuJBFgV-8vRS0",
    authDomain: "disneyclone-aae25.firebaseapp.com",
    projectId: "disneyclone-aae25",
    storageBucket: "disneyclone-aae25.appspot.com",
    messagingSenderId: "324494577177",
    appId: "1:324494577177:web:fe884e34c7ac8a26efe488",
    measurementId: "G-DRVLJKWRWG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;