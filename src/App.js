import { useEffect, useState } from 'react';
import {auth, db} from './firebase-config'
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'


import { Route,Routes, Switch,BrowserRouter as Router } from 'react-router-dom';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

function App() {

  const [user, setUser] = useState([]);
  const [groups, setGroups] = useState([]);

  const usersRef=collection(db, "users")
  const groupsRef=collection(db, "groups")



onAuthStateChanged(auth,(currentUser)=>{
  setUser(currentUser)
})

if(user?.uid){
  return (
    <DashboardScreen/>
  );
}

   return (
    <Router>
          <Routes>
          <Route path="/" element={<LoginScreen/>} />
          <Route path="/signUp" element={<SignUpScreen/>} />
          </Routes>
    </Router>
  );
}

export default App;
