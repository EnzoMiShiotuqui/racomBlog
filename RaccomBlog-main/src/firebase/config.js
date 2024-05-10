
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyC6FITOJQ-gwDmOWjrCFB5Ua95cWCf3AOo",
  authDomain: "blog-ca74a.firebaseapp.com",
  projectId: "blog-ca74a",
  storageBucket: "blog-ca74a.appspot.com",
  messagingSenderId: "949645840344",
  appId: "1:949645840344:web:b70edb292dde4dc2476cad"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }