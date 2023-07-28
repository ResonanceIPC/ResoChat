#!/bin/bash

# Defining variable which will save OUTPUT of every command
output=""

# Defining static codes
empty_code='(:~empty~:)'
error_code='(:~error~:)'
success_code='(:~success~:)'
fetch_error_code='(:~fetcherror~:)'

# Defining variables for server
url=''

# Defining client variables
seed=""
password=""

# This is function for setupping configurations
function setup() {
    # Function parameters by their index
    # $1 - Url
    # $2 - Seed
    # $3 - Password

    # Setupping variable
    url=$1
    seed=$2
    password=$3

    # Remove the last slash if it exists
    if [[ $url == */ ]]; then
        url="${url::-1}"
    fi

    # Returning 0 for indicating successful execution
    return 0
}

# This is function for updating configurations
function update() {
    # Function parameters by their index
    # $1 - Url
    # $2 - Seed
    # $3 - Password

    # Setupping variable
    if [[ -n $1 ]]; then
        url=$1
    fi

    if [[ -n $2 ]]; then
        seed=$2
    fi

    if [[ -n $3 ]]; then
        password=$3
    fi

    # Remove the last slash if it exists
    if [[ $url == */ ]]; then
        url="${url::-1}"
    fi

    # Returning 0 for indicating successful execution
    return 0
}

# Function for checking if server is up
function ping_server() {
    # Function parameters by their index
    # ~ no parameters ~

    # Defining route
    local route="/test/ping"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "2419" ]]; then
        feedback="$success_code"
    else
        feedback="$error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for checking if room with given seed and password exists or not
