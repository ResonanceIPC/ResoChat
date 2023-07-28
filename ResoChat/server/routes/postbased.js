// Requiring base libraries
const fs = require('fs');
const express = require('express');
const kernel = require("../kernel/kernel");

// Defining router
const router = express.Router();

// Using json
router.use(express.json());

// Function for checking if room with given seed and password exists or not
router.post('/exists', (req, res) => {

    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    
    // Doing action
    let room = kernel.Rooms.room(seed, password);
    let action_feedback;
    if (room.exists === true) { action_feedback = "true"; }
    else if (room.exists === false) { action_feedback = "false"; };

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = action_feedback;
    }

    res.send(feedback);
});

// Function for creating chat
router.post('/create', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    const name = req.body.name;
    const description = req.body.description;

    // Doing action
    const room = kernel.Rooms.create_room(seed, password, name, description);

    // Generating and returning feedback
    let feedback;
    if (room["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for changing name
router.post('/change_name', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    const name = req.body.name;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.change_name(name);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for changing description
router.post('/change_description', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    const description = req.body.description;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.change_description(description);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for changing seed
router.post('/change_seed', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    const new_seed = req.body.new_seed;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.change_seed(new_seed);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for changing password
router.post('/change_password', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    const new_password = req.body.new_password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.change_password(new_password);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for enabling room
router.post('/enable', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.enable();

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for disabling room
router.post('/disable', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.disable();

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for destroying room
router.post('/destroy', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.destroy();

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for updating data
router.post('/update_data', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    const name = req.body.name;
    const description = req.body.description;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.update_room_data(name, description);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for setupping nickname
router.post('/setup_nickname', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    const nickname = req.body.nickname;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.setup_nickname(nickname);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for clearing nicknames
router.post('/clear_nicknames', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.clear_nicknames_cache();

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for sending message
router.post('/send_message', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const message = req.body.message;
    let mark_read = req.body.mark_read;

    // Setting up mark_read
    if (mark_read !== true && mark_read !== false) { mark_read = true }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.send_message(nickname, message, mark_read);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for clearing messages
router.post('/clear_messages', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.clear_room_messages();

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for marking next as read
router.post('/mark_next_as_read', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    const nickname = req.body.nickname;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.mark_next_as_read(nickname);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for marking all as read
router.post('/mark_all_as_read', (req, res) => {
    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    const nickname = req.body.nickname;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.mark_all_as_read(nickname);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = kernel.Rooms.success_code;
    };

    res.send(feedback);
});

// Function for getting all messages
router.post('/get_all_messages', (req, res) => {

    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    let only_message = req.body.only_message;

    // Formatting variables which are needed for fetching
    if (only_message !== true && only_message !== false) { only_message = false }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_all_messages(only_message);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = action_feedback;
    }

    // Checking if feedback is object
    feedback = ((typeof feedback === 'object' && feedback != null) ? JSON.stringify({ "messages": feedback }) : feedback.toString());

    res.send(feedback);
});

// Function for getting last n messages
router.post('/get_last_n_messages', (req, res) => {

    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    let only_message = req.body.only_message;
    let n = req.body.n;

    // Formatting variables which are needed for fetching
    if (only_message !== true && only_message !== false) { only_message = false }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_last_n_messages(n, only_message);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = action_feedback;
    }

    // Checking if feedback is object
    feedback = ((typeof feedback === 'object' && feedback != null) ? JSON.stringify({ "messages": feedback }) : feedback.toString());

    res.send(feedback);
});

// Function for getting room data
router.post('/get_room_data', (req, res) => {

    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_room_data();
    
    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = action_feedback;
    }

    // Checking if feedback is object
    feedback = ((typeof feedback === 'object' && feedback != null) ? JSON.stringify(feedback) : feedback.toString());

    res.send(feedback);
});

// Function for getting first unread message
router.post('/read_first_unread_message', (req, res) => {

    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    let only_message = req.body.only_message;
    let mark_read = req.body.mark_read;
    let nickname = req.body.nickname;

    // Formatting variables which are needed for fetching
    if (mark_read !== true && mark_read !== false) { mark_read = true }

    // Formatting variables which are needed for fetching
    if (only_message !== true && only_message !== false) { only_message = false }


    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_first_unread_message(nickname, only_message, mark_read);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = action_feedback;
    }

    // Checking if feedback is object
    feedback = ((typeof feedback === 'object' && feedback != null) ? JSON.stringify({ "messages": feedback }) : feedback.toString());

    res.send(feedback);
});

// Function for reading last unread message
router.post('/read_last_unread_message', (req, res) => {

    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    let only_message = req.body.only_message;
    let mark_read = req.body.mark_read;
    let nickname = req.body.nickname;

    // Formatting variables which are needed for fetching
    if (mark_read !== true && mark_read !== false) { mark_read = true }

    // Formatting variables which are needed for fetching
    if (only_message !== true && only_message !== false) { only_message = false }


    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_last_unread_message(nickname, only_message, mark_read);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = action_feedback;
    }

    // Checking if feedback is object
    feedback = ((typeof feedback === 'object' && feedback != null) ? JSON.stringify({ "messages": feedback }) : feedback.toString());

    res.send(feedback);
});

// Function for reading all unread messages
router.post('/read_all_unread_messages', (req, res) => {

    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    let only_message = req.body.only_message;
    let mark_read = req.body.mark_read;
    let nickname = req.body.nickname;

    // Formatting variables which are needed for fetching
    if (mark_read !== true && mark_read !== false) { mark_read = true }

    // Formatting variables which are needed for fetching
    if (only_message !== true && only_message !== false) { only_message = false }


    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_all_unread_messages(nickname, only_message, mark_read);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = action_feedback;
    }

    // Checking if feedback is object
    feedback = ((typeof feedback === 'object' && feedback != null) ? JSON.stringify({ "messages": feedback }) : feedback.toString());

    res.send(feedback);
});

// Function for getting first unread message from nickname
router.post('/read_first_unread_message_from_nickname', (req, res) => {

    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    let only_message = req.body.only_message;
    let mark_read = req.body.mark_read;
    let nickname = req.body.nickname;
    let searching_nickname = req.body.searching_nickname;

    // Formatting variables which are needed for fetching
    if (mark_read !== true && mark_read !== false) { mark_read = true }

    // Formatting variables which are needed for fetching
    if (only_message !== true && only_message !== false) { only_message = false }


    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_first_unread_message_from_nickname(nickname, searching_nickname, only_message, mark_read);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = action_feedback;
    }

    // Checking if feedback is object
    feedback = ((typeof feedback === 'object' && feedback != null) ? JSON.stringify({ "messages": feedback }) : feedback.toString());

    res.send(feedback);
});

// Function for reading last unread message from nickname
router.post('/read_last_unread_message_from_nickname', (req, res) => {

    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    let only_message = req.body.only_message;
    let mark_read = req.body.mark_read;
    let nickname = req.body.nickname;
    let searching_nickname = req.body.searching_nickname;

    // Formatting variables which are needed for fetching
    if (mark_read !== true && mark_read !== false) { mark_read = true }

    // Formatting variables which are needed for fetching
    if (only_message !== true && only_message !== false) { only_message = false }


    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_last_unread_message_from_nickname(nickname, searching_nickname, only_message, mark_read);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = action_feedback;
    }

    // Checking if feedback is object
    feedback = ((typeof feedback === 'object' && feedback != null) ? JSON.stringify({ "messages": feedback }) : feedback.toString());

    res.send(feedback);
});

// Function for reading all unread messages from nickname
router.post('/read_all_unread_messages_from_nickname', (req, res) => {

    // Receiving params from requested url
    const seed = req.body.seed;
    const password = req.body.password;
    let only_message = req.body.only_message;
    let mark_read = req.body.mark_read;
    let nickname = req.body.nickname;
    let searching_nickname = req.body.searching_nickname;

    // Formatting variables which are needed for fetching
    if (mark_read !== true && mark_read !== false) { mark_read = true }

    // Formatting variables which are needed for fetching
    if (only_message !== true && only_message !== false) { only_message = false }


    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_all_unread_messages_from_nickname(nickname, searching_nickname, only_message, mark_read);

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = action_feedback;
    }

    // Checking if feedback is object
    feedback = ((typeof feedback === 'object' && feedback != null) ? JSON.stringify({ "messages": feedback }) : feedback.toString());

    res.send(feedback);
});

// Exporing router for global use
module.exports = router;