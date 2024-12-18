/* istanbul ignore file */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
/*
 * TODO: Add SDKs for Firebase products that you want to use
 * https://firebase.google.com/docs/web/setup#available-libraries
 */

/*
 * Your web app's Firebase configuration
 * For Firebase JS SDK v7.20.0 and later, measurementId is optional
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDtUglXh0MelyhuGddAUmy-4Uw6whNiv-Q',
  authDomain: 'movies-series-132729.firebaseapp.com',
  databaseURL: 'https://movies-series-132729.firebaseio.com',
  projectId: 'movies-series-132729',
  storageBucket: 'movies-series-132729.appspot.com',
  messagingSenderId: '312565212967',
  appId: '1:312565212967:web:5eece94440a980cad56b02',
  measurementId: 'G-CEEN1P74RR'
}

// Initialize Firebase
const fire = initializeApp(firebaseConfig)

export default fire
