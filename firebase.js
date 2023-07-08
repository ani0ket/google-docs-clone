import { FirebaseOptions, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7HbUXaEGbis13m9PTRInjxMgv-xsWkVQ",
  authDomain: "docs-clone-99d0d.firebaseapp.com",
  projectId: "docs-clone-99d0d",
  storageBucket: "docs-clone-99d0d.appspot.com",
  messagingSenderId: "502650756997",
  appId: "1:502650756997:web:96d26fa3b96c01d1e1aeec",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const app = createFirebaseApp(firebaseConfig);
const db = getFirestore(app);

const firebaseAuth = getAuth(app);

export { db, firebaseAuth };
