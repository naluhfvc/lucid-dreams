import { initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

const firebaseConfig = {
    apiKey: "AIzaSyCi_J5lv7utn-AwGj-LJ-stOljmu629LjQ",
    authDomain: "lucid-dreams-firebase.firebaseapp.com",
    databaseURL: "https://lucid-dreams-firebase-default-rtdb.firebaseio.com",
    projectId: "lucid-dreams-firebase",
    storageBucket: "lucid-dreams-firebase.appspot.com",
    messagingSenderId: "779868598540",
    appId: "1:779868598540:web:cdc6178964675ac98c1929",
    measurementId: "G-R3MGX5B5JX"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

const database: Database = getDatabase(app);
const auth: Auth = getAuth(app);

const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

export { database, auth, googleProvider };
