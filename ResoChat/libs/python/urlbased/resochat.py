# Importing base libraries
import requests

# Defining class from which all methods of Resochat are accessible


class Resochat:

    # Defining static codes
    empty_code = '(:~empty~:)'
    error_code = '(:~error~:)'
    success_code = '(:~success~:)'
    fetch_error_code = '(:~fetcherror~:)'

    # Defining variables for server
    url = None

    # Defining default variables
    seed = None
    password = None

    # Constructor for setting up seed, password and nickname
    def __init__(self, url, seed, password):

        # Formatting url if it is needed
        if url.endswith('/'):
            url = url[:-1]

        # Setting server variables
        self.url = url

        # Setting variables
        self.seed = seed
        self.password = password

    # Method for updating seed, password, nickname
    def update(self, url=None, seed=None, password=None):

        # Formatting url if it is needed
        if url != None and url.endswith('/'):
            url = url[:-1]

        # Updating variables if they are not undefined
        if url != None:
            self.url = url
        if seed != None:
            self.seed = seed
        if password != None:
            self.password = password

        # Returning true if everything is okay
        return True

    # Method for pinging and checking connection with server
    def ping(self):

        # Defining route
        route = "/test/ping"

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            if content == "2419":
                feedback = True
            else:
                feedback = False
        except:
            feedback = False

        # Returning content
        return feedback

    # Method for checking if room with given data exists or not
    def exists(self):

        # Defining route
        route = f'/urlbased/exists/{self.seed}/{self.password}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text

            if content == "true":
                feedback = True
            elif content == "false":
                feedback = False
            else:
                content = feedback
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for creating room
    def create(self, name=None, description=None):

        # Formatting variables for parsing to url
        if name != None: name = name.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        if description != None: description = description.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")

        # Defining route
        route = f'/urlbased/create/{self.seed}/{self.password}'

        if name != None:
            route += f'/{name}'
            if description != None:
                route += f'/{description}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for enabling room
    def enable(self):

        # Defining route
        route = f'/urlbased/enable/{self.seed}/{self.password}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for disabling room
    def disable(self):

        # Defining route
        route = f'/urlbased/disable/{self.seed}/{self.password}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for destroying room
    def destroy(self):

        # Defining route
        route = f'/urlbased/destroy/{self.seed}/{self.password}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for setupping nickname
    def setup_nickname(self, nickname):

        # Formatting variables for parsing to url
        if nickname != None: nickname = nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Defining route
        route = f'/urlbased/setup_nickname/{self.seed}/{self.password}/{nickname}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for clearing nicknames
    def clear_nicknames(self):

        # Defining route
        route = f'/urlbased/clear_nicknames/{self.seed}/{self.password}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for changing name
    def change_name(self, name):

        # Formatting variables for parsing to url
        if name != None: name = name.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Defining route
        route = f'/urlbased/change_name/{self.seed}/{self.password}/{name}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for changing description
    def change_description(self, description):

        # Formatting variables for parsing to url
        if description != None: description = description.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Defining route
        route = f'/urlbased/change_description/{self.seed}/{self.password}/{description}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for updating data
    def update_data(self, name, description):

        # Formatting variables for parsing to url
        if name != None: name = name.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        if description != None: description = description.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Defining route
        route = f'/urlbased/update_data/{self.seed}/{self.password}/{name}/{description}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for changing seed
    def change_seed(self, seed):

        # Defining route
        route = f'/urlbased/change_seed/{self.seed}/{self.password}/{seed}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Updating crucial variable
        if feedback == self.success_code:
            self.seed = seed

        # Returning content
        return feedback

    # Method for changing password
    def change_password(self, password):

        # Defining route
        route = f'/urlbased/change_password/{self.seed}/{self.password}/{password}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Updating crucial variable
        if feedback == self.success_code:
            self.password = password

        # Returning content
        return feedback

    # Method for sending message
    def send_message(self, nickname, message, mark_read=True):

        # Formatting variables for parsing to url
        if nickname != None: nickname = nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        if message != None: message = message.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")

        # Formatting variables for use
        if mark_read == True:
            mark_read = "true"
        elif mark_read == False:
            mark_read = "false"
        else:
            mark_read = "true"

        # Defining route
        route = f'/urlbased/send_message/{self.seed}/{self.password}/{nickname}/{message}/{mark_read}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for clearing messages
    def clear_messages(self):

        # Defining route
        route = f'/urlbased/clear_messages/{self.seed}/{self.password}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for marking all as read for nickname
    def mark_all_as_read(self, nickname):

        # Formatting variables for parsing to url
        if nickname != None: nickname = nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Defining route
        route = f'/urlbased/mark_all_as_read/{self.seed}/{self.password}/{nickname}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for marking next as read for nickname
    def mark_next_as_read(self, nickname):

        # Formatting variables for parsing to url
        if nickname != None: nickname = nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Defining route
        route = f'/urlbased/mark_next_as_read/{self.seed}/{self.password}/{nickname}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for getting room data
    def get_room_data(self):

        # Defining route
        route = f'/urlbased/get_room_data/{self.seed}/{self.password}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for getting all messages
    def get_all_messages(self, only_message=False):

        # Formatting variables for use
        if only_message == True:
            only_message = "true"
        elif only_message == False:
            only_message = "false"
        else:
            only_message = "false"

        # Defining route
        route = f'/urlbased/get_all_messages/{self.seed}/{self.password}/{only_message}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for getting last n messages
    def get_last_n_messages(self, n, only_message=False):

        # Formatting variables for use
        if only_message == True:
            only_message = "true"
        elif only_message == False:
            only_message = "false"
        else:
            only_message = "false"

        # Defining route
        route = f'/urlbased/get_last_n_messages/{self.seed}/{self.password}/{n}/{only_message}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for reading first unread message
    def read_first_unread_message(self, nickname, only_message=False, mark_read=True):

        # Formatting variables for parsing to url
        if nickname != None: nickname = nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Formatting variables for use
        if only_message == True:
            only_message = "true"
        elif only_message == False:
            only_message = "false"
        else:
            only_message = "false"

        # Formatting variables for use
        if mark_read == True:
            mark_read = "true"
        elif mark_read == False:
            mark_read = "false"
        else:
            mark_read = "true"

        # Defining route
        route = f'/urlbased/read_first_unread_message/{self.seed}/{self.password}/{nickname}/{only_message}/{mark_read}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for reading last unread message
    def read_last_unread_message(self, nickname, only_message=False, mark_read=True):

        # Formatting variables for parsing to url
        if nickname != None: nickname = nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Formatting variables for use
        if only_message == True:
            only_message = "true"
        elif only_message == False:
            only_message = "false"
        else:
            only_message = "false"

        # Formatting variables for use
        if mark_read == True:
            mark_read = "true"
        elif mark_read == False:
            mark_read = "false"
        else:
            mark_read = "true"

        # Defining route
        route = f'/urlbased/read_last_unread_message/{self.seed}/{self.password}/{nickname}/{only_message}/{mark_read}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for reading all unread messages
    def read_all_unread_messages(self, nickname, only_message=False, mark_read=True):

        # Formatting variables for parsing to url
        if nickname != None: nickname = nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Formatting variables for use
        if only_message == True:
            only_message = "true"
        elif only_message == False:
            only_message = "false"
        else:
            only_message = "false"

        # Formatting variables for use
        if mark_read == True:
            mark_read = "true"
        elif mark_read == False:
            mark_read = "false"
        else:
            mark_read = "true"

        # Defining route
        route = f'/urlbased/read_all_unread_messages/{self.seed}/{self.password}/{nickname}/{only_message}/{mark_read}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for reading first unread message from nickname
    def read_first_unread_message_from_nickname(self, nickname, searching_nickname, only_message=False, mark_read=True):

        # Formatting variables for parsing to url
        if nickname != None: nickname = nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        if searching_nickname != None: searching_nickname = searching_nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Formatting variables for use
        if only_message == True:
            only_message = "true"
        elif only_message == False:
            only_message = "false"
        else:
            only_message = "false"

        # Formatting variables for use
        if mark_read == True:
            mark_read = "true"
        elif mark_read == False:
            mark_read = "false"
        else:
            mark_read = "true"

        # Defining route
        route = f'/urlbased/read_first_unread_message_from_nickname/{self.seed}/{self.password}/{nickname}/{searching_nickname}/{only_message}/{mark_read}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for reading last unread message from nickname
    def read_last_unread_message_from_nickname(self, nickname, searching_nickname, only_message=False, mark_read=True):

        # Formatting variables for parsing to url
        if nickname != None: nickname = nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        if searching_nickname != None: searching_nickname = searching_nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Formatting variables for use
        if only_message == True:
            only_message = "true"
        elif only_message == False:
            only_message = "false"
        else:
            only_message = "false"

        # Formatting variables for use
        if mark_read == True:
            mark_read = "true"
        elif mark_read == False:
            mark_read = "false"
        else:
            mark_read = "true"

        # Defining route
        route = f'/urlbased/read_last_unread_message_from_nickname/{self.seed}/{self.password}/{nickname}/{searching_nickname}/{only_message}/{mark_read}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for reading all unread messages from nickname
    def read_all_unread_messages_from_nickname(self, nickname, searching_nickname, only_message=False, mark_read=True):

        # Formatting variables for parsing to url
        if nickname != None: nickname = nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        if searching_nickname != None: searching_nickname = searching_nickname.replace("%", "%25").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("&", "%26").replace("#", "%23")
        
        # Formatting variables for use
        if only_message == True:
            only_message = "true"
        elif only_message == False:
            only_message = "false"
        else:
            only_message = "false"

        # Formatting variables for use
        if mark_read == True:
            mark_read = "true"
        elif mark_read == False:
            mark_read = "false"
        else:
            mark_read = "true"

        # Defining route
        route = f'/urlbased/read_all_unread_messages_from_nickname/{self.seed}/{self.password}/{nickname}/{searching_nickname}/{only_message}/{mark_read}'

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.get(full_url)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback
