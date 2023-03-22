import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import SessionManager from './SessionManager';
/**
 * Class for registering a new user
 */
class RegisterManager {
    /**
     * Constructor for RegisterManager
     * @throws Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }
    /**
     * Method to register user
     * Calls Firebase method createUserWithEmailAndPassword to create user
     * @param {string} username - username
     * @param {string} password - password
     * @returns 
     */
    // Registration Fn
    static async register(username, password) {
        username = username + '@seehawk.com';
        let user = null;
        await createUserWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                user = userCredential.user;
            })
            .catch(() => {});
        await SessionManager.logout();
        return !!user;
    }
}

export default RegisterManager;
