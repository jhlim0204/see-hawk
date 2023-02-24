import { auth } from '../firebase'
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";

class SessionManager {
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
}

export default SessionManager