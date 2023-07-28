// Requiring global libraries
const fs = require("fs");
const crypto = require('crypto');

// Function for getting sha3 of string
function get_sha512(data) {
    // Generating hash
    const hash = crypto.createHash('sha3-512');
    hash.update(data);
    const hash_of_data = hash.digest('hex');
    return hash_of_data;
}

// Class for working with server side configurations
class Configurations {
    // Static variables where all configs are saved
    static configs;

    // Function for checking configurations format
    static #check_configs_format(configs) {
        if (configs?.logs?.show_logs === undefined) {
            return false;
        }
        if (configs?.logs?.save_logs === undefined) {
            return false;
        }
        if (configs?.server?.ip === undefined) {
            return false;
        }
        if (configs?.server?.port === undefined) {
            return false;
        }
        return true;
    }

    // Getting error data of code
    static get_error_data(error_code) {
        if (error_code?.error_code !== undefined) {
            error_code = error_code.error_code;
        }
        const errors = {
            "700": "Error while reading configs file",
            "701": "Error while updating configs file",
            "702": "Some configs are missing"
        }
        return errors[error_code];
    };

    // Function for loading configurations from file
    static load() {
        try {
            if (fs.existsSync("configs.json") === false) {
                this.reset();
            }
            let configs = JSON.parse(fs.readFileSync("configs.json").toString());
            this.configs = configs;
            return configs;
        }
        catch (error) {
            return { "error_code": "700" }
        }
    }

    // Function for returning configurations
    static get_configurations() {
        if (this.configs === undefined) {
            return this.load();
        }
        return this.configs;
    }

    // Function for updating configurations
    static update(configs) {
        let old_configs = this.get_configurations()
        if (configs?.server?.ip !== undefined) { old_configs.server.ip = configs.server.ip; };
        if (configs?.server?.port !== undefined) { old_configs.server.port = configs.server.port; };

        if (configs?.logs?.show_logs !== undefined) { old_configs.logs.show_logs = configs.logs.show_logs; };
        if (configs?.logs?.save_logs !== undefined) { old_configs.logs.save_logs = configs.logs.save_logs; };

        if (configs?.admin?.enabled !== undefined) { old_configs.admin.enabled = configs.admin.enabled; };
        if (configs?.admin?.route !== undefined) { old_configs.admin.route = configs.admin.route; };
        if (configs?.admin?.username !== undefined && configs?.admin?.username !== "") { old_configs.admin.username = get_sha512(configs.admin.username); };
        if (configs?.admin?.password !== undefined && configs?.admin?.password !== "") { old_configs.admin.password = get_sha512(configs.admin.password); };

        try {
            fs.writeFileSync("configs.json", JSON.stringify(old_configs));
            this.configs = old_configs;
        }
        catch (error) {
            console.log(error);
            return { "error_code": "701" }
        }
    }

    // Function for resetting configurations
    static reset() {
        let default_configurations = {
            "server": {
                "ip": "127.0.0.1",
                "port": 2419
            },
            "logs": {
                "show_logs": false,
                "save_logs": true
            },
            "admin": {
                "enabled": true,
                "route": "/admin",           // Url for joining admin page
                "username": "5a38afb1a18d408e6cd367f9db91e2ab9bce834cdad3da24183cc174956c20ce35dd39c2bd36aae907111ae3d6ada353f7697a5f1a8fc567aae9e4ca41a9d19d",
                "password": "5a38afb1a18d408e6cd367f9db91e2ab9bce834cdad3da24183cc174956c20ce35dd39c2bd36aae907111ae3d6ada353f7697a5f1a8fc567aae9e4ca41a9d19d"
            }
        }
        try {
            let configs = fs.writeFileSync("configs.json", JSON.stringify(default_configurations));
            this.configs = configs;
        }
        catch (error) {
            return { "error_code": "701" }
        }
    }
}

// Exporting class for global use
module.exports = Configurations;