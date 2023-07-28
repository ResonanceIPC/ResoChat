const fs = require('fs');
const crypto = require('crypto');

// Cryptography class
class Cryptography {

    // Constructor for setting defaultpassword
    constructor(password) {
        if (this.#check_password_format(password) !== true){return this.#check_password_format(password)}
        this._password = password;
        this._password_hash = this.#hash_password();
    };







    // ******** Hidden functions for main methods ********

    // Method for checking if password format is true
    #check_password_format(password) {
        const allowed_characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/"
        if (typeof password !== "string") {
            return {"error_code" : "902"}
        }
        if (password.length < 4) {
            return {"error_code" : "902"}
        }
        if (password.length > 240) {
            return {"error_code" : "902"}
        }
        for (let i = 0; i < password.length; i++) {
            if (allowed_characters.includes(password[i]) !== true){
                return {"error_code" : "902"}
            }
        }
        return true;
    };

    // This function will return hash of password
    #hash_password() {
        let password = this._password;
        const hash = crypto.createHash('sha3-512');
        hash.update(password);
        const hashed_password = hash.digest('hex');
        return hashed_password;
    };

    // This is function for reading file
    #read_file(path) {
        let data;
        try {
            data = fs.readFileSync(path);
        }
        catch(error) {
            return {"error_code" : 901};
        }
        return data;
    };

    // ******** Hidden functions for main methods ********







    // ******** Getters and setters ********

    // Getter for password
    get password() {
        return undefined;
    };

    // Setter for password
    set password(new_password) {
        if (this.#check_password_format(new_password) !== true){return this.#check_password_format(new_password)}
        this._password = new_password;
        this._password_hash = this.#hash_password();
    };

    // ******** Getters and setters ********







    // ******** Main methods of class ********

    // Method for setting password for cryptography model
    set_password(new_password) {
        if (this.#check_password_format(new_password) !== true){return this.#check_password_format(new_password)}
        this._password = new_password;
        this._password_hash = this.#hash_password();
    };

    // Getting error data by code
    get_error_data(error_code){
        if (error_code?.error_code !== undefined){
            error_code = error_code.error_code;
        }
        const errors = {
            "900": "Error while decrypting",
            "901": "Error while trying to access file",
            "902": "Bad password format",
        }
        return errors[error_code];
    };

    // Method for encrypting data (string)
    encrypt(data) {
        // data = data.toString();
        const key = crypto.pbkdf2Sync(this._password_hash, '', 100000, 32, 'sha256');
        const iv = crypto.createHash('sha256').update(this._password_hash).digest().slice(0, 16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let ciphertext = cipher.update(data, 'utf8', 'hex');
        ciphertext += cipher.final('hex');
        return iv.toString('hex') + ciphertext;
    };

    // Method for decrypting data (string)
    decrypt(data) {
        // data = data.toString();
        try {
            const iv = Buffer.from(data.slice(0, 32), 'hex');
            const encryptedText = data.slice(32);
            const key = crypto.pbkdf2Sync(this._password_hash, '', 100000, 32, 'sha256');
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let plaintext = decipher.update(encryptedText, 'hex', 'utf8');
            plaintext += decipher.final('utf8');
            return plaintext;
        }
        catch (error) {
            return { "error_code": 900 }
        }
    };

    // Encrypt file
    encrypt_file(path) {
        path = path.toString();
        let data = this.#read_file(path).toString();
        if (data["error_code"] !== undefined) {return data}
        let encrypted_data = this.encrypt(data);
        return encrypted_data;
    };

    // Decrypt file
    decrypt_file(path) {
        path = path.toString();
        let data = this.#read_file(path).toString();
        if (data["error_code"] !== undefined) {return data}
        let decrypted_data = this.decrypt(data);
        return decrypted_data;
    };

    // ******** Main methods of class ********





    
}

// Exporting library for global use
module.exports = Cryptography;