function room_exists() {
    # Function parameters by their index
    # ~ no parameters ~

    # Defining route
    local route="/urlbased/exists/${seed}/${password}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "true" ]]; then
        feedback="true"
    elif [[ "$response" == "false" ]]; then
        feedback="false"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for creating room
function create_room() {
    # Function parameters by their index
    # $1 - Name
    # $2 - Description

    # Setupping variables
    local name=$1
    local description=$2

    # Formatting variables for parsing in url
    [ -n "$name" ] && name=$(echo "$name" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    [ -n "$description" ] && description=$(echo "$description" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    
    # Defining route
    local route="/urlbased/create/${seed}/${password}"

    # Formatting url if parameters exists
    if [ -v 1 ]; then
        route="$route/$name"
        if [ -v 2 ]; then
            route="$route/$description"
        fi
    fi

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for destroying room
function destroy_room() {
    # Function parameters by their index
    # ~ no parameters ~

    # Defining route
    local route="/urlbased/destroy/${seed}/${password}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for enabling room
function enable_room() {
    # Function parameters by their index
    # ~ no parameters ~

    # Defining route
    local route="/urlbased/enable/${seed}/${password}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for disabling room
function disable_room() {
    # Function parameters by their index
    # ~ no parameters ~

    # Defining route
    local route="/urlbased/disable/${seed}/${password}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for changing room name
function change_room_name() {
    # Function parameters by their index
    # $1 - Name

    # Setupping variables
    local name=$1

    # Formatting variables for parsing in url
    [ -n "$name" ] && name=$(echo "$name" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')

    # Defining route
    local route="/urlbased/change_name/${seed}/${password}/${name}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for changing room description
function change_room_description() {
    # Function parameters by their index
    # $1 - Description

    # Setupping variables
    local description=$1

    # Formatting variables for parsing in url
    [ -n "$description" ] && description=$(echo "$description" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')

    # Defining route
    local route="/urlbased/change_description/${seed}/${password}/${description}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for updating room data
function update_room_data() {
    # Function parameters by their index
    # $1 - Name
    # $2 - Description

    # Setupping variables
    local name=$1
    local description=$2

    # Formatting variables for parsing in url
    [ -n "$name" ] && name=$(echo "$name" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    [ -n "$description" ] && description=$(echo "$description" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')

    # Defining route
    local route="/urlbased/update_data/${seed}/${password}"

    # Formatting url if parameters exists
    if [ -v 1 ]; then
        route="$route/$name"
        if [ -v 2 ]; then
            route="$route/$description"
        fi
    fi

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for changing room seed
function change_room_seed() {
    # Function parameters by their index
    # $1 - New seed

    # Setupping variables
    local new_seed=$1

    # Defining route
    local route="/urlbased/change_seed/${seed}/${password}/${new_seed}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for changing room password
function change_room_password() {
    # Function parameters by their index
    # $1 - New password

    # Setupping variables
    local new_password=$1

    # Defining route
    local route="/urlbased/change_password/${seed}/${password}/${new_password}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for setupping nickname
function setup_nickname_in_room() {
    # Function parameters by their index
    # $1 - Nickname

    # Setupping variables
    local nickname=$1

    # Formatting variables for parsing in url
    [ -n "$nickname" ] && nickname=$(echo "$nickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    
    # Defining route
    local route="/urlbased/setup_nickname/${seed}/${password}/${nickname}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for clearing nicknames
function clear_nicknames_in_room() {
    # Function parameters by their index
    # ~ no parameters ~

    # Defining route
    local route="/urlbased/clear_nicknames/${seed}/${password}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for sending message
function send_message() {
    # Function parameters by their index
    # $1 - Nickname
    # $2 - Message
    # $3 - Mark read

    # Setupping variables
    local nickname=$1
    local message=$2
    local markread=$3

    # Formatting variables for parsing in url
    [ -n "$nickname" ] && nickname=$(echo "$nickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    [ -n "$message" ] && message=$(echo "$message" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')

    # Formatting markread parameter to right format for fetching
    if [ "$markread" != "true" ] && [ "$markread" != "false" ]; then
        markread="true"
    fi

    # Defining route
    local route="/urlbased/send_message/${seed}/${password}/${nickname}/${message}"

    # Formatting url if parameters exists
    if [ -v 1 ]; then
        route="$route/$markread"
    fi

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for clearing messages
function clear_messages() {
    # Function parameters by their index
    # ~ no parameters ~

    # Defining route
    local route="/urlbased/clear_messages/${seed}/${password}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for marking all as read
function mark_all_as_read_in_room() {
    # Function parameters by their index
    # $1 - Nickname

    # Setupping variables
    local nickname=$1

    # Formatting variables for parsing in url
    [ -n "$nickname" ] && nickname=$(echo "$nickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    
    # Defining route
    local route="/urlbased/mark_all_as_read/${seed}/${password}/${nickname}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for marking next as read
function mark_next_as_read_in_room() {
    # Function parameters by their index
    # $1 - Nickname

    # Setupping variables
    local nickname=$1

    # Formatting variables for parsing in url
    [ -n "$nickname" ] && nickname=$(echo "$nickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    
    # Defining route
    local route="/urlbased/mark_next_as_read/${seed}/${password}/${nickname}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$success_code" ]]; then
        feedback="$success_code"
    elif [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$fetch_error_code"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for getting room data
function get_room_data() {
    # Function parameters by their index
    # ~ no parameters ~

    # Checking connection with server
    ping_server
    if [ "$output" != "$success_code" ]; then
        output="${fetch_error_code}"
        return 0
    fi

    # Defining route
    local route="/urlbased/get_room_data/${seed}/${password}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$response"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for getting all message
function get_all_messages_in_room() {
    # Function parameters by their index
    # $1 - Only message

    # Setupping variables
    local onlymessage=$1

    # Checking connection with server
    ping_server
    if [ "$output" != "$success_code" ]; then
        output="${fetch_error_code}"
        return 0
    fi

    # Formatting onlymessage parameter to right format for fetching
    if [ "$onlymessage" != "true" ] && [ "$onlymessage" != "false" ]; then
        onlymessage="false"
    fi

    # Defining route
    local route="/urlbased/get_all_messages/${seed}/${password}/${onlymessage}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$response"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for getting last n messages
function get_last_n_messages_in_room() {
    # Function parameters by their index
    # $1 - N
    # $2 - Only message

    # Setupping variables
    local n=$1
    local onlymessage=$2

    # Checking connection with server
    ping_server
    if [ "$output" != "$success_code" ]; then
        output="${fetch_error_code}"
        return 0
    fi

    # Formatting onlymessage parameter to right format for fetching
    if [ "$onlymessage" != "true" ] && [ "$onlymessage" != "false" ]; then
        onlymessage="false"
    fi

    # Defining route
    local route="/urlbased/get_last_n_messages/${seed}/${password}/${n}/${onlymessage}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$response"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for reading first unread message
function read_first_unread_message_in_room() {
    # Function parameters by their index
    # $1 - Nikcname
    # $2 - Only message
    # $3 - Mark read

    # Setupping variables
    local nickname=$1
    local onlymessage=$2
    local markread=$3

    # Formatting variables for parsing in url
    [ -n "$nickname" ] && nickname=$(echo "$nickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    
    # Checking connection with server
    ping_server
    if [ "$output" != "$success_code" ]; then
        output="${fetch_error_code}"
        return 0
    fi

    # Formatting onlymessage parameter to right format for fetching
    if [ "$onlymessage" != "true" ] && [ "$onlymessage" != "false" ]; then
        onlymessage="false"
    fi

    # Formatting markread parameter to right format for fetching
    if [ "$markread" != "true" ] && [ "$markread" != "false" ]; then
        markread="true"
    fi

    # Defining route
    local route="/urlbased/read_first_unread_message/${seed}/${password}/${nickname}/${onlymessage}/${markread}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$response"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for reading last unread message
function read_last_unread_message_in_room() {
    # Function parameters by their index
    # $1 - Nikcname
    # $2 - Only message
    # $3 - Mark read

    # Setupping variables
    local nickname=$1
    local onlymessage=$2
    local markread=$3

    # Formatting variables for parsing in url
    [ -n "$nickname" ] && nickname=$(echo "$nickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    
    # Checking connection with server
    ping_server
    if [ "$output" != "$success_code" ]; then
        output="${fetch_error_code}"
        return 0
    fi

    # Formatting onlymessage parameter to right format for fetching
    if [ "$onlymessage" != "true" ] && [ "$onlymessage" != "false" ]; then
        onlymessage="false"
    fi

    # Formatting markread parameter to right format for fetching
    if [ "$markread" != "true" ] && [ "$markread" != "false" ]; then
        markread="true"
    fi

    # Defining route
    local route="/urlbased/read_last_unread_message/${seed}/${password}/${nickname}/${onlymessage}/${markread}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$response"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for reading all unread messages
function read_all_unread_messages_in_room() {
    # Function parameters by their index
    # $1 - Nikcname
    # $2 - Only message
    # $3 - Mark read

    # Setupping variables
    local nickname=$1
    local onlymessage=$2
    local markread=$3

    # Formatting variables for parsing in url
    [ -n "$nickname" ] && nickname=$(echo "$nickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    
    # Checking connection with server
    ping_server
    if [ "$output" != "$success_code" ]; then
        output="${fetch_error_code}"
        return 0
    fi

    # Formatting onlymessage parameter to right format for fetching
    if [ "$onlymessage" != "true" ] && [ "$onlymessage" != "false" ]; then
        onlymessage="false"
    fi

    # Formatting markread parameter to right format for fetching
    if [ "$markread" != "true" ] && [ "$markread" != "false" ]; then
        markread="true"
    fi

    # Defining route
    local route="/urlbased/read_all_unread_messages/${seed}/${password}/${nickname}/${onlymessage}/${markread}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$response"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for reading first unread message from nickname
function read_first_unread_message_from_nickname_in_room() {
    # Function parameters by their index
    # $1 - Nikcname
    # $2 - Only message
    # $3 - Mark read

    # Setupping variables
    local nickname=$1
    local searchingnickname=$2
    local onlymessage=$3
    local markread=$4

    # Formatting variables for parsing in url
    [ -n "$nickname" ] && nickname=$(echo "$nickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    [ -n "$searchingnickname" ] && searchingnickname=$(echo "$searchingnickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    
    # Checking connection with server
    ping_server
    if [ "$output" != "$success_code" ]; then
        output="${fetch_error_code}"
        return 0
    fi

    # Formatting onlymessage parameter to right format for fetching
    if [ "$onlymessage" != "true" ] && [ "$onlymessage" != "false" ]; then
        onlymessage="false"
    fi

    # Formatting markread parameter to right format for fetching
    if [ "$markread" != "true" ] && [ "$markread" != "false" ]; then
        markread="true"
    fi

    # Defining route
    local route="/urlbased/read_first_unread_message_from_nickname/${seed}/${password}/${nickname}/${searchingnickname}/${onlymessage}/${markread}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$response"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for reading last unread message from nickname
function read_last_unread_message_from_nickname_in_room() {
    # Function parameters by their index
    # $1 - Nikcname
    # $2 - Only message
    # $3 - Mark read

    # Setupping variables
    local nickname=$1
    local searchingnickname=$2
    local onlymessage=$3
    local markread=$4

    # Formatting variables for parsing in url
    [ -n "$nickname" ] && nickname=$(echo "$nickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    [ -n "$searchingnickname" ] && searchingnickname=$(echo "$searchingnickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    
    # Checking connection with server
    ping_server
    if [ "$output" != "$success_code" ]; then
        output="${fetch_error_code}"
        return 0
    fi

    # Formatting onlymessage parameter to right format for fetching
    if [ "$onlymessage" != "true" ] && [ "$onlymessage" != "false" ]; then
        onlymessage="false"
    fi

    # Formatting markread parameter to right format for fetching
    if [ "$markread" != "true" ] && [ "$markread" != "false" ]; then
        markread="true"
    fi

    # Defining route
    local route="/urlbased/read_last_unread_message_from_nickname/${seed}/${password}/${nickname}/${searchingnickname}/${onlymessage}/${markread}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$response"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}

# Function for reading all unread messages from nickname
function read_all_unread_messages_from_nickname_in_room() {
    # Function parameters by their index
    # $1 - Nikcname
    # $2 - Only message
    # $3 - Mark read

    # Setupping variables
    local nickname=$1
    local searchingnickname=$2
    local onlymessage=$3
    local markread=$4

    # Formatting variables for parsing in url
    [ -n "$nickname" ] && nickname=$(echo "$nickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    [ -n "$searchingnickname" ] && searchingnickname=$(echo "$searchingnickname" | sed -e 's/%/%25/g' -e 's/ /%20/g' -e 's/\//%2F/g' -e 's/?/%3F/g' -e 's/&/%26/g' -e 's/#/%23/g')
    
    # Checking connection with server
    ping_server
    if [ "$output" != "$success_code" ]; then
        output="${fetch_error_code}"
        return 0
    fi

    # Formatting onlymessage parameter to right format for fetching
    if [ "$onlymessage" != "true" ] && [ "$onlymessage" != "false" ]; then
        onlymessage="false"
    fi

    # Formatting markread parameter to right format for fetching
    if [ "$markread" != "true" ] && [ "$markread" != "false" ]; then
        markread="true"
    fi

    # Defining route
    local route="/urlbased/read_all_unread_messages_from_nickname/${seed}/${password}/${nickname}/${searchingnickname}/${onlymessage}/${markread}"

    # Defining url for fetching
    local full_url="$url$route"
    full_url=$(echo "$full_url" | sed 's/ /%20/g')
    local response=""

    # Fetching with url and getting content
    response=$(curl -s $full_url)

    # Formatting response
    if [[ "$response" == "$error_code" ]]; then
        feedback="$error_code"
    else
        feedback="$response"
    fi

    # Marking output as our response
    output=$feedback

    # Returning 0 for indicating successful execution
    return 0
}