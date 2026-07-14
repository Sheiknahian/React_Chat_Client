import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.config';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { socket } from '../Socket.Io/socket';


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosSecure = useAxiosSecure()

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
    const logout = () => {
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser)
            }
            setLoading(false)
            const newUser = {
                name: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                createdAt: new Date()
            }
            axiosSecure.post('/users', newUser)
            if(currentUser){
                socket.connect()
                socket.emit('join', currentUser.email)
            }
        })
        return ()=> {
            unsubscribe()
            socket.off('disconnected')        
        }
    }, [axiosSecure])
    const authInfo = {
        loginWithGoogle,
        loginWithFacebook,
        signUpWithEmail,
        updatedProfile,
        loginWithEmail,
        logout,
        user,
        loading
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;