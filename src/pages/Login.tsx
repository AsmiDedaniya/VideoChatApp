import React from 'react'
import { EuiButton, EuiFlexGroup,EuiFlexItem,EuiImage,EuiProvider ,EuiSpacer,EuiText,EuiTextColor,EuiPanel} from '@elastic/eui'
import animation from '../assets/animation.gif';
import logo from "../assets/logo.png"
 import '@elastic/eui/dist/eui_theme_dark.css'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { userRef } from '../utils/FirebaseConfig';
import { addDoc } from 'firebase/firestore';
import { query, where, getDocs, } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hook';
import {setUser} from '../app/slices/AurhSlice'
const Login = () => {

  const navigate=useNavigate();
  const dispatch=useAppDispatch();

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })
    const login=async()=>{
      const provider=new GoogleAuthProvider();
      // const data=await signInWithPopup(firebaseAuth,provider);
      // console.log("data",data);
      const{
        user:{displayName,email,uid},
      }=await signInWithPopup(firebaseAuth,provider);
      if(email){
        const firestoreQuery=query(userRef, where("uid","==",uid))
        const fetchedUsers=await getDocs(firestoreQuery);
        if(fetchedUsers.docs.length===0){
          await addDoc(userRef,{
            uid,
            name:displayName,
            email
          })
        }
      }
            dispatch(setUser({uid,name:displayName,email}))
      navigate("/");
    }

  
  return (
    <EuiProvider colorMode="dark">
        <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        style={{width:"100vw",height:"100vh"}}
        >
           <EuiFlexItem grow={false}>
            <EuiPanel paddingSize="xl">
              <EuiFlexGroup justifyContent='center' alignItems='center'>
              <EuiFlexItem>
                <EuiImage src={animation} alt="logo"/>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiImage src={logo} alt="logo" size="230px"/>
              <EuiSpacer size="xs"/>
              <EuiText textAlign="center" grow={false}>
                <h3>
                  <EuiTextColor>One Platform to</EuiTextColor>
                  <EuiTextColor color="#0b5cff">connect</EuiTextColor>
                </h3>
              </EuiText>
              <EuiSpacer size="s"/>
              <EuiButton fill onClick={login}>Login with Google</EuiButton>
            </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
           </EuiFlexItem>
        </EuiFlexGroup>
    </EuiProvider>
  )
}


export default Login;



