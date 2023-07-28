// Requiring base libraries
const fs = require('fs');
const express = require('express');
const kernel = require("../kernel/kernel");

// Defining router
const router = express.Router();










// **************** URL-s for creating room ****************

// When seed and password are received
router.get('/create/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

    // Doing action
    const room = kernel.Rooms.create_room(seed, password);

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

// When seed, password and name are received
router.get('/create/:seed/:password/:name', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const name = req.params.name;

    // Doing action
    const room = kernel.Rooms.create_room(seed, password, name);

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

// When seed, password, name and description are received
router.get('/create/:seed/:password/:name/:description', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const name = req.params.name;
    const description = req.params.description;

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

// **************** URL-s for creating room ****************










// **************** URL-s for sending message ****************

// When seed,password, nickname and message are received
router.get('/send_message/:seed/:password/:nickname/:message', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    const message = req.params.message;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.send_message(nickname, message);

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

// When seed,password, nickname, message and mark_read are received
router.get('/send_message/:seed/:password/:nickname/:message/:markread', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    const message = req.params.message;
    const markread = req.params.markread;

    // Doing action
    let mark_read = markread;
    if (mark_read === "false") { mark_read = false; }
    else if (mark_read === "true") { mark_read = true; }
    else { mark_read = undefined; };

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

// **************** URL-s for sending message ****************










// **************** URL-s for clearing room message ****************

// When seed and password are received
router.get('/clear_messages/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

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

// **************** URL-s for clearing room message ****************










// **************** URL-s for setupping nickname ****************

// When seed, password and nickname are received
router.get('/setup_nickname/:seed/:password/:nickname', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;

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

// **************** URL-s for setupping nickname ****************










// **************** URL-s for clearing nicknames cache ****************

// When seed and password are received
router.get('/clear_nicknames/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

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

// **************** URL-s for clearing nicknames cache ****************











// **************** URL-s for changing name ****************

// When seed, password and name are received
router.get('/change_name/:seed/:password/:name', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const name = req.params.name;

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

// **************** URL-s for changing name ****************













// **************** URL-s for changing description ****************

// When seed, password and description are received
router.get('/change_description/:seed/:password/:description', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const description = req.params.description;

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

// **************** URL-s for changing description ****************













// **************** URL-s for changing seed ****************

// When seed, password and new seed are received
router.get('/change_seed/:seed/:password/:newseed', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const newseed = req.params.newseed;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.change_seed(newseed);

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

// **************** URL-s for changing seed ****************













// **************** URL-s for changing password ****************

// When seed, password and new password are received
router.get('/change_password/:seed/:password/:newpassword', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const newpassword = req.params.newpassword;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.change_password(newpassword);

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

// **************** URL-s for changing password ****************














// **************** URL-s for enabling room ****************

// When seed and password are received
router.get('/enable/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

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

// **************** URL-s for enabling room ****************














// **************** URL-s for disabling room ****************

// When seed and password are received
router.get('/disable/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

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

// **************** URL-s for disabling room ****************














// **************** URL-s for updating room data (name and description) ****************

// When seed, password,name and description are received
router.get('/update_data/:seed/:password/:name/:description', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const name = req.params.name;
    const description = req.params.description;

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

// **************** URL-s for updating room data (name and description) ****************














// **************** URL-s for destroying room with all data  ****************

// When seed and password are received
router.get('/destroy/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

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

// **************** URL-s for destroying room with all data  ****************














// **************** URL-s for marking all as read for nickname  ****************

// When seed, password and nickname are received
router.get('/mark_all_as_read/:seed/:password/:nickname', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;

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

// **************** URL-s for marking all as read for nickname  ****************














// **************** URL-s for marking next as read for nickname  ****************

// When seed, password and nickname are received
router.get('/mark_next_as_read/:seed/:password/:nickname', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;

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

// **************** URL-s for marking next as read for nickname  ****************














// **************** URL-s for getting room data  ****************

// When seed and password are received
router.get('/get_room_data/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_room_data();

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    else {
        feedback = JSON.stringify(action_feedback);
    }
    res.send(feedback);
});

// When seed and password are received
router.get('/get_room_name/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_room_data();

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    feedback = action_feedback["name"].toString();
    res.send(feedback);
});

// When seed and password are received
router.get('/get_room_description/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_room_data();

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    feedback = action_feedback["description"].toString();
    res.send(feedback);
});

// When seed and password are received
router.get('/get_enabled_status/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_room_data();

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    feedback = action_feedback["enabled"].toString();
    res.send(feedback);
});

// When seed and password are received
router.get('/get_creation_time/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_room_data();

    // Generating and returning feedback
    let feedback;
    if (action_feedback["error_code"] !== undefined) {
        feedback = kernel.Rooms.error_code;
    }
    feedback = action_feedback["creation_time"].toString();
    res.send(feedback);
});

// **************** URL-s for getting room data  ****************











// **************** URL-s for reading first unread message room data  ****************

// When seed, password and nickname are received
router.get('/read_first_unread_message/:seed/:password/:nickname', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_first_unread_message(nickname);

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

// When seed, password, nickname and "only message" are received
router.get('/read_first_unread_message/:seed/:password/:nickname/:onlymessage', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_first_unread_message(nickname, onlymessage);

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

// When seed, password, nickname, "only message" and "mark read" are received
router.get('/read_first_unread_message/:seed/:password/:nickname/:onlymessage/:markread', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;
    let markread = req.params.markread;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Setting up mark read parameter
    if (markread === "true") { markread = true; }
    else if (markread === "false") { markread = false; }
    else { markread = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_first_unread_message(nickname, onlymessage, markread);

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

// **************** URL-s for reading first unread message room data  ****************










// **************** URL-s for reading last unread message room data  ****************

// When seed, password and nickname are received
router.get('/read_last_unread_message/:seed/:password/:nickname', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_last_unread_message(nickname);

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

// When seed, password, nickname and "only message" are received
router.get('/read_last_unread_message/:seed/:password/:nickname/:onlymessage', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_last_unread_message(nickname, onlymessage);

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

// When seed, password, nickname, "only message" and "mark read" are received
router.get('/read_last_unread_message/:seed/:password/:nickname/:onlymessage/:markread', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;
    let markread = req.params.markread;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Setting up mark read parameter
    if (markread === "true") { markread = true; }
    else if (markread === "false") { markread = false; }
    else { markread = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_last_unread_message(nickname, onlymessage, markread);

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

// **************** URL-s for reading first unread message room data  ****************












// **************** URL-s for reading first unread message from nickname  ****************

// When seed, password, nickname and "searching nickname" are received
router.get('/read_first_unread_message_from_nickname/:seed/:password/:nickname/:searchingnickname', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    const searchingnickname = req.params.searchingnickname;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_first_unread_message_from_nickname(nickname, searchingnickname);

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

// When seed, password, nickname, "searching nickname" and "only message" are received
router.get('/read_first_unread_message_from_nickname/:seed/:password/:nickname/:searchingnickname/:onlymessage', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;
    const searchingnickname = req.params.searchingnickname;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_first_unread_message_from_nickname(nickname, searchingnickname, onlymessage);

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

// When seed, password, nickname, "searching nickname", "only message" and "mark read" are received
router.get('/read_first_unread_message_from_nickname/:seed/:password/:nickname/:searchingnickname/:onlymessage/:markread', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;
    let markread = req.params.markread;
    const searchingnickname = req.params.searchingnickname;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Setting up mark read parameter
    if (markread === "true") { markread = true; }
    else if (markread === "false") { markread = false; }
    else { markread = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_first_unread_message_from_nickname(nickname, searchingnickname, onlymessage, markread);

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

// **************** URL-s for reading first unread message from nickname  ****************















// **************** URL-s for reading last unread message from nickname  ****************

// When seed, password, nickname and "searching nickname" are received
router.get('/read_last_unread_message_from_nickname/:seed/:password/:nickname/:searchingnickname', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    const searchingnickname = req.params.searchingnickname;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_last_unread_message_from_nickname(nickname, searchingnickname);

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

// When seed, password, nickname, "searching nickname" and "only message" are received
router.get('/read_last_unread_message_from_nickname/:seed/:password/:nickname/:searchingnickname/:onlymessage', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;
    const searchingnickname = req.params.searchingnickname;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_last_unread_message_from_nickname(nickname, searchingnickname, onlymessage);

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

// When seed, password, nickname, "searching nickname", "only message" and "mark read" are received
router.get('/read_last_unread_message_from_nickname/:seed/:password/:nickname/:searchingnickname/:onlymessage/:markread', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;
    let markread = req.params.markread;
    const searchingnickname = req.params.searchingnickname;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Setting up mark read parameter
    if (markread === "true") { markread = true; }
    else if (markread === "false") { markread = false; }
    else { markread = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_last_unread_message_from_nickname(nickname, searchingnickname, onlymessage, markread);

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

// **************** URL-s for reading last unread message from nickname  ****************











// **************** URL-s for reading all unread messages  ****************

// When seed, password and nickname are received
router.get('/read_all_unread_messages/:seed/:password/:nickname', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_all_unread_messages(nickname);

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

// When seed, password, nickname and "only message" are received
router.get('/read_all_unread_messages/:seed/:password/:nickname/:onlymessage', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_all_unread_messages(nickname, onlymessage);

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

// When seed, password, nickname, "only message" and "mark read" are received
router.get('/read_all_unread_messages/:seed/:password/:nickname/:onlymessage/:markread', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;
    let markread = req.params.markread;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Setting up mark read parameter
    if (markread === "true") { markread = true; }
    else if (markread === "false") { markread = false; }
    else { markread = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_all_unread_messages(nickname, onlymessage, markread);

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

// **************** URL-s for reading all unread messages  ****************














// **************** URL-s for reading all unread messages from nickname  ****************

// When seed, password, nickname and "searching nickname" are received
router.get('/read_all_unread_messages_from_nickname/:seed/:password/:nickname/:searchingnickname', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    const searchingnickname = req.params.searchingnickname;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_all_unread_messages_from_nickname(nickname, searchingnickname);

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

// When seed, password, nickname, "searching nickname" and "only message" are received
router.get('/read_all_unread_messages_from_nickname/:seed/:password/:nickname/:searchingnickname/:onlymessage', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;
    const searchingnickname = req.params.searchingnickname;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_all_unread_messages_from_nickname(nickname, searchingnickname, onlymessage);

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

// When seed, password, nickname, "searching nickname", "only message" and "mark read" are received
router.get('/read_all_unread_messages_from_nickname/:seed/:password/:nickname/:searchingnickname/:onlymessage/:markread', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const nickname = req.params.nickname;
    let onlymessage = req.params.onlymessage;
    let markread = req.params.markread;
    const searchingnickname = req.params.searchingnickname;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Setting up mark read parameter
    if (markread === "true") { markread = true; }
    else if (markread === "false") { markread = false; }
    else { markread = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.read_all_unread_messages_from_nickname(nickname, searchingnickname, onlymessage, markread);

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

// **************** URL-s for reading first unread message from nickname  ****************














// **************** URL-s for getting all messages  ****************

// When seed and password are received
router.get('/get_all_messages/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_all_messages();

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

// When seed, password and onlymessage are received
router.get('/get_all_messages/:seed/:password/:onlymessage', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    let onlymessage = req.params.onlymessage;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_all_messages(onlymessage);

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

// **************** URL-s for getting all messages  ****************














// **************** URL-s for getting last n messages  ****************

// When seed, password and n are received
router.get('/get_last_n_messages/:seed/:password/:n', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    const n = req.params.n;

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_last_n_messages(Number(n));

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

// When seed, password, n and onlymessage are received
router.get('/get_last_n_messages/:seed/:password/:n/:onlymessage', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;
    let onlymessage = req.params.onlymessage;
    const n = req.params.n;

    // Setting up only message parameter
    if (onlymessage === "true") { onlymessage = true; }
    else if (onlymessage === "false") { onlymessage = false; }
    else { onlymessage = undefined; }

    // Doing action
    let room = kernel.Rooms.room(seed, password);
    const action_feedback = room.get_last_n_messages(Number(n), onlymessage);

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

// **************** URL-s for getting last n messages  ****************









// **************** URL-s for checking if room exists  ****************

// When seed and password are received
router.get('/exists/:seed/:password', (req, res) => {
    // Receiving params from requested url
    const seed = req.params.seed;
    const password = req.params.password;

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

// **************** URL-s for checking if room exists  ****************







// Exporing router for global use
module.exports = router;