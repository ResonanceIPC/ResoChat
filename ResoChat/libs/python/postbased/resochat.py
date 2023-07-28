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
        route = '/postbased/exists'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            print(content)
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
    def create(self, name, description):

        # Defining route
        route = '/postbased/create'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "name": name,
            "description": description,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for enabling room
    def enable(self):

        # Defining route
        route = '/postbased/enable'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for disabling room
    def disable(self):

        # Defining route
        route = '/postbased/disable'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for destroying room
    def destroy(self):

        # Defining route
        route = '/postbased/destroy'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for changing name
    def change_name(self, name):

        # Defining route
        route = '/postbased/change_name'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "name": name,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for changing description
    def change_description(self, description):

        # Defining route
        route = '/postbased/change_description'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "description": description,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for updating data
    def update_data(self, name="", description=""):

        # Defining route
        route = '/postbased/update_data'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "name": name,
            "description": description,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for changing seed
    def change_seed(self, seed):

        # Defining route
        route = '/postbased/change_seed'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "new_seed": seed,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
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
        route = '/postbased/change_password'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "new_password": password,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Updating crucial variable
        if feedback == self.success_code:
            self.password = password

        # Returning content
        return feedback

    # Method for setupping nickname
    def setup_nickname(self, nickname):

        # Defining route
        route = '/postbased/setup_nickname'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "nickname": nickname,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for clearing nicknames cache
    def clear_nicknames(self):

        # Defining route
        route = '/postbased/clear_nicknames'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for sending message
    def send_message(self, nickname, message, mark_read=True):

        # Formatting variables for use
        if mark_read != False and mark_read != True:
            mark_read = True

        # Defining route
        route = '/postbased/send_message'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "nickname": nickname,
            "message": message,
            "mark_read": mark_read,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for clearing messages
    def clear_messages(self):

        # Defining route
        route = '/postbased/clear_messages'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for marking all as read
    def mark_all_as_read(self, nickname):

        # Defining route
        route = '/postbased/mark_all_as_read'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "nickname": nickname,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for marking next as read
    def mark_next_as_read(self, nickname):

        # Defining route
        route = '/postbased/mark_next_as_read'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "nickname": nickname,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for getting room data
    def get_room_data(self):

        # Defining route
        route = '/postbased/get_room_data'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for getting all messages
    def get_all_messages(self, only_message=False):

        # Formatting variables for use
        if only_message != False and only_message != True:
            only_message = False

        # Defining route
        route = '/postbased/get_all_messages'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "only_message": only_message,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for getting lsat n messages

    def get_last_n_messages(self, n, only_message=False):

        # Formatting variables for use
        if only_message != False and only_message != True:
            only_message = False

        # Defining route
        route = '/postbased/get_last_n_messages'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "n": n,
            "only_message": only_message,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for reading first unread message
    def read_first_unread_message(self, nickname, only_message=False, mark_read=True):

        # Formatting variables for use
        if only_message != False and only_message != True:
            only_message = False

        # Formatting variables for use
        if mark_read != False and mark_read != True:
            mark_read = True

        # Defining route
        route = '/postbased/read_first_unread_message'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback
    
    # Method for reading last unread message
    def read_last_unread_message(self, nickname, only_message=False, mark_read=True):

        # Formatting variables for use
        if only_message != False and only_message != True:
            only_message = False

        # Formatting variables for use
        if mark_read != False and mark_read != True:
            mark_read = True

        # Defining route
        route = '/postbased/read_last_unread_message'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for reading all unread message
    def read_all_unread_messages(self, nickname, only_message=False, mark_read=True):

        # Formatting variables for use
        if only_message != False and only_message != True:
            only_message = False

        # Formatting variables for use
        if mark_read != False and mark_read != True:
            mark_read = True

        # Defining route
        route = '/postbased/read_all_unread_messages'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    
    # Method for reading first unread message from nickname
    def read_first_unread_message_from_nickname(self, nickname,searching_nickname, only_message=False, mark_read=True):

        # Formatting variables for use
        if only_message != False and only_message != True:
            only_message = False

        # Formatting variables for use
        if mark_read != False and mark_read != True:
            mark_read = True

        # Defining route
        route = '/postbased/read_first_unread_message_from_nickname'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
            "searching_nickname": searching_nickname,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback
    
    # Method for reading last unread message from nickname
    def read_last_unread_message_from_nickname(self, nickname,searching_nickname, only_message=False, mark_read=True):

        # Formatting variables for use
        if only_message != False and only_message != True:
            only_message = False

        # Formatting variables for use
        if mark_read != False and mark_read != True:
            mark_read = True

        # Defining route
        route = '/postbased/read_last_unread_message_from_nickname'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
            "searching_nickname": searching_nickname,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback

    # Method for reading all unread message from nickname
    def read_all_unread_messages_from_nickname(self, nickname,searching_nickname, only_message=False, mark_read=True):

        # Formatting variables for use
        if only_message != False and only_message != True:
            only_message = False

        # Formatting variables for use
        if mark_read != False and mark_read != True:
            mark_read = True

        # Defining route
        route = '/postbased/read_all_unread_messages_from_nickname'

        # Defining data content for special that case
        data = {
            "seed": self.seed,
            "password": self.password,
            "nickname": nickname,
            "only_message": only_message,
            "mark_read": mark_read,
            "searching_nickname": searching_nickname,
        }

        # Defining url for fetching
        full_url = f'{self.url}{route}'
        response = None
        feedback = None
        content = None

        # Trying to fetch
        try:
            response = requests.post(full_url, json=data)
            content = response.text
            feedback = content
        except:
            feedback = self.fetch_error_code

        # Returning content
        return feedback