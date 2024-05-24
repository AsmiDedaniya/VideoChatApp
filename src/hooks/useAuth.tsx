import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { setUser } from '../app/slices/AurhSlice';
const useAuth = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(firebaseAuth,(currentUser)=>{
       // console.log(currentUser);
                if(!currentUser) navigate("/login")
                    else
                {
                        dispatch(
                            setUser({
                                uid:currentUser.uid,
                                name:currentUser.displayName,
                                email:currentUser.displayName
                            })
                        );
                }
    })
    return ()=>unsubscribe();
  },[dispatch,navigate]);

}

export default useAuth
