// Requiring global libraries
const fs = require("fs");
const crypto = require('crypto');

// Requiring local libraries
const Cryptography = require("../cryptography/cryptography.js");

// Defining main class from which we can create room and do very basic checks
class Rooms {

    // Defining static codes
    static empty_code = `(:~empty~:)`;
    static error_code = `(:~error~:)`;
    static success_code = `(:~success~:)`;

    // This functions ensures that folder where all rooms data are saved
    static #ensure_rooms_folder() {
        if (!(fs.existsSync("data/rooms") && fs.statSync("data/rooms").isDirectory())) {
            try {
                fs.mkdirSync("data/rooms");
                return true;
            } catch (error) {
                return false;
            }
        }
        return true;
    }

    // Function for generating special hash for room connected with seed and password
    static get_room_hash(seed, password) {
        // Checking if room seed format is valid
        const seed_check = this.check_seed_format(seed);
        if (seed_check["error_code"] !== undefined) { return seed_check; };

        // Checking if room password format is valid
        const password_check = this.check_password_format(password);
        if (password_check["error_code"] !== undefined) { return password_check; };

        // Generating hash
        const hash = crypto.createHash('sha3-512');
        const room_combination_string = `${password}${seed}${password}`;
        hash.update(room_combination_string);
        const room_hash = hash.digest('hex');
        return room_hash;
    }

    // Function for checking if room exists by its room seed and password
    static check_room_exists(seed, password) {
        // Checking if room seed format is valid
        const seed_check = this.check_seed_format(seed);
        if (seed_check["error_code"] !== undefined) { return seed_check; };

        // Checking if room password format is valid
        const password_check = this.check_password_format(password);
        if (password_check["error_code"] !== undefined) { return password_check; };

        const room_hash = this.get_room_hash(seed, password);
        const room_folder_path = `data/rooms/${room_hash}`
        if (fs.existsSync(room_folder_path) && fs.statSync(room_folder_path).isDirectory()) {
            return true;
        }
        return false;
    }

    // Function for checking password format
    static check_password_format(password) {
        const allowed_characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/"
        if (typeof password !== "string") {
            return { "error_code": "218" }
        }
        if (password.length < 4) {
            return { "error_code": "218" }
        }
        if (password.length > 240) {
            return { "error_code": "218" }
        }
        for (let i = 0; i < password.length; i++) {
            if (allowed_characters.includes(password[i]) !== true) {
                return { "error_code": "218" }
            }
        }
        return true;
    };

    // Function for checking seed format
    static check_seed_format(seed) {
        const allowed_characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/"
        if (typeof seed !== "string") {
            return { "error_code": "217" }
        }
        if (seed.length < 3) {
            return { "error_code": "217" }
        }
        if (seed.length > 240) {
            return { "error_code": "217" }
        }
        for (let i = 0; i < seed.length; i++) {
            if (allowed_characters.includes(seed[i]) !== true) {
                return { "error_code": "217" }
            }
        }
        return true;
    };

    // This function will return new room class with all room data
    static room(seed, password) {
        // Checking if room seed format is valid
        const seed_check = this.check_seed_format(seed);
        if (seed_check["error_code"] !== undefined) { return seed_check; };

        // Checking if room password format is valid
        const password_check = this.check_password_format(password);
        if (password_check["error_code"] !== undefined) { return password_check; };

        // Creating and returning room object
        let room = new Room(seed, password);
        return room;
    }

    // Getting error data of code
    static get_error_data(error_code) {
        if (error_code?.error_code !== undefined) {
            error_code = error_code.error_code;
        }
        const errors = {
            "200": "Error while creating rooms global folder",
            "201": "Error while creating room folder",
            "202": "Error while creating room data file",
            "203": "Bad name format",
            "204": "Bad description format",
            "205": "Error while creating room messages folder",
            "206": "Error while creating room files folder",
            "207": "Error while creating room default messages file",
            "208": "Error while accessing room data file",
            "209": "Error while updating room data file",
            "210": "Bad nickname format",
            "211": "Bad message format",
            "212": "Error while reading room messages file",
            "213": "Error while creating room messages file",
            "214": "Error while incrementing messages count by one",
            "215": "Room is disabled",
            "216": "Room with given seed and password already exists",
            "217": "Bad room seed format",
            "218": "Bad room password format",
            "219": "Room with given seed and password does not exist",
            "220": "Bad N format,must be positive number.",
        }
        return errors[error_code];
    };

    // Function for creating room which will return new room class
    static create_room(seed, password, name = "New Room", description = "") {
        // Checking if room seed format is valid
        const seed_check = this.check_seed_format(seed);
        if (seed_check["error_code"] !== undefined) { return seed_check; };

        // Checking if room password format is valid
        const password_check = this.check_password_format(password);
        if (password_check["error_code"] !== undefined) { return password_check; };

        // Checking if room exists or ont
        if (Rooms.check_room_exists(seed, password) === true) { return { "error_code": "216" } }

        // Ensuring that global rooms folder exists
        const rooms_folder_ensurement = this.#ensure_rooms_folder(seed, password);
        if (rooms_folder_ensurement !== true) { return { "error_code": "200" }; };

        // Creating new room and returning that room
        let new_room = new Room(seed, password);

        const room_setup_feedback = new_room.setup(name, description);
        if (room_setup_feedback["error_code"] !== undefined) { return room_setup_feedback }

        return new_room;
    }
}

