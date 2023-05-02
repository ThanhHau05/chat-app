import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MID,
};

firebase.initializeApp(firebaseConfig);

const myFirebase = firebase;

export { myFirebase };
export { db, auth, provider, dbg };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = firebase.firestore();
const dbg = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// export const saveUserName = async (userName: string) => {
//   const docRef = db.collection("user name").doc("username list");
//   await docRef.get().then(async (doc) => {
//     if (doc.exists) {
//       await docRef.set({ username: [userName] });
//     } else {
//       await docRef.update({
//         username: firebase.firestore.FieldValue.arrayUnion(userName),
//       });
//     }
//   });
// };

// export const getUserNameList = async () => {
//   const docRef = db.collection("user name").doc("username list");
//   await docRef.get().then(async (doc) => {
//     if (doc.exists) {
//       const usersArray = doc.data()?.username; // lấy mảng users
//       return usersArray;
//     } else {
//       return null;
//     }
//   });
// };
