import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCKwXlBRHLfWx73NgwbL6RUHaXvw_6uewI',
  authDomain: 'what-supclone.firebaseapp.com',
  projectId: 'what-supclone',
  storageBucket: 'what-supclone.appspot.com',
  messagingSenderId: '422182314586',
  appId: '1:422182314586:web:48d0b6cd6dc48fd45dee63',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