// Class room which will be created when trying to access room functions
class Room {

    // Constructor for defining base variables connected with Room
    constructor(seed, password) {
        this.seed = seed;
        this.password = password;
        this["sections"] = {};
        this.cryptography = new Cryptography(password);
        this.room_hash = Rooms.get_room_hash(seed, password);
        this.room_path = `data/rooms/${this.room_hash}`;
        this.section_amount = 100;
        this.exists = Rooms.check_room_exists(seed, password);
    }

    // Function for getting millisiconds passed from 1970
    #get_points_now() {
        let date = new Date();
        let milliseconds_passed = date.getTime();
        return milliseconds_passed;
    };

    // Function for ensuring that folder of room exists
    #ensure_room_folder() {
        const room_folder_path = `${this.room_path}`
        if (!(fs.existsSync(room_folder_path) && fs.statSync(room_folder_path).isDirectory())) {
            try {
                fs.mkdirSync(room_folder_path);
                return true;
            } catch (error) {
                return false;
            }
        }
        return true;
    }

    // Function for ensuring that room messages folder exists
    #ensure_room_messages_folder() {
        const room_messages_folder_path = `${this.room_path}/${this.#hash_data_for_room("messages")}`
        if (!(fs.existsSync(room_messages_folder_path) && fs.statSync(room_messages_folder_path).isDirectory())) {
            try {
                fs.mkdirSync(room_messages_folder_path);
                return true;
            } catch (error) {
                return false;
            }
        }
        return true;
    }

    // Function for ensuring that room files folder exists
    #ensure_room_files_folder() {
        const room_files_folder_path = `${this.room_path}/${this.#hash_data_for_room("files")}`
        if (!(fs.existsSync(room_files_folder_path) && fs.statSync(room_files_folder_path).isDirectory())) {
            try {
                fs.mkdirSync(room_files_folder_path);
                return true;
            } catch (error) {
                return false;
            }
        }
        return true;
    }

    // Function for ensuring that room data file exists
    #ensure_room_data_file() {
        const room_data_file_path = `${this.room_path}/${this.#hash_data_for_room("data")}`;
        const room_data = {
            "seed": this.seed,
            "name": this.name,
            "description": this.description,
            "creation_time": this.#get_points_now(),
            "nicknames": {},
            "messages_count": 0,
            "enabled": true,
        }

        const room_data_stringified = JSON.stringify(room_data);
        const room_data_encrypted = this.cryptography.encrypt(room_data_stringified);

        if (!(fs.existsSync(room_data_file_path) && fs.statSync(room_data_file_path).isFile())) {
            try {
                fs.writeFileSync(room_data_file_path, room_data_encrypted);
                return true;
            } catch (error) {
                return false;
            }
        }
        return true;
    }

    // This is function for generating hash bu room's password and seed
    #hash_data_for_room(data) {
        const hash = crypto.createHash('sha3-512').update(this.cryptography.encrypt(data)).digest('hex');
        return hash
    }

    // Function for ensuring that room's messages default file exists
    #ensure_room_default_messages_file() {
        const default_messages_file_path = `${this.room_path}/${this.#hash_data_for_room("messages")}/${this.#hash_data_for_room("0")}`;
        const default_messages_file_data = {
            "messages": [],
        }
        const default_messages_file_data_stringified = JSON.stringify(default_messages_file_data);
        const default_messages_file_data_encrypted = this.cryptography.encrypt(default_messages_file_data_stringified);

        if (!(fs.existsSync(default_messages_file_path) && fs.statSync(default_messages_file_path).isFile())) {
            try {
                fs.writeFileSync(default_messages_file_path, default_messages_file_data_encrypted);
                return true;
            } catch (error) {
                return false;
            }
        }
        return true;
    }

    // Function for checking name format
    #check_name_format(name) {
        if (typeof name !== "string") {
            return false;
        }
        return true;
    }

    // Function for checking description format
    #check_description_format(description) {
        if (typeof description !== "string") {
            return false;
        }
        return true;
    }

    // Function for checking nickname format
    #check_nickname_format(nickname) {
        if (typeof nickname !== "string") {
            return false;
        }
        return true;
    }

    // Function for checking message format
    #check_message_format(message) {
        if (typeof message !== "string") {
            return false;
        }
        return true;
    }

    // Function for getting room full data
    #get_room_full_data() {
        if (this.room_data !== undefined) { return this.room_data; };
        const room_data_path = `${this.room_path}/${this.#hash_data_for_room("data")}`;
        let data;
        try {
            data = fs.readFileSync(room_data_path).toString();
        } catch (error) {
            return { "error_code": "208" };
        }
        let decrypted_data = this.cryptography.decrypt(data);
        let room_data = JSON.parse(decrypted_data);
        this.room_data = room_data;
        return room_data;
    }

    // Function for updating room full data
    #update_room_fool_data(room_data) {
        const room_data_path = `${this.room_path}/${this.#hash_data_for_room("data")}`;
        let data_stringified = JSON.stringify(room_data);
        let encrypted_data = this.cryptography.encrypt(data_stringified);
        try {
            fs.writeFileSync(room_data_path, encrypted_data);
        } catch (error) {
            return { "error_code": "209" };
        }
        this.room_data = room_data;
        return true;
    }


    // Function for getting section data by message index
    #get_message_section(message_index) {
        let section_index = (message_index - (message_index % this.section_amount)) / this.section_amount;
        let message_local_index = (message_index % this.section_amount) - 1;
        return { "section": section_index, "local": message_local_index };
    }

    // Function for ensuring that section file exists
    #ensure_section_file(section) {
        let message_file_path = `${this.room_path}/${this.#hash_data_for_room("messages")}/${this.#hash_data_for_room(section.toString())}`
        const section_messages_file_data = {
            "messages": [],
        }
        const section_messages_file_data_stringified = JSON.stringify(section_messages_file_data);
        const section_messages_file_data_encrypted = this.cryptography.encrypt(section_messages_file_data_stringified);

        if (!(fs.existsSync(message_file_path) && fs.statSync(message_file_path).isFile())) {
            try {
                fs.writeFileSync(message_file_path, section_messages_file_data_encrypted);
                return true;
            } catch (error) {
                return false;
            }
        }
        return true;
    }

    // Function for reading message file of given section
    #read_section_messages(section) {
        if (this["sections"][section] !== undefined) {
            return this["sections"][section];
        }
        let message_file_path = `${this.room_path}/${this.#hash_data_for_room("messages")}/${this.#hash_data_for_room(section.toString())}`
        let section_data;
        let section_file_ensuring = this.#ensure_section_file(section);
        if (section_file_ensuring !== true) { return { "error_code": "213" }; };
        try {
            section_data = fs.readFileSync(message_file_path).toString();
        }
        catch (error) {
            return { "error_code": "212" };
        }
        let decrypted_section_data = JSON.parse(this.cryptography.decrypt(section_data))
        this["sections"][section] = decrypted_section_data;
        return decrypted_section_data;
    }

    // Function for updating message file of given section
    #update_section_messages(section, data) {
        let message_file_path = `${this.room_path}/${this.#hash_data_for_room("messages")}/${this.#hash_data_for_room(section.toString())}`
        let encrypted_data = this.cryptography.encrypt(JSON.stringify(data));
        try {
            fs.writeFileSync(message_file_path, encrypted_data);
        }
        catch (error) {
            return { "error_code": "214" };
        }
        this["sections"][section] = data;
        return true;
    }

    // Function for incrementinng messages count in room by one
    #increment_messages_count() {
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        data["messages_count"] = data["messages_count"] + 1;
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return true;
    }

    // Function for recrypting all files if password or seed was changed
    #recrypt_room_files(seed, password) {

        // If seed or password is undefined it must be used default values of room
        if (seed === undefined) { seed = this.seed };
        if (password === undefined) { password = this.password };

        // Checking if room seed format is valid
        const seed_check = Rooms.check_seed_format(seed);
        if (seed_check["error_code"] !== undefined) { return seed_check; };

        // Checking if room password format is valid
        const password_check = Rooms.check_password_format(password);
        if (password_check["error_code"] !== undefined) { return password_check; };

        if (Rooms.check_room_exists(seed, password) === true) { return { "error_code": "216" } }

        let old_seed = this.seed;
        let old_password = this.password;
        let old_room_hash = this.room_hash;
        let old_cryptography = this.cryptography;

        let old_room_data_file_name = this.#hash_data_for_room("data")
        let old_room_data = this.#get_room_full_data()

        let old_messages_folder_name = this.#hash_data_for_room("messages")
        let old_files_folder_name = this.#hash_data_for_room("files")

        let sections_count = (old_room_data["messages_count"] - (old_room_data["messages_count"] % this.section_amount)) / this.section_amount + 1;
        let sections_data = {};

        for (let i = 0; i < sections_count; i++) {
            sections_data[i] = this.#read_section_messages(i);
        }

        this.seed = seed;
        this.password = password;
        this.cryptography = new Cryptography(password);
        this.room_hash = Rooms.get_room_hash(seed, password);
        this.room_path = `data/rooms/${this.room_hash}`;

        let new_room_data_file_name = this.#hash_data_for_room("data");

        fs.renameSync(`data/rooms/${old_room_hash}`, `data/rooms/${this.room_hash}`)
        fs.renameSync(`data/rooms/${this.room_hash}/${old_messages_folder_name}`, `data/rooms/${this.room_hash}/${this.#hash_data_for_room("messages")}`)
        fs.renameSync(`data/rooms/${this.room_hash}/${old_files_folder_name}`, `data/rooms/${this.room_hash}/${this.#hash_data_for_room("files")}`)
        fs.unlinkSync(`data/rooms/${this.room_hash}/${old_room_data_file_name}`)
        fs.writeFileSync(`data/rooms/${this.room_hash}/${new_room_data_file_name}`, this.cryptography.encrypt(JSON.stringify(old_room_data)))

        let messages_folder_path = `data/rooms/${this.room_hash}/${this.#hash_data_for_room("messages")}`;
        const files = fs.readdirSync(messages_folder_path);
        files.forEach((item) => {
            fs.unlinkSync(`${messages_folder_path}/${item}`);
        })

        for (let i in sections_data) {
            fs.writeFileSync(`${messages_folder_path}/${this.#hash_data_for_room(i)}`, this.cryptography.encrypt(JSON.stringify(sections_data[i])))
        }
        return true;
    }

    // Function for getting room data
    get_room_data() {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        let room_data = this.#get_room_full_data();
        if (room_data["error_code"] !== undefined) { return room_data; };
        return room_data;
    }

    // Function for updating room data (only name and description)
    update_room_data(name, description) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        // Checking name and description
        if (this.#check_name_format(name) !== true) { return { "error_code": "203" } }
        if (this.#check_description_format(description) !== true) { return { "error_code": "204" } }

        let room_data = this.#get_room_full_data();
        if (room_data["error_code"] !== undefined) { return room_data; };
        room_data["name"] = name;
        room_data["description"] = description;
        const room_data_path = `${this.room_path}/${this.#hash_data_for_room("data")}`;
        let data_stringified = JSON.stringify(room_data);
        let encrypted_data = this.cryptography.encrypt(data_stringified);
        try {
            fs.writeFileSync(room_data_path, encrypted_data);
        } catch (error) {
            return { "error_code": "209" };
        }
        this.room_data = room_data;
        return true;
    }

    // Function for setting up all files if room is just now creted
    setup(name, description) {

        // Checking name and description
        if (this.#check_name_format(name) !== true) { return { "error_code": "203" } }
        if (this.#check_description_format(description) !== true) { return { "error_code": "204" } }

        // Setting up name and description
        this.name = name;
        this.description = description;

        // Creating room folder
        const room_folder_creation_feedback = this.#ensure_room_folder();
        if (room_folder_creation_feedback !== true) { return { "error_code": "201" }; };

        // Creating room messages folder
        const room_messages_folder_creation_feedback = this.#ensure_room_messages_folder();
        if (room_messages_folder_creation_feedback !== true) { return { "error_code": "205" }; };

        // Creating room default messages file
        const room_default_messages_file_creation_feedback = this.#ensure_room_default_messages_file();
        if (room_default_messages_file_creation_feedback !== true) { return { "error_code": "207" }; };

        // Creating room files folder
        const room_files_folder_creation_feedback = this.#ensure_room_files_folder();
        if (room_files_folder_creation_feedback !== true) { return { "error_code": "206" }; };

        // Creating room data file
        const room_data_file_creation_feedback = this.#ensure_room_data_file();
        if (room_data_file_creation_feedback !== true) { return { "error_code": "202" }; };

        // Marking room as created
        this.exists = true;

        return true;
    }

    // Function for destroying room with all data
    destroy() {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        const room_path = `${this.room_path}`
        fs.rmdirSync(room_path, { recursive: true });

        // Marking room as destroyed
        this.exists = false;

        return true;
    }

    // Function for enabling room
    enable() {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        data["enabled"] = true;
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return true;
    }

    // Function for disableing room (no messages can be sent )
    disable() {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        data["enabled"] = false;
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return true;
    }

    // Function for changing room name
    change_name(name) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        if (this.#check_name_format(name) !== true) { return { "error_code": "203" } }
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        data["name"] = name;
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return true;
    }

    // Function for changing room description
    change_description(description) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        if (this.#check_description_format(description) !== true) { return { "error_code": "204" } }
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        data["description"] = description;
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return true;
    }

    // Function for changing room password
    change_password(new_password) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        let change_feedback = this.#recrypt_room_files(undefined, new_password);
        if (change_feedback["error_code"] !== undefined) { return change_feedback; };
        return true;
    }

    // Function for changin seed
    change_seed(new_seed) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        let change_feedback = this.#recrypt_room_files(new_seed, undefined);
        if (change_feedback["error_code"] !== undefined) { return change_feedback; };
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        data["seed"] = new_seed;
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return true;
    }

    // Function for setting up nickname data when it is new noticed
    setup_nickname(nickname) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        if (this.#check_nickname_format(nickname) !== true) { return { "error_code": "210" } }
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        if (data["nicknames"][nickname] === undefined) {
            data["nicknames"][nickname] = { "last_read": data["messages_count"] };
            let updating_feedback = this.#update_room_fool_data(data);
            if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        }
        return true;
    }

    // Function for clearing nicknames saved cache
    clear_nicknames_cache() {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };

        data["nicknames"] = {};

        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return true;
    }

    // Function for clearing room messages
    clear_room_messages() {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        let messages_folder_path = `${this.room_path}/${this.#hash_data_for_room("messages")}`;
        const files = fs.readdirSync(messages_folder_path);
        files.forEach((item) => {
            fs.unlinkSync(`${messages_folder_path}/${item}`);
        })
        this.#ensure_room_default_messages_file();
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        data["messages_count"] = 0;
        for (let nickname in data["nicknames"]) {
            data["nicknames"][nickname]["last_read"] = 0;
        }
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return true;
    }

    // Function for marking all as read for nickname
    mark_all_as_read(nickname) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        const nickname_setup_feedback = this.setup_nickname(nickname);
        if (nickname_setup_feedback["error_code"] !== undefined) { return nickname_setup_feedback };
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        data["nicknames"][nickname]["last_read"] = data["messages_count"];
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return true;
    }

    // Function for marking next message as read for nickname
    mark_next_as_read(nickname) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        const nickname_setup_feedback = this.setup_nickname(nickname);
        if (nickname_setup_feedback["error_code"] !== undefined) { return nickname_setup_feedback };
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        data["nicknames"][nickname]["last_read"] += (data["nicknames"][nickname]["last_read"] < data["messages_count"]) ? 1 : 0;
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return true;
    }

    // Function for sending message
    send_message(nickname, message, mark_read = true) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        // Setting up mark_read
        if (mark_read !== true && mark_read !== false) { mark_read = true }

        const nickname_setup_feedback = this.setup_nickname(nickname);
        if (nickname_setup_feedback["error_code"] !== undefined) { return nickname_setup_feedback };
        if (this.#check_nickname_format(nickname) !== true) {
            return { "error_code": "210" }
        }
        if (this.#check_message_format(message) !== true) {
            return { "error_code": "211" }
        }
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        if (data["enabled"] === false) { return { "error_code": "215" } }
        let messages_count = data["messages_count"];

        let message_index = messages_count + 1;
        let section_data = this.#get_message_section(message_index)
        let messages_file = this.#read_section_messages(section_data["section"])

        // Defining message data
        let message_data = []
        // 0 - Message
        message_data[0] = message;
        // 1 - Nickname
        message_data[1] = nickname;
        // 2 - Time
        message_data[2] = this.#get_points_now();

        // Pushing message data
        messages_file["messages"].push(message_data);

        // Updating section data
        let update_feedback = this.#update_section_messages(section_data["section"], messages_file);
        if (update_feedback["error_code"] !== undefined) { return update_feedback; };

        // Incrementing messages count by one
        let increment_feedback = this.#increment_messages_count();
        if (increment_feedback["error_code"] !== undefined) { return increment_feedback; };

        // Setting up nickname if it is new
        if (mark_read === true) {
            let data = this.#get_room_full_data();
            if (data["error_code"] !== undefined) { return data; };
            data["nicknames"][nickname]["last_read"] = data["messages_count"];
            let updating_feedback = this.#update_room_fool_data(data);
            if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        };
        return true;
    }

    // Function for reading first unread message
    read_first_unread_message(nickname, only_message = false, mark_read = true) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        const nickname_setup_feedback = this.setup_nickname(nickname);
        if (nickname_setup_feedback["error_code"] !== undefined) { return nickname_setup_feedback };
        let message_data;
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };

        if (data["nicknames"][nickname] == undefined) {
            data["nicknames"][nickname] = { "last_read": data["messages_count"] }
            message_data = Rooms.empty_code
        }
        else {
            if (data["nicknames"][nickname]["last_read"] >= data["messages_count"]) {
                message_data = Rooms.empty_code;
            }
            else {
                if (mark_read === true) {
                    data["nicknames"][nickname]["last_read"] += 1;
                }
                const message_index = data["nicknames"][nickname]["last_read"]
                let section_index = this.#get_message_section(message_index)
                let section_data = this.#read_section_messages(section_index["section"])["messages"];
                let message_information = section_data[section_index["local"]]
                if (only_message) {
                    message_data = message_information[0];
                }
                else {
                    message_data = message_information
                }
            }
        }
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };

        return message_data;
    }

    // Function for reading last unread message
    read_last_unread_message(nickname, only_message = false, mark_read = true) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        const nickname_setup_feedback = this.setup_nickname(nickname);
        if (nickname_setup_feedback["error_code"] !== undefined) { return nickname_setup_feedback };
        let message_data;
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };

        if (data["nicknames"][nickname] == undefined) {
            data["nicknames"][nickname] = { "last_read": data["messages_count"] }
            message_data = Rooms.empty_code
        }
        else {
            if (data["nicknames"][nickname]["last_read"] >= data["messages_count"]) {
                message_data = Rooms.empty_code;
            }
            else {
                if (mark_read === true) {
                    data["nicknames"][nickname]["last_read"] = data["messages_count"];
                }
                const message_index = data["messages_count"]
                let section_index = this.#get_message_section(message_index)
                let section_data = this.#read_section_messages(section_index["section"])["messages"];
                let message_information = section_data[section_index["local"]]
                if (only_message) {
                    message_data = message_information[0];
                }
                else {
                    message_data = message_information
                }
            }
        }
        let updating_feedback = this.#update_room_fool_data(data);
        if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        return message_data;
    }

    // Function for getting last n messages
    get_last_n_messages(n, only_message = false) {
        // Formatting variables which are needed for fetching
        if (only_message !== true && only_message !== false) { only_message = true }

        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        if (n == 0) { return Rooms.empty_code }
        if (typeof n !== "number" || n === NaN) { return { "error_code": "220" }; };

        let messages;
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        if (n <= data["messages_count"] % this.section_amount) {
            let section_index = this.#get_message_section(data["messages_count"]);
            let section_data = this.#read_section_messages(section_index["section"])["messages"]
            if (section_data["error_code"] !== undefined) { return section_data };
            messages = section_data.slice(-n);
            messages = messages.reverse();
            if (only_message === true && Array.isArray(messages)) {
                messages.forEach((item, index) => {
                    messages[index] = item[0]
                })
            }
            if (messages.length === 0) { messages = Rooms.empty_code }
            return messages;
        }

        let section_index = this.#get_message_section(data["messages_count"]);
        let section_data = this.#read_section_messages(section_index["section"])["messages"]
        if (section_data["error_code"] !== undefined) { return section_data };
        messages = section_data;
        messages = messages.reverse();
        n -= section_data.length;
        let section = section_index["section"] - 1;
        while (n > 0) {
            section_data = this.#read_section_messages(section)["messages"]
            if (section_data["error_code"] !== undefined) { return section_data };
            if (n >= this.section_amount) {
                messages = messages.concat(section_data.reverse())
                n -= this.section_amount;
            }
            else {
                messages = messages.concat((section_data.slice(-n)).reverse())
                n = 0;
            }
            section--;
        }
        if (only_message === true && Array.isArray(messages)) {
            messages.forEach((item, index) => {
                messages[index] = item[0]
            })
        }
        if (messages.length === 0) { messages = Rooms.empty_code }
        return messages
    }

    // Function for getting all messages from room
    get_all_messages(only_message = false) {

        // Formatting variables which are needed for fetching
        if (only_message !== true && only_message !== false) { only_message = true }

        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        const messages_count = data["messages_count"]
        const messages = this.get_last_n_messages(messages_count, only_message);
        return messages;
    }

    // Function for reading all unread messages
    read_all_unread_messages(nickname, only_message = false, mark_read = true) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        const nickname_setup_feedback = this.setup_nickname(nickname);
        if (nickname_setup_feedback["error_code"] !== undefined) { return nickname_setup_feedback };
        let data = this.#get_room_full_data();
        if (data["error_code"] !== undefined) { return data; };
        const messages_count = data["messages_count"];
        const last_read_index = data["nicknames"][nickname]["last_read"]
        const unread_messages_count = messages_count - last_read_index;
        let messages = this.get_last_n_messages(unread_messages_count, only_message);
        if (mark_read && messages.length !== 0) {
            data["nicknames"][nickname]["last_read"] = messages_count;
            let updating_feedback = this.#update_room_fool_data(data);
            if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        }
        if (messages.length === 0) { messages = Rooms.empty_code }
        return messages;
    }

    // Function for reading unread message from nickname
    read_all_unread_messages_from_nickname(nickname, searching_nickname, only_message = false, mark_read = true) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        const nickname_setup_feedback = this.setup_nickname(nickname);
        if (nickname_setup_feedback["error_code"] !== undefined) { return nickname_setup_feedback };
        let all_unread_messages = this.read_all_unread_messages(nickname, false, false);
        if (all_unread_messages === Rooms.empty_code) { return all_unread_messages }
        let messages_by_nickname = []
        let first_index;
        all_unread_messages.forEach((item, index) => {
            if (item[1] === searching_nickname) {
                if (first_index === undefined) {
                    first_index = index;
                }
                messages_by_nickname.push(item);
            }
        })
        if (only_message === true && Array.isArray(messages_by_nickname)) {
            messages_by_nickname.forEach((item, index) => {
                messages_by_nickname[index] = item[0]
            })
        }
        if (mark_read && messages_by_nickname.length !== 0) {
            let data = this.#get_room_full_data();
            if (data["error_code"] !== undefined) { return data; };
            data["nicknames"][nickname]["last_read"] = data["messages_count"] - first_index;
            let updating_feedback = this.#update_room_fool_data(data);
            if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        }
        if (messages_by_nickname.length === 0) { return Rooms.empty_code }
        return messages_by_nickname;
    }


    // Function for reading first unread message from nickname
    read_first_unread_message_from_nickname(nickname, searching_nickname, only_message = false, mark_read = true) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        const nickname_setup_feedback = this.setup_nickname(nickname);
        if (nickname_setup_feedback["error_code"] !== undefined) { return nickname_setup_feedback };
        let all_unread_messages = this.read_all_unread_messages(nickname, false, false);
        if (all_unread_messages === Rooms.empty_code) { return all_unread_messages }
        let first_index;
        let message;
        all_unread_messages.forEach((item, index) => {
            if (item[1] === searching_nickname) {
                message = item;
                first_index = index;
            }
        })
        if (only_message === true && Array.isArray(message)) {
            message = message[0];
        }
        if (mark_read) {
            let data = this.#get_room_full_data();
            if (data["error_code"] !== undefined) { return data; };
            data["nicknames"][nickname]["last_read"] = data["messages_count"] - first_index;
            let updating_feedback = this.#update_room_fool_data(data);
            if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        }
        if (message === undefined) { return Rooms.empty_code }
        return message;
    }

    // Function for reading last unread message from nickname
    read_last_unread_message_from_nickname(nickname, searching_nickname, only_message = false, mark_read = true) {
        // Checking if room exists
        if (this.exists !== true) { return { "error_code": "219" } }

        const nickname_setup_feedback = this.setup_nickname(nickname);
        if (nickname_setup_feedback["error_code"] !== undefined) { return nickname_setup_feedback };
        let all_unread_messages = this.read_all_unread_messages(nickname, false, false);
        if (all_unread_messages === Rooms.empty_code) { return all_unread_messages }
        let first_index;
        let message;
        all_unread_messages.every((item, index) => {
            if (item[1] === searching_nickname) {
                message = item;
                first_index = index;
                return false;
            }
        })
        if (only_message === true && Array.isArray(message)) {
            message = message[0];
        }
        if (mark_read) {
            let data = this.#get_room_full_data();
            if (data["error_code"] !== undefined) { return data; };
            data["nicknames"][nickname]["last_read"] = data["messages_count"] - first_index;
            let updating_feedback = this.#update_room_fool_data(data);
            if (updating_feedback["error_code"] !== undefined) { return updating_feedback; };
        }
        if (message === undefined) { return Rooms.empty_code }
        return message;
    }
}

// Exporting Rooms class for global use
module.exports = Rooms;