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
        await SessionManager.logout();
        return !!user;
    }
}

export default RegisterManager;