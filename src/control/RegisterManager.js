import { auth } from '../firebase'

class RegisterManager {
    // Registration Fn
    static async register(username, password) {

        auth.createUserWithEmailAndPassword(username, password)
            .then((userCredential) => {
                var user = userCredential.user
                console.log(user.email)
            })
            .catch((err) => {
                var errorMessage = err.message
                alert(errorMessage)
            });
    }
}

export default RegisterManager