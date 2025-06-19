"use client";
import { initializeApp, getApps } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useState } from "react";

export default function FBAuth() {
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

  // ✅ 判斷是否已初始化過 Firebase App，避免重複初始化
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app); // ✅ 明確使用同一個 app
  auth.useDeviceLanguage();

  const [user, setUser] = useState(null);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user, token, credential);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">FB Auth</h1>
      <h3>User: {user?.displayName || "尚未登入"}</h3>
      <button
        onClick={signIn}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign In with Google
      </button>
    </div>
  );
}
