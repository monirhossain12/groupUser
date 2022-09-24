import { useEffect, useState } from 'react';
import {auth, db} from './firebase-config'
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'

function App() {
  const [name, setname] = useState("")
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const usersRef=collection(db, "users")



onAuthStateChanged(auth,(currentUser)=>{
  setUser(currentUser)
})


const register = async()=>{
  try{
    const user= await createUserWithEmailAndPassword(auth, email,password)
console.log(user?._tokenResponse?.localId);
if(user){
  await addDoc(usersRef,{name:name,role:'user',email:'email', uid:user?._tokenResponse?.localId})
}

  } catch(error){
console.log(error.message);
  }
  
}

const login = async()=>{
  try{
    const user= await signInWithEmailAndPassword(auth, email,password)
console.log(user);

  } catch(error){
console.log(error.message);
  }
  
}

const logout = async()=>{
  await signOut(auth);
}

const createUser=async()=>{
  console.log('asche');
  await addDoc(usersRef,{name:name,})
}

const updateUser=async(id,name)=>{
  const userDoc=doc(db,"users",id)
  await updateDoc(userDoc,{name:"Naim",})
}

const deleteUser=async(id,name)=>{
  const userDoc=doc(db,"users",id)
  await deleteDoc(userDoc)
}


// useEffect(() => {
//   const getUsers= async()=>{
//     const data = await getDocs(usersRef)
//     setUsers(data?.docs.map((doc)=>({
// ...doc.data(),id:doc.id
//     })))
//     console.log(data);
//   }
//   getUsers()
// }, [])


  return (
    <div className="App">
      <input onChange={(e)=>setname(e.target.value)} type="text" placeholder='Name...'/>
      <button onClick={createUser}>Create User</button>
      {users?.map((user)=>{return <div>
        <h1>Name: {user?.name}</h1>
        <button onClick={()=>updateUser(user.id, user.name)}>Change Name to Naim</button>
        <button onClick={()=>deleteUser(user.id)}>Delete</button>
      </div>})}

      <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Email...' />
      <input onChange={(e)=>setPassword(e.target.value)} type="text" placeholder='Password...' />
      <button onClick={register}>Register</button>
      <button onClick={login}>login</button>
{JSON.stringify(user)}
    </div>
  );
}

export default App;
