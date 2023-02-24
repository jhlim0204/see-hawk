import { auth } from '../firebase'

class SessionManager {
    // Login Fn
    static async login(username, password) {
        auth.signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
                var user = userCredential.user
                console.log(user.email)
            })
            .catch((err) => {
                var errorMessage = err.message
                alert(errorMessage)
            });

        // This method gets invoked in the UI when there are changes in the authentication state
        // when the user is signed in
        auth.onAuthStateChanged(function (user) {
            if (user) {
                var email = user.email

                var users = document.getElementById('username')
                var text = document.createTextNode(email)

                if (!users[0]) {
                    users.appendChild(text)
                }
            }
        })
    }

    // Logout Fn
    static async logout() {
        auth.signOut()

        auth.onAuthStateChanged(function (user) {
            if (user) {
                var users = document.getElementById('username')

                while (users.hasChildNodes()) {
                    users.removeChild(users.firstChild);
                }
            }
        })

        window.location.reload()
    }
}

export default SessionManager