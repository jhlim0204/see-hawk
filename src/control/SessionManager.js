import AuthManager from './AuthManager';

/**
 * Class for managing sessions
 * @author Nicholas Wee
 */
class SessionManager {
    /**
     * Constructor for SessionManager
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
        return await AuthManager.login(username, password);
    }

    /**
     * Method to logout user
     */
    static async logout() {
        await AuthManager.logout();
    }

    /**
     * Method to listen to any changes in authentication status of user
     * @param {function} callback - The callback function
     */
    static authListener(callback) {
        AuthManager.authListener(callback);
    }
}

export default SessionManager;
