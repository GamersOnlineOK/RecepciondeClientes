import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDzmINzTlABb1LuNkG38IR7uSv6ilwxOgE",
    authDomain: "sumarios-administrativos.firebaseapp.com",
    projectId: "sumarios-administrativos",
    storageBucket: "sumarios-administrativos.appspot.com",
    messagingSenderId: "845018584607",
    appId: "1:845018584607:web:b08aea1820d44136d6a72a"
});

export const getFirebase = () => {
  return app;
};

export const getFirestore = () => {
  return firebase.firestore(app);
};
export const storage=()=>{
  return firebase.storage(app);
}