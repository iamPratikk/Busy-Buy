// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABHDsz_pcEN7vYFsnDgnRrXEi4FduvXDI",
  authDomain: "busy-buy-15fd5.firebaseapp.com",
  projectId: "busy-buy-15fd5",
  storageBucket: "busy-buy-15fd5.appspot.com",
  messagingSenderId: "979019900171",
  appId: "1:979019900171:web:9f1a4a17bef626f55b6e0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth ,db};