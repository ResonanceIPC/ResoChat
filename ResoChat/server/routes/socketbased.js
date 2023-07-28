// Including kernel for using base libraries
const { timingSafeEqual } = require("crypto");
const kernel = require("../kernel/kernel");

// Defining error
errors = {
    "500": "Cannot parse message to json"
}

// Class where all methods are defined connected with sockets
class SocketbasedFunctions {

    // Function for checking room exists or not
    static exists(options) {

        // Extracting parameters from options
        let seed = options["seed"]
        let password = options["password"]

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

        // Returning feedback
        return feedback
    }

    // Function for creating room
    static create(options) {
        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let name = options["name"];
        let description = options["description"];

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

        // Returning feedback
        return feedback
    }

    // Function for enabling room
    static enable(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];

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

        // Returning feedback
        return feedback
    }

    // Function for disabling room
    static disable(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];

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

        // Returning feedback
        return feedback
    }

    // Function for destroying room
    static destroy(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];

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

        // Returning feedback
        return feedback
    }

    // Function for changing room name
    static change_name(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let name = options["name"];

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

        // Returning feedback
        return feedback
    }

    // Function for changing room description
    static change_description(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let description = options["description"];

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

        // Returning feedback
        return feedback
    }

    // Function for changing room description
    static update_data(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let new_name = options["name"];
        let description = options["description"];

        // Doing action
        let room = kernel.Rooms.room(seed, password);
        const action_feedback = room.update_room_data(new_name, description);

        // Generating and returning feedback
        let feedback;
        if (action_feedback["error_code"] !== undefined) {
            feedback = kernel.Rooms.error_code;
        }
        else {
            feedback = kernel.Rooms.success_code;
        };

        // Returning feedback
        return feedback
    }

    // Function for changing room seed
    static change_seed(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let new_seed = options["new_seed"];

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

        // Returning feedback
        return feedback
    }

    // Function for changing room password
    static change_password(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let new_password = options["new_password"];

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

        // Returning feedback
        return feedback
    }

    // Function for setupping nickname
    static setup_nickname(options) {
        console.log(options);
        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let nickname = options["nickname"];

        // Doing action
        let room = kernel.Rooms.room(seed, password);
        const action_feedback = room.setup_nickname(nickname);
        console.log(action_feedback);
        // Generating and returning feedback
        let feedback;
        if (action_feedback["error_code"] !== undefined) {
            feedback = kernel.Rooms.error_code;
        }
        else {
            feedback = kernel.Rooms.success_code;
        };

        // Returning feedback
        return feedback
    }

    // Function for clearing nicknames
    static clear_nicknames(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];

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

        // Returning feedback
        return feedback
    }

    // Function for sending message
    static send_message(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let nickname = options["nickname"];
        let message = options["message"];
        let mark_read = options["mark_read"];

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

        // Returning feedback
        return feedback
    }

    // Function for marking next as read
    static mark_next_as_read(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let nickname = options["nickname"];

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

        // Returning feedback
        return feedback
    }

    // Function for marking all as read
    static mark_all_as_read(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let nickname = options["nickname"];

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

        // Returning feedback
        return feedback
    }

    // Function for clearing messages
    static clear_messages(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];

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

        // Returning feedback
        return feedback
    }

    // Function for getting room data
    static get_room_data(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];

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
        };

        // Returning feedback
        return feedback
    }

    // Function for getting all messages
    static get_all_messages(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let only_message = options["only_message"];

        // Doing action
        let room = kernel.Rooms.room(seed, password);
        const action_feedback = room.get_all_messages(only_message);

        // Generating and returning feedback
        let feedback;
        if (action_feedback["error_code"] !== undefined) {
            feedback = kernel.Rooms.error_code;
        }
        else {
            feedback = JSON.stringify({ "messages": action_feedback });
        };

        // Returning feedback
        return feedback
    }

    // Function for getting last n messages
    static get_last_n_messages(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let n = options["n"];
        let only_message = options["only_message"];

        // Doing action
        let room = kernel.Rooms.room(seed, password);
        const action_feedback = room.get_last_n_messages(n, only_message);

        // Generating and returning feedback
        let feedback;
        if (action_feedback["error_code"] !== undefined) {
            feedback = kernel.Rooms.error_code;
        }
        else {
            feedback = JSON.stringify({ "messages": action_feedback });
        };

        // Returning feedback
        return feedback
    }

    // Function for reading all unread messages
    static read_all_unread_messages(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let nickname = options["nickname"];
        let mark_read = options["mark_read"];
        let only_message = options["only_message"];

        // Doing action
        let room = kernel.Rooms.room(seed, password);
        const action_feedback = room.read_all_unread_messages(nickname, only_message, mark_read);

        // Generating and returning feedback
        let feedback;
        if (action_feedback["error_code"] !== undefined) {
            feedback = kernel.Rooms.error_code;
        }
        else if (action_feedback === kernel.Rooms.empty_code) {
            feedback = kernel.Rooms.empty_code;
        }
        else {
            feedback = JSON.stringify({ "messages": action_feedback });
        };

        // Returning feedback
        return feedback
    }

    // Function for reading all unread messages from nickname
    static read_all_unread_messages_from_nickname(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let nickname = options["nickname"];
        let mark_read = options["mark_read"];
        let only_message = options["only_message"];
        let searchingnickname = options["searchingnickname"];

        // Doing action
        let room = kernel.Rooms.room(seed, password);
        const action_feedback = room.read_all_unread_messages_from_nickname(nickname, searchingnickname, only_message, mark_read);

        // Generating and returning feedback
        let feedback;
        if (action_feedback["error_code"] !== undefined) {
            feedback = kernel.Rooms.error_code;
        }
        else if (action_feedback === kernel.Rooms.empty_code) {
            feedback = kernel.Rooms.empty_code;
        }
        else {
            feedback = JSON.stringify({ "messages": action_feedback });
        };

        // Returning feedback
        return feedback
    }

    // Function for reading first unread message
    static read_first_unread_message(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let nickname = options["nickname"];
        let mark_read = options["mark_read"];
        let only_message = options["only_message"];

        // Doing action
        let room = kernel.Rooms.room(seed, password);
        const action_feedback = room.read_first_unread_message(nickname, only_message, mark_read);

        // Generating and returning feedback
        let feedback;
        if (action_feedback["error_code"] !== undefined) {
            feedback = kernel.Rooms.error_code;
        }
        else if (action_feedback === kernel.Rooms.empty_code) {
            feedback = kernel.Rooms.empty_code;
        }
        else {
            feedback = action_feedback
            if (only_message === false) {
                feedback = JSON.stringify(feedback);
            }
        };

        // Returning feedback
        return feedback
    }

    // Function for reading first unread message from nickname
    static read_first_unread_message_from_nickname(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let nickname = options["nickname"];
        let mark_read = options["mark_read"];
        let only_message = options["only_message"];
        let searchingnickname = options["searchingnickname"];

        // Doing action
        let room = kernel.Rooms.room(seed, password);
        const action_feedback = room.read_first_unread_message_from_nickname(nickname, searchingnickname, only_message, mark_read);

        // Generating and returning feedback
        let feedback;
        if (action_feedback["error_code"] !== undefined) {
            feedback = kernel.Rooms.error_code;
        }
        else if (action_feedback === kernel.Rooms.empty_code) {
            feedback = kernel.Rooms.empty_code;
        }
        else {
            feedback = action_feedback
            if (only_message === false) {
                feedback = JSON.stringify(feedback);
            }
        };

        // Returning feedback
        return feedback
    }


    // Function for reading last unread message
    static read_last_unread_message(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let nickname = options["nickname"];
        let mark_read = options["mark_read"];
        let only_message = options["only_message"];

        // Doing action
        let room = kernel.Rooms.room(seed, password);
        const action_feedback = room.read_last_unread_message(nickname, only_message, mark_read);

        // Generating and returning feedback
        let feedback;
        if (action_feedback["error_code"] !== undefined) {
            feedback = kernel.Rooms.error_code;
        }
        else if (action_feedback === kernel.Rooms.empty_code) {
            feedback = kernel.Rooms.empty_code;
        }
        else {
            feedback = action_feedback
            if (only_message === false) {
                feedback = JSON.stringify(feedback);
            }
        };

        // Returning feedback
        return feedback
    }

    // Function for reading last unread message from nickname
    static read_last_unread_message_from_nickname(options) {

        // Extracting parameters from options
        let seed = options["seed"];
        let password = options["password"];
        let nickname = options["nickname"];
        let mark_read = options["mark_read"];
        let only_message = options["only_message"];
        let searchingnickname = options["searchingnickname"];

        // Doing action
        let room = kernel.Rooms.room(seed, password);
        const action_feedback = room.read_last_unread_message_from_nickname(nickname, searchingnickname, only_message, mark_read);

        // Generating and returning feedback
        let feedback;
        if (action_feedback["error_code"] !== undefined) {
            feedback = kernel.Rooms.error_code;
        }
        else if (action_feedback === kernel.Rooms.empty_code) {
            feedback = kernel.Rooms.empty_code;
        }
        else {
            feedback = action_feedback
            if (only_message === false) {
                feedback = JSON.stringify(feedback);
            }
        };

        // Returning feedback
        return feedback
    }
}

