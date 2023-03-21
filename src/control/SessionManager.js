import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

class SessionManager {
    /**
     * Constructor for SessionManager
     * @throw Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }
    /**
     * Method to login user
     * Calls Firebase signInWithEmailAndPassword method to sign in user
     * @param {String} - username
     * @param {String} - password
     */
    // Login Fn
    static async login(username, password) {
        username = username + '@seehawk.com';
        var user = null;
        await signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                user = userCredential.user;
            })
            .catch(() => {});

        return !!user;
    }
    /**
     * Firebase method to logout user
     * Calls
     */
    // Logout Fn
    static async logout() {
        await signOut(auth);
    }
    /**
     * Firebase method to listen to any changes in authentication status of user
     */
    static authListener(callback) {
        onAuthStateChanged(auth, (user) => callback(user));
    }
}

export default SessionManager;
