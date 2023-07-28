// Defining Resochat class where all methods are stored
class Resochat {

    // Defining static codes
    empty_code = `(:~empty~:)`;
    error_code = `(:~error~:)`;
    success_code = `(:~success~:)`;
    fetch_error_code = `(:~fetcherror~:)`;

    // Defining variables for server
    url;

    // Defining default variables
    seed;
    password;

    // Constructor for setting up seed and password
    constructor(url, seed, password) {

        // Formatting url if it is needed
        url = url.replace(/\/$/, '');

        // Setting server variables
        this.url = url;

        // Setting variables
        this.seed = seed;
        this.password = password;

        // Returning true if everything is okay
        return true;
    }

    // Method for updating seed and password
    update(url, seed, password) {

        // Formatting url if it is needed
        url = url.replace(/\/$/, '');

        // Updating variables if they are not undefined
        if (url !== undefined) { this.url = url; };
        if (seed !== undefined) { this.seed = seed; };
        if (password !== undefined) { this.password = password; };

        // Returning true if everything is okay
        return true;
    }

    // Method for pinging and checking connection with server
    async ping() {

        // Defining route
        let route = "/test/ping"

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = ((content === "2419") ? true : false);
        } catch (error) {
            feedback = false;
        }

        // Returning content
        return feedback;
    }

    // Method for checking if room with given data exists or not
    async exists() {

        // Defining route
        let route = `/postbased/exists`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Formatting feedback
        if (feedback === "true") { feedback = true; }
        else if (feedback === "false") { feedback = false; };

        // Returning content
        return feedback;
    }

    // Method for creating room
    async create(name, description) {

        // Defining route
        let route = `/postbased/create`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "name": name,
            "description": description,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for changing name
    async change_name(name) {

        // Defining route
        let route = `/postbased/change_name`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "name": name,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for changing description
    async change_description(description) {

        // Defining route
        let route = `/postbased/change_description`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "description": description,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for changing seed
    async change_seed(seed) {

        // Defining route
        let route = `/postbased/change_seed`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "new_seed": seed,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Updating crucial variables inside
        if (feedback === this.success_code) {
            this.seed = seed;
        }

        // Returning content
        return feedback;
    }

    // Method for changing password
    async change_password(password) {

        // Defining route
        let route = `/postbased/change_password`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "new_password": password,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Updating crucial variables inside
        if (feedback === this.success_code) {
            this.password = password;
        }

        // Returning content
        return feedback;
    }

    // Method for enabling room
    async enable() {

        // Defining route
        let route = `/postbased/enable`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for disabling room
    async disable() {

        // Defining route
        let route = `/postbased/disable`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for destroying room
    async destroy() {

        // Defining route
        let route = `/postbased/destroy`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;
        }

        // Returning content
        return feedback;
    }

    // Method for updating room data
    async update_data(name, description) {

        // Defining route
        let route = `/postbased/update_data`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "name": name,
            "description": description,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;
        }

        // Returning content
        return feedback;
    }

    // Method for setupping nickname
    async setup_nickname(nickname) {

        // Defining route
        let route = `/postbased/setup_nickname`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "nickname": nickname,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;
        }

        // Returning content
        return feedback;
    }

    // Method for clearing nicknames cache in room
    async clear_nicknames() {

        // Defining route
        let route = `/postbased/clear_nicknames`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;
        }

        // Returning content
        return feedback;
    }

    // Method for sending message
    async send_message(nickname, message, mark_read = true) {

        // Formatting variables which are needed for fetching
        if (mark_read !== true && mark_read !== false) { mark_read = true }

        // Defining route
        let route = `/postbased/send_message`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "nickname": nickname,
            "message": message,
            "mark_read": mark_read,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;
        }

        // Returning content
        return feedback;
    }

    // Method for clearing messages
    async clear_messages() {

        // Defining route
        let route = `/postbased/clear_messages`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;
        }

        // Returning content
        return feedback;
    }

    // Method for marking next as read
    async mark_next_as_read() {

        // Defining route
        let route = `/postbased/mark_next_as_read`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;
        }

        // Returning content
        return feedback;
    }

    // Method for marking next as read
    async mark_all_as_read() {

        // Defining route
        let route = `/postbased/mark_all_as_read`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;
        }

        // Returning content
        return feedback;
    }

    // Method for getting all messages
    async get_all_messages(only_message = false) {

        // Formatting variables which are needed for fetching
        if (only_message !== true && only_message !== false) { only_message = false }

        // Defining route
        let route = `/postbased/get_all_messages`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "only_message": only_message,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for getting last n messages
    async get_last_n_messages(n, only_message = false) {

        // Formatting variables which are needed for fetching
        if (only_message !== true && only_message !== false) { only_message = false }

        // Defining route
        let route = `/postbased/get_last_n_messages`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "n": n,
            "only_message": only_message,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for getting room data
    async get_room_data() {

        // Defining route
        let route = `/postbased/get_room_data`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for reading first unread message
    async read_first_unread_message(nickname, only_message = false, mark_read = true) {
        
        // Formatting variables which are needed for fetching
        if (mark_read !== true && mark_read !== false) { mark_read = true }

        // Formatting variables which are needed for fetching
        if (only_message !== true && only_message !== false) { only_message = false }

        // Defining route
        let route = `/postbased/read_first_unread_message`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for reading last unread message
    async read_last_unread_message(nickname, only_message = false, mark_read = true) {
        
        // Formatting variables which are needed for fetching
        if (mark_read !== true && mark_read !== false) { mark_read = true }

        // Formatting variables which are needed for fetching
        if (only_message !== true && only_message !== false) { only_message = false }

        // Defining route
        let route = `/postbased/read_last_unread_message`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for reading all unread messages
    async read_all_unread_messages(nickname, only_message = false, mark_read = true) {
        
        // Formatting variables which are needed for fetching
        if (mark_read !== true && mark_read !== false) { mark_read = true }

        // Formatting variables which are needed for fetching
        if (only_message !== true && only_message !== false) { only_message = false }

        // Defining route
        let route = `/postbased/read_all_unread_messages`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for reading first unread message from nickname
    async read_first_unread_message_from_nickname(nickname, searching_nickname, only_message = false, mark_read = true) {
        
        // Formatting variables which are needed for fetching
        if (mark_read !== true && mark_read !== false) { mark_read = true }

        // Formatting variables which are needed for fetching
        if (only_message !== true && only_message !== false) { only_message = false }

        // Defining route
        let route = `/postbased/read_first_unread_message_from_nickname`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
            "searching_nickname" : searching_nickname,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for reading last unread message from nickname
    async read_last_unread_message_from_nickname(nickname, searching_nickname, only_message = false, mark_read = true) {
        
        // Formatting variables which are needed for fetching
        if (mark_read !== true && mark_read !== false) { mark_read = true }

        // Formatting variables which are needed for fetching
        if (only_message !== true && only_message !== false) { only_message = false }

        // Defining route
        let route = `/postbased/read_last_unread_message_from_nickname`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
            "searching_nickname" : searching_nickname,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for reading all unread messages from nickname
    async read_all_unread_messages_from_nickname(nickname, searching_nickname, only_message = false, mark_read = true) {
        
        // Formatting variables which are needed for fetching
        if (mark_read !== true && mark_read !== false) { mark_read = true }

        // Formatting variables which are needed for fetching
        if (only_message !== true && only_message !== false) { only_message = false }

        // Defining route
        let route = `/postbased/read_all_unread_messages_from_nickname`

        // Defining data content for special that case
        let data = {
            "seed": this.seed,
            "password": this.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
            "searching_nickname" : searching_nickname,
        };

        // Defining content
        let post_content = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": { 'Content-Type': 'application/json' }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url, post_content);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }
}

// Exporting class for globlal use
module.exports = Resochat;