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

        /*auth.onAuthStateChanged(function (user) {
            if (user) {
                var users = document.getElementById('username')

                while (users.hasChildNodes()) {
                    users.removeChild(users.firstChild);
                }
            }
        })

        window.location.reload()*/
    }

    static async isLoggedIn(){
        onAuthStateChanged(auth, (user) => {
            if (user) {
                return user.email.substring(0, user.email.length - 12);
            } else {
                return ""
            }
        })
    }
}

export default SessionManager