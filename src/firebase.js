
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBM0pLjeHaC-qo1lGZZhghaTO4wy7D6ekE",
  authDomain: "fir-test-2a59e.firebaseapp.com",
  projectId: "fir-test-2a59e",
  storageBucket: "fir-test-2a59e.appspot.com",
  messagingSenderId: "501966968694",
  appId: "1:501966968694:web:583d152c2c8926160bcc57"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);