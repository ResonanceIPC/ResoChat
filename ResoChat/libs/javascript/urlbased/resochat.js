
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
        let route = `/urlbased/exists/${this.seed}/${this.password}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            if (content === "true") { feedback = true; }
            else if (content === "false") { feedback = false; }
            else { content = feedback };
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for creating room
    async create(name, description) {
        // Formatting parameters for parsing to url
        if (name != undefined) { name = name.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }
        if (description != undefined) { description = description.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Defining route
        let route = `/urlbased/create/${this.seed}/${this.password}`

        if (name != undefined) {
            route += `/${name}`;
            if (description != undefined) {
                route += `/${description}`;
            }
        }

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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

        // Formatting parameters for parsing to url
        if (name != undefined) { name = name.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Defining route
        let route = `/urlbased/change_name/${this.seed}/${this.password}/${name}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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

        // Formatting parameters for parsing to url
        if (description != undefined) { description = description.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Defining route
        let route = `/urlbased/change_description/${this.seed}/${this.password}/${description}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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
        let route = `/urlbased/change_seed/${this.seed}/${this.password}/${seed}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Updating global variable because it is crusial when seed is updated
        if (feedback === this.success_code) {
            this.seed = seed;
        }

        // Returning content
        return feedback;
    }

    // Method for changing password
    async change_password(password) {

        // Formatting parameters for parsing to url
        if (password != undefined) { password = password.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Defining route
        let route = `/urlbased/change_password/${this.seed}/${this.password}/${password}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Updating global variable because it is crusial when seed is updated
        if (feedback === this.success_code) {
            this.password = password;
        }

        // Returning content
        return feedback;
    }

    // Method for enabling room
    async enable() {

        // Defining route
        let route = `/urlbased/enable/${this.seed}/${this.password}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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
        let route = `/urlbased/disable/${this.seed}/${this.password}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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
        let route = `/urlbased/destroy/${this.seed}/${this.password}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for setupping nickname in room
    async setup_nickname(nickname) {

        // Formatting parameters for parsing to url
        if (nickname != undefined) { nickname = nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Defining route
        let route = `/urlbased/setup_nickname/${this.seed}/${this.password}/${nickname}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for clearing nicknames cache in room
    async clear_nicknames() {

        // Defining route
        let route = `/urlbased/clear_nicknames/${this.seed}/${this.password}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for updating room data (name and description)
    async update_data(name, description) {

        // Formatting parameters for parsing to url
        if (name != undefined) { name = name.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }
        if (description != undefined) { description = description.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Defining route
        let route = `/urlbased/update_data/${this.seed}/${this.password}/${name}/${description}`

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for sending message
    async send_message(nickname, message, mark_read = true) {

        // Formatting parameters for parsing to url
        if (nickname != undefined) { nickname = nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }
        if (message != undefined) { message = message.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Formatting variables which are needed for fetching
        if (mark_read === true) { mark_read = 'true'; }
        else if (mark_read === false) { mark_read = 'false'; }
        else { mark_read = 'true'; }

        // Defining route
        let route = `/urlbased/send_message/${this.seed}/${this.password}/${nickname}/${message}/${mark_read}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for marking next mesage read for given nickname
    async mark_next_as_read(nickname) {

        // Formatting parameters for parsing to url
        if (nickname != undefined) { nickname = nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Defining route
        let route = `/urlbased/mark_next_as_read/${this.seed}/${this.password}/${nickname}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for marking all mesage read for given nickname
    async mark_all_as_read(nickname) {

        // Formatting parameters for parsing to url
        if (nickname != undefined) { nickname = nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Defining route
        let route = `/urlbased/mark_all_as_read/${this.seed}/${this.password}/${nickname}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for clearing all messages in room
    async clear_messages() {

        // Defining route
        let route = `/urlbased/clear_messages/${this.seed}/${this.password}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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
        if (only_message === true) { only_message = 'true'; }
        else if (only_message === false) { only_message = 'false'; }
        else { only_message = 'true'; };

        // Defining route
        let route = `/urlbased/get_last_n_messages/${this.seed}/${this.password}/${n}/${only_message}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for getting all messages
    async get_all_messages(only_message = false) {

        // Formatting variables which are needed for fetching
        if (only_message === true) { only_message = 'true'; }
        else if (only_message === false) { only_message = 'false'; }
        else { only_message = 'false'; }

        // Defining route
        let route = `/urlbased/get_all_messages/${this.seed}/${this.password}/${only_message}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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
        let route = `/urlbased/get_room_data/${this.seed}/${this.password}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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

        // Formatting parameters for parsing to url
        if (nickname != undefined) { nickname = nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Formatting variables which are needed for fetching
        if (mark_read === true) { mark_read = 'true'; }
        else if (mark_read === false) { mark_read = 'false'; }
        else { mark_read = 'true'; }

        // Formatting variables which are needed for fetching
        if (only_message === true) { only_message = 'true'; }
        else if (only_message === false) { only_message = 'false'; }
        else { only_message = 'true'; }

        // Defining route
        let route = `/urlbased/read_first_unread_message/${this.seed}/${this.password}/${nickname}/${only_message}/${mark_read}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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

        // Formatting parameters for parsing to url
        if (nickname != undefined) { nickname = nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Formatting variables which are needed for fetching
        if (mark_read === true) { mark_read = 'true'; }
        else if (mark_read === false) { mark_read = 'false'; }
        else { mark_read = 'true'; }

        // Formatting variables which are needed for fetching
        if (only_message === true) { only_message = 'true'; }
        else if (only_message === false) { only_message = 'false'; }
        else { only_message = 'true'; }

        // Defining route
        let route = `/urlbased/read_last_unread_message/${this.seed}/${this.password}/${nickname}/${only_message}/${mark_read}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }


    // Method for reading first unread message
    async read_first_unread_message_from_nickname(nickname, searching_nickname, only_message = false, mark_read = true) {

        // Formatting parameters for parsing to url
        if (nickname != undefined) { nickname = nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }
        if (searching_nickname != undefined) { searching_nickname = searching_nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Formatting variables which are needed for fetching
        if (mark_read === true) { mark_read = 'true'; }
        else if (mark_read === false) { mark_read = 'false'; }
        else { mark_read = 'true'; }

        // Formatting variables which are needed for fetching
        if (only_message === true) { only_message = 'true'; }
        else if (only_message === false) { only_message = 'false'; }
        else { only_message = 'true'; }

        // Defining route
        let route = `/urlbased/read_first_unread_message_from_nickname/${this.seed}/${this.password}/${nickname}/${searching_nickname}/${only_message}/${mark_read}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for reading last unread message
    async read_last_unread_message_from_nickname(nickname, searching_nickname, only_message = false, mark_read = true) {

        // Formatting parameters for parsing to url
        if (nickname != undefined) { nickname = nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }
        if (searching_nickname != undefined) { searching_nickname = searching_nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Formatting variables which are needed for fetching
        if (mark_read === true) { mark_read = 'true'; }
        else if (mark_read === false) { mark_read = 'false'; }
        else { mark_read = 'true'; }

        // Formatting variables which are needed for fetching
        if (only_message === true) { only_message = 'true'; }
        else if (only_message === false) { only_message = 'false'; }
        else { only_message = 'true'; }

        // Defining route
        let route = `/urlbased/read_last_unread_message_from_nickname/${this.seed}/${this.password}/${nickname}/${searching_nickname}/${only_message}/${mark_read}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
            content = await response.text();
            feedback = content;
        } catch (error) {
            feedback = this.fetch_error_code;;
        }

        // Returning content
        return feedback;
    }

    // Method for reading all unread message
    async read_all_unread_messages(nickname, only_message = false, mark_read = true) {

        // Formatting parameters for parsing to url
        if (nickname != undefined) { nickname = nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Formatting variables which are needed for fetching
        if (mark_read === true) { mark_read = 'true'; }
        else if (mark_read === false) { mark_read = 'false'; }
        else { mark_read = 'true'; }

        // Formatting variables which are needed for fetching
        if (only_message === true) { only_message = 'true'; }
        else if (only_message === false) { only_message = 'false'; }
        else { only_message = 'true'; }

        // Defining route
        let route = `/urlbased/read_all_unread_messages/${this.seed}/${this.password}/${nickname}/${only_message}/${mark_read}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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

        // Formatting parameters for parsing to url
        if (nickname != undefined) { nickname = nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }
        if (searching_nickname != undefined) { searching_nickname = searching_nickname.replace(/%/g, "%25").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23"); }

        // Formatting variables which are needed for fetching
        if (mark_read === true) { mark_read = 'true'; }
        else if (mark_read === false) { mark_read = 'false'; }
        else { mark_read = 'true'; }

        // Formatting variables which are needed for fetching
        if (only_message === true) { only_message = 'true'; }
        else if (only_message === false) { only_message = 'false'; }
        else { only_message = 'true'; }

        // Defining route
        let route = `/urlbased/read_all_unread_messages_from_nickname/${this.seed}/${this.password}/${nickname}/${searching_nickname}/${only_message}/${mark_read}`;

        // Defining url for fetching
        let full_url = `${this.url}${route}`;
        let response;
        let feedback;
        let content;

        // Trying to fetch
        try {
            response = await fetch(full_url);
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