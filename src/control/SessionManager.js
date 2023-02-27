import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

class SessionManager {
    constructor(){
        throw Error('A static class cannot be instantiated.');
    }

    // Login Fn
    static async login(username, password) {
        username = username + "@seehawk.com"
        var user = null;
        await signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                user = userCredential.user
            })
            .catch((error) => {
            });
        
        return !!user;
    }

    // Logout Fn
    static async logout() {
        await signOut(auth)
    }

    static authListener(callback){        
        onAuthStateChanged(auth, (user) => callback(user))
    }
}

export default SessionManager