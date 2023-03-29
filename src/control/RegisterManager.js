import AuthManager from './AuthManager';

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
        return await AuthManager.register(username, password);
    }
}

export default RegisterManager;
