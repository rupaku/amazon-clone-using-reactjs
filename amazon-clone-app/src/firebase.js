import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCPMjwy4-UBIU0Ihm0OSI4E8YFhwXjTpoo",
  authDomain: "clone-2c804.firebaseapp.com",
  databaseURL: "https://clone-2c804.firebaseio.com",
  projectId: "clone-2c804",
  storageBucket: "clone-2c804.appspot.com",
  messagingSenderId: "148161924128",
  appId: "1:148161924128:web:cf826be9192c2fc74c0045",
  measurementId: "G-N1QPEM8MEQ",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