// Defining function for controlling socketbased requests
function Socketbased(ws) {
    ws.on('message', function incoming(message) {

        // Trying to parse message to json
        let data;
        try {
            data = JSON.parse(message);
        } catch (error) {
            ws.send(kernel.Rooms.error_code);
        }

        // Extraction action and options from message 
        if (data?.action === undefined || data?.options === undefined) { return kernel.Rooms.error_code; };
        let action = data["action"];
        let options = data["options"]
        let feedback;
        switch (action) {
            case 'exists':
                feedback = SocketbasedFunctions.exists(options);
                break;
            case 'create':
                feedback = SocketbasedFunctions.create(options);
                break;
            case 'enable':
                feedback = SocketbasedFunctions.enable(options);
                break;
            case 'disable':
                feedback = SocketbasedFunctions.disable(options);
                break;
            case 'destroy':
                feedback = SocketbasedFunctions.destroy(options);
                break;
            case 'change_name':
                feedback = SocketbasedFunctions.change_name(options);
                break;
            case 'change_description':
                feedback = SocketbasedFunctions.change_description(options);
                break;
            case 'update_data':
                feedback = SocketbasedFunctions.update_data(options);
                break;
            case 'change_seed':
                feedback = SocketbasedFunctions.change_seed(options);
                break;
            case 'change_password':
                feedback = SocketbasedFunctions.change_password(options);
                break;
            case 'setup_nickname':
                feedback = SocketbasedFunctions.setup_nickname(options);
                break;
            case 'clear_nicknames':
                feedback = SocketbasedFunctions.clear_nicknames(options);
                break;
            case 'send_message':
                feedback = SocketbasedFunctions.send_message(options);
                break;
            case 'mark_next_as_read':
                feedback = SocketbasedFunctions.mark_next_as_read(options);
                break;
            case 'mark_all_as_read':
                feedback = SocketbasedFunctions.mark_all_as_read(options);
                break;
            case 'clear_messages':
                feedback = SocketbasedFunctions.clear_messages(options);
                break;
            case 'get_room_data':
                feedback = SocketbasedFunctions.get_room_data(options);
                break;
            case 'get_all_messages':
                feedback = SocketbasedFunctions.get_all_messages(options);
                break;
            case 'get_last_n_messages':
                feedback = SocketbasedFunctions.get_last_n_messages(options);
                break;
            case 'read_all_unread_messages':
                feedback = SocketbasedFunctions.read_all_unread_messages(options);
                break;
            case 'read_all_unread_messages_from_nickname':
                feedback = SocketbasedFunctions.read_all_unread_messages_from_nickname(options);
                break;
            case 'read_first_unread_message':
                feedback = SocketbasedFunctions.read_first_unread_message(options);
                break;
            case 'read_first_unread_message_from_nickname':
                feedback = SocketbasedFunctions.read_first_unread_message_from_nickname(options);
                break;
            case 'read_last_unread_message':
                feedback = SocketbasedFunctions.read_last_unread_message(options);
                break;
            case 'read_last_unread_message_from_nickname':
                feedback = SocketbasedFunctions.read_last_unread_message_from_nickname(options);
                break;
            default:
                feedback = kernel.Rooms.error_code;
        }

        // Sending feedback
        let id = data["id"];
        let formatted_feedback = {
        }
        formatted_feedback[id] = feedback;
        formatted_feedback = JSON.stringify(formatted_feedback)
        ws.send(formatted_feedback)
    })
}

// Exporting function for global use
module.exports = Socketbased;