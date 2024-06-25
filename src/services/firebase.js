// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_API_KEY,
    projectId: import.meta.env.VITE_APP_API_KEY,
    storageBucket: import.meta.env.VITE_APP_API_KEY,
    messagingSenderId: import.meta.env.VITE_APP_API_KEY,
    appId: import.meta.env.VITE_APP_API_KEY,
    measurementId: import.meta.env.VITE_APP_API_KEY,
}

// Initialize Firebase
export const setupFirebase = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
