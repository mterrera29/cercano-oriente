import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from "firebase/app";
import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyB9Hkxxe1f8gYAq-sqOZ3qX1xY5THflq2k",
  authDomain: "mesopotamia-36df5.firebaseapp.com",
  projectId: "mesopotamia-36df5",
  storageBucket: "mesopotamia-36df5.appspot.com",
  messagingSenderId: "882257115270",
  appId: "1:882257115270:web:3e4ebeadb14659e1f5b907",
  measurementId: "G-VK1KXEE9MV"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
