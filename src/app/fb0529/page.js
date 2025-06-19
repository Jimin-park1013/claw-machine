"use client"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useEffect } from "react";

export default function fb0529() {

  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBJ8mxYxEh63jdaMzpDv1RL30GkKUu5nM",
  authDomain: "nccu-113-2-yzc.firebaseapp.com",
  projectId: "nccu-113-2-yzc",
  storageBucket: "nccu-113-2-yzc.firebasestorage.app",
  messagingSenderId: "889340655222",
  appId: "1:889340655222:web:59dc9855c33dbed855d157",
  measurementId: "G-EXCRBHRDZV",
  databaseURL: "https://nccu-113-2-yzc-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);
  const dbRef = ref(database, "/");

  const auth = getAuth();
  const provider = new GoogleAuthProvider(); 


  useEffect(()=>{

    onValue(dbRef, (snapshot)=>{
      console.log( snapshot.val() );
    });

    const userRef = ref(database, "/accounts/0000001/");
    
    set(userRef, {
      name: "yzc",
      points: 200
    });

  }, []);


  const addNewAccount = () => {
    console.log("clicked");
    const accountRef = ref(database, "/accounts");

    push(accountRef, {
      name: "Wang",
      type: "User",
      point: "10"
    });

  }

  const login = ()=> {

    signInWithPopup(auth, provider).then((result)=>{
      console.log(result.user.displayName);
    });

  }



  return (
    <>
      fb0529
      <div onClick={ addNewAccount } className="text-white border-white border-2 px-4 py-1 inline-block ">Add new Acoount</div>
      <div onClick={ login } className="text-white border-white border-2 px-4 py-1 inline-block ">Login with GOOGLE</div>
    </>
  );
}


 