import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import SessionManager from './SessionManager';

class RegisterManager {
    // Registration Fn
    static async register(username, password) {
        username = username + "@seehawk.com"
        let user = null
        await createUserWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                user = userCredential.user
            })
            .catch((err) => {
            });
        await SessionManager.logout();
        return !!user
    }
}

export default RegisterManager