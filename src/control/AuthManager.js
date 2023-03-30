import { auth } from '../firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from 'firebase/auth';

/**
 * Class for managing sessions and new user registration
 * @author Leong Hong Yi
 */
class AuthManager {
    /**
     * Constructor for AuthManager
     * @throws Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    /**
     * Method to login user
     * @param {string} username - The username
     * @param {string} password - The password
     * @return {boolean} Whether the login process is successful
     */
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
     * Method to logout user
     */
    static async logout() {
        await signOut(auth);
    }

    /**
     * Method to register user
     * @param {string} username - The username
     * @param {string} password - The password
     * @return {boolean} Whether the register process is successful
     */
    static async register(username, password) {
        username = username + '@seehawk.com';
        let user = null;
        await createUserWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                user = userCredential.user;
            })
            .catch(() => {});
        await this.logout();
        return !!user;
    }

    /**
     * Method to listen to any changes in authentication status of user
     * @param {function} callback - The callback function
     */
    static authListener(callback) {
        onAuthStateChanged(auth, (user) => callback(user));
    }
}

export default AuthManager;
