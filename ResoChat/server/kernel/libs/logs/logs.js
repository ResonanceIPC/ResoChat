const fs = require("fs");


class Logs {

    // Defining log types as static variable
    static types = {
        0: "information",
        1: "warninng",
        2: "error",
    };

    // Function for checking if logs folder does not exist and creates that
    static #ensure_logs_folder() {
        if (!(fs.existsSync("data/logs") && fs.statSync("data/logs").isDirectory())) {
            try {
                fs.mkdirSync("data/logs");
                return true;
            } catch (error) {
                return false;
            }
        }
        return true;
    };

    // Function for getting todays file name
    static #get_todays_log_file_name() {
        let date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        let todays_file_name = `${year}-${month}-${day}`;
        return todays_file_name;
    };

    // Function for getting nows points
    static #get_points_now() {
        let date = new Date();
        let milliseconds_passed = date.getTime();
        return milliseconds_passed;
    };

    // Function for checking if logs file for that day's exists or not
    static #ensure_todays_logs_file() {
        const todays_file_name = this.#get_todays_log_file_name();
        const todays_file_path = `data/logs/${todays_file_name}`;
        const default_log_data = { "logs": [] };
        if (!(fs.existsSync(todays_file_path) && fs.statSync(todays_file_path).isFile())) {
            try {
                fs.writeFileSync(todays_file_path, JSON.stringify(default_log_data));
                return true;
            } catch (error) {
                return false;
            }
        }
        return true;
    };

    // Function for checking if type of log exists or not
    static #check_log_type(type) {
        if (this.types[type] === undefined) { return false; };
        return true;
    };

    // Function for checking if description of log is valid or not
    static #check_log_description(description) {
        if (typeof description !== "string") { return false; };
        return true;
    };

    // Function for checking if log details are valid format or not
    static #check_log_details(details) {
        if (typeof details !== "object" || details === null) { return false; };
        return true;
    };

    // Function for adding log to file
    static #add_log(log_data) {
        let logs_data = JSON.parse(fs.readFileSync(`data/logs/${this.#get_todays_log_file_name()}`));
        logs_data["logs"].push(log_data);
        let logs_stringified_data = JSON.stringify(logs_data);
        fs.writeFileSync(`data/logs/${this.#get_todays_log_file_name()}`, logs_stringified_data);
        return true;
    };

    // Getting error data by code
    get_error_data(error_code) {
        if (error_code?.error_code !== undefined) {
            error_code = error_code.error_code;
        }
        const errors = {
            "400": "Log type is not valid",
            "401": "Log description is not valid",
            "402": "Log details are not valid",
            "403": "Error while creating logs folder",
            "404": "Error while creating today's logs file",
        }
        return errors[error_code];
    };

    // Function for showing log in terminal
    static display_log(type, description) {
        // Checking type and description of log
        if (this.#check_log_type(type) !== true) { return { "error_code": "400" }; };
        if (this.#check_log_description(description) !== true) { return { "error_code": "401" }; };

        // Displaying log in terminal
        console.log(`[${this.types[type].toUpperCase()}] ${description} [${this.types[type].toUpperCase()}]`)

        return true;
    };

    // Function for saving log
    static save_log(type, description, details) {
        // Checking type and description of log
        if (this.#check_log_type(type) !== true) { return { "error_code": "400" }; };
        if (this.#check_log_description(description) !== true) { return { "error_code": "401" }; };
        if (this.#check_log_details(details) !== true) { return { "error_code": "402" }; };

        // Ensuring that logs folder exists
        const logs_ensurement = this.#ensure_logs_folder();
        if (logs_ensurement !== true) { return { "error_code": "403" }; };

        // Ensuring that todays log file exists
        const todays_logs_file_ensurement = this.#ensure_todays_logs_file();
        if (todays_logs_file_ensurement !== true) { return { "error_code": "404" }; };

        // Creating log data as array
        let log_data = []
        log_data[0] = type;
        log_data[1] = description;
        log_data[2] = details;
        log_data[3] = this.#get_points_now();

        // Adding log to file
        this.#add_log(log_data);

        return true;
    };

    // Function for saving and showing log in terminal
    static save_and_display_log(type, description, details = {}) {
        // Log saving feedback
        const log_saving_feedback = this.save_log(type, description, details);
        if (log_saving_feedback["error_code"] !== undefined) { return log_saving_feedback; };

        // Log displaying feedback
        const log_displaying_feedback = this.display_log(type, description);
        if (log_displaying_feedback["error_code"] !== undefined) { return log_displaying_feedback; };

        return true;
    };
};

module.exports = Logs;