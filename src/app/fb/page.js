// Realtime Database 即時資料庫範例程式碼

"use client"

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useState, useEffect } from "react";

export default function FB() {

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

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ref 是指向你要上傳到的路徑，也可以想像成資料夾
    const dbRef = ref(database, "/");
  
    onValue(dbRef, (snapshot) => {
      // 偵測資料變動，會隨時取得最新資料
      const data = snapshot.val();
      setData(data);
      setLoading(false);
    }, (error) => {
      setError(error);
      setLoading(false);
    });


  }, []);

  const uploadData = () => {
    // 將資料 push 到對應的 list 內
    const dbRef = ref(database, "/");
    push(dbRef, {
      name: "John",
      age: 30,
      time: Date.now()
    });

  }

  return (
    <div className="w-full h-screen">
      <h1>FB</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => {
        uploadData();
      }}>Set Data</button>
    </div>
  );
}