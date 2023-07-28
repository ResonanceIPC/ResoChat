// Requiring base libraries
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const kernel = require("../kernel/kernel");

// Defining router
const router = express.Router();

// Function for getting sha3 of string
function get_sha512(data) {
    // Generating hash
    const hash = crypto.createHash('sha3-512');
    hash.update(data);
    const hash_of_data = hash.digest('hex');
    return hash_of_data;
}

// Function for checking if admin username and password is right
function check_admin_login(username, password) {
    const configs = kernel.Configurations.get_configurations()
    const username_hash = get_sha512(username);
    const password_hash = get_sha512(password);
    if (password_hash === configs.admin.password && username_hash === configs.admin.username) {
        return true;
    }
    return false;
}

// Function for getting admin page (login page if user is not logged in)
router.get('/', (req, res) => {
    const configs = kernel.Configurations.get_configurations()
    if (req.session.loggedin !== true) {
        res.redirect(`${configs.admin.route}/login`)
    }
    else if (req.session.loggedin === true) {
        res.render("admin.ejs", { configs: configs, update_done: false })
    }
});

// Function for posting admin page (login page if user is not logged in)
router.post('/', (req, res) => {
    const configs = kernel.Configurations.get_configurations()
    if (req.session.loggedin !== true) {
        res.redirect(`${configs.admin.route}/login`)
        return true;
    }
    let data = {
        "server": {
            "ip": req.body.ip,
            "port": req.body.port,
        },
        "logs": {
            "show_logs": (req.body.showLogs === "on") ? true : false,
            "save_logs": (req.body.saveLogs === "on") ? true : false,
        },
        "admin": {
            "enabled": (req.body.adminEnabled === "on") ? true : false,
            "route": req.body.adminRoute,
            "username": req.body.username,
            "password": req.body.password,
        },
    }
    kernel.Configurations.update(data)
    const formId = req.body.formId;
    res.render("admin.ejs", { configs: configs, update_done: true })

});

// Function for rendering page for admin logging
router.get('/login', (req, res) => {
    const configs = kernel.Configurations.get_configurations()
    res.render("admin_login.ejs", {
        "admin_route": configs.admin.route,
        "login_error": false,
    })
});

// Function for logging out admin
router.get('/logout', (req, res) => {
    const configs = kernel.Configurations.get_configurations()
    req.session.loggedin = false;
    res.redirect(`${configs.admin.route}/login`)
});

// Function for posting login page
router.post('/login', (req, res) => {
    const configs = kernel.Configurations.get_configurations()
    const username = req.body.username;
    const password = req.body.password;
    const login_check = check_admin_login(username, password);
    if (login_check === false) {
        req.session.loggedin = false;
        res.render("admin_login.ejs", {
            "admin_route": configs.admin.route,
            "login_error": true,
        })
    }
    else if (login_check === true) {
        req.session.loggedin = true;
        res.redirect(`${configs.admin.route}`)
    }
});

// Exporing router for global use
module.exports = router;