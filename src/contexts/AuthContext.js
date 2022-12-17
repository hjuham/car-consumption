import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    function logout(){
        return auth.signOut()
    }
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }
    function changePassword(password){
        return auth.currentUser.updatePassword(password)
    }
    function changeEmail(email){
        return auth.currentUser.updateEmail(email)
    }
    function deleteUser(){
        return auth.currentUser.delete()
    }
    function updateProfile(username, url){
        if (url.match(/\.(jpeg|jpg|png)$/) == null){
            url = ""
        }
        return auth.currentUser.updateProfile({displayName: username, photoURL: url})
    }
    useEffect(() => {
        const unsubsribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubsribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        changePassword,
        changeEmail,
        deleteUser,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
