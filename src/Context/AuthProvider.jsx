import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.config';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }
    const loginWithFacebook = () => {
        const facebookProvider = new FacebookAuthProvider()
        return signInWithPopup(auth, facebookProvider)
    }
    const signUpWithEmail = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    const updatedProfile = (updated) => {
        return updateProfile(auth.currentUser, updated)
    }
    const loginWithEmail = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return ()=> unsubscribe()
    }, [])
    const authInfo = {
        loginWithGoogle,
        loginWithFacebook,
        signUpWithEmail,
        updatedProfile,
        loginWithEmail,
        user
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;