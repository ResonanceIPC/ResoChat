#include <curl/curl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ADDSLASH(route) strcat(route, "/")
#define ADDPARAMETER(route, parameter) strcat(route, parameter)

#define REPLACE_SPECIAL_CHARACTERS(parameter, parameter_formatted)             \
  do {                                                                         \
    int index = 0;                                                             \
    for (int i = 0; (parameter)[i] != '\0'; i++) {                             \
      if ((parameter)[i] == ' ') {                                             \
        (parameter_formatted)[index++] = '%';                                  \
        (parameter_formatted)[index++] = '2';                                  \
        (parameter_formatted)[index++] = '0';                                  \
      } else if ((parameter)[i] == '/') {                                      \
        (parameter_formatted)[index++] = '%';                                  \
        (parameter_formatted)[index++] = '2';                                  \
        (parameter_formatted)[index++] = 'F';                                  \
      } else if ((parameter)[i] == '?') {                                      \
        (parameter_formatted)[index++] = '%';                                  \
        (parameter_formatted)[index++] = '3';                                  \
        (parameter_formatted)[index++] = 'F';                                  \
      } else if ((parameter)[i] == '&') {                                      \
        (parameter_formatted)[index++] = '%';                                  \
        (parameter_formatted)[index++] = '2';                                  \
        (parameter_formatted)[index++] = '6';                                  \
      } else if ((parameter)[i] == '#') {                                      \
        (parameter_formatted)[index++] = '%';                                  \
        (parameter_formatted)[index++] = '2';                                  \
        (parameter_formatted)[index++] = '3';                                  \
      } else if ((parameter)[i] == '%') {                                      \
        (parameter_formatted)[index++] = '%';                                  \
        (parameter_formatted)[index++] = '2';                                  \
        (parameter_formatted)[index++] = '5';                                  \
      } else {                                                                 \
        (parameter_formatted)[index++] = (parameter)[i];                       \
      }                                                                        \
    }                                                                          \
    (parameter_formatted)[index] = '\0';                                       \
  } while (0)

char empty_code[100];
char error_code[100];
char success_code[100];
char fetch_error_code[100];

size_t write_callback(void *contents, size_t size, size_t nmemb, void *userp) {
  size_t total_size = size * nmemb;
  char *data = (char *)contents;
  printf("\nMOZG\n\n %s \n\nMOZG\n", data);
  // Copy the received data to the user-provided buffer
  memcpy(userp, data, total_size);

  return total_size;
}

char *get_html_content(const char *url) {
  CURL *curl;
  CURLcode res;
  char *content = NULL;

  curl = curl_easy_init();
  if (curl) {
    curl_easy_setopt(curl, CURLOPT_URL, url);

    // Create a buffer to store the received data
    char buffer[16384] = {0};

    // Set the write callback function
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);

    // Pass the buffer as the user-defined pointer to the callback
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, buffer);

    // Perform the request
    res = curl_easy_perform(curl);
    // if (res != CURLE_OK) {
    //   return fetch_error_code;
    // }
    
    // Allocate memory for the content and copy the buffer data
    content = malloc(strlen(buffer) + 1);
    if (content) {
      strcpy(content, buffer);
    }

    // Always cleanup
    curl_easy_cleanup(curl);
  }
  printf("\n\nCONTENT\n\n %s \n\nCONTENT\n\n", content);
  return content;
}

// Defining static codes for response
char empty_code[100] = "(:~empty~:)";
char error_code[100] = "(:~error~:)";
char success_code[100] = "(:~success~:)";
char fetch_error_code[100] = "(:~fetcherror~:)";

// Defining Room struct which will save Room data for connecting to it
struct Room {
  char *url;
  char *seed;
  char *password;
};

// ******************* Functions for working with room *******************

// Function for defining room
struct Room *define_room(char *url, char *seed, char *password) {

  // Creating room struct and allocating memory for it
  struct Room *room = malloc(sizeof(struct Room));

  // Setupping base arguments of struct
  room->url = url;
  room->seed = seed;
  room->password = password;

  // Returning pointer to room
  return room;
}

// Function for checking connection to server
// 1 - if server is up  0 - if server is unaccessible
int ping_server(struct Room *room) {

  // Defining route for fetching
  char route[100] = "/test/ping";

  // Defining full url
  char full_url[10000];
  strcpy(full_url, room->url);
  strcat(full_url, route);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);
  
  // Formatting content
  int feedback;
  if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = 0;
  } else if (strcmp(html_content, "2419") == 0) {
    feedback = 1;
  } else {
    feedback = 0;
  }

  // Returning feedback
  return feedback;
}

// Function for checking if room exists with given seed and password
// 1 - if room exists  0 - if room does not exist
int room_exists(struct Room *room) {

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/exists/%s/%s", room->seed, room->password);

  // Defining full url
  char full_url[10000];
  strcpy(full_url, room->url);
  strcat(full_url, route);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  int feedback;
  if (strcmp(html_content, "true") == 0) {
    feedback = 1;
  } else {
    feedback = 0;
  }

  // Returning feedback
  return feedback;
}

// Function for creating room with given seed and password
char *create_room(struct Room *room, char *name, char *description) {

  // Formatting variables
  char name_formatted[10000];
  char description_formatted[10000];
  if (name != 0) {
    REPLACE_SPECIAL_CHARACTERS(name, name_formatted);
  }
  if (description != 0) {
    REPLACE_SPECIAL_CHARACTERS(description, description_formatted);
  }

  // Defining route for fetching
  char route[10000];
  if (name == 0) {
    sprintf(route, "/urlbased/create/%s/%s", room->seed, room->password);
  } else {
    if (description == 0) {
      sprintf(route, "/urlbased/create/%s/%s/%s", room->seed, room->password,
              name_formatted);
    } else {
      sprintf(route, "/urlbased/create/%s/%s/%s/%s", room->seed, room->password,
              name_formatted, description_formatted);
    }
  }

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for chaging room name
char *change_room_name(struct Room *room, char *name) {

  // Formatting variables
  char name_formatted[10000];
  if (name != 0) {
    REPLACE_SPECIAL_CHARACTERS(name, name_formatted);
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/change_name/%s/%s/%s", room->seed, room->password,
          name_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for chaging room description
char *change_room_description(struct Room *room, char *description) {

  // Formatting variables
  char description_formatted[10000];
  if (description != 0) {
    REPLACE_SPECIAL_CHARACTERS(description, description_formatted);
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/change_description/%s/%s/%s", room->seed,
          room->password, description_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for updating room data
char *update_room_data(struct Room *room, char *name, char *description) {

  // Formatting variables
  char name_formatted[10000];
  char description_formatted[10000];
  if (name != 0) {
    REPLACE_SPECIAL_CHARACTERS(name, name_formatted);
  }
  if (description != 0) {
    REPLACE_SPECIAL_CHARACTERS(description, description_formatted);
  }

  // Defining route for fetching
  char route[10000];
  if (name == 0) {
    sprintf(route, "/urlbased/update_data/%s/%s", room->seed, room->password);
  } else {
    if (description == 0) {
      sprintf(route, "/urlbased/update_data/%s/%s/%s", room->seed,
              room->password, name_formatted);
    } else {
      sprintf(route, "/urlbased/update_data/%s/%s/%s/%s", room->seed,
              room->password, name_formatted, description_formatted);
    }
  }

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for chaging room seed
char *change_room_seed(struct Room *room, char *seed) {

  // Formatting variables
  char seed_formatted[10000];
  if (seed != 0) {
    REPLACE_SPECIAL_CHARACTERS(seed, seed_formatted);
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/change_seed/%s/%s/%s", room->seed, room->password,
          seed_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Updating crucial variables
  if (feedback == success_code) {
    room->seed = seed;
  }

  // Returning feedback
  return feedback;
}

// Function for chaging room password
char *change_room_password(struct Room *room, char *password) {

  // Formatting variables
  char password_formatted[10000];
  if (password != 0) {
    REPLACE_SPECIAL_CHARACTERS(password, password_formatted);
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/change_password/%s/%s/%s", room->seed,
          room->password, password_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Updating crucial variables
  if (feedback == success_code) {
    room->password = password;
  }

  // Returning feedback
  return feedback;
}

// Function for enabling room
char *enable_room(struct Room *room) {

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/enable/%s/%s", room->seed, room->password);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for disabling room
char *disable_room(struct Room *room) {

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/disable/%s/%s", room->seed, room->password);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for destroying room
char *destroy_room(struct Room *room) {

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/destroy/%s/%s", room->seed, room->password);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for clearing nicknames
char *clear_nicknames_in_room(struct Room *room) {

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/clear_nicknames/%s/%s", room->seed, room->password);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for setupping nickname in room
char *setup_nickname_in_room(struct Room *room, char *nickname) {

  // Formatting variables
  char nickname_formatted[10000];
  if (nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(nickname, nickname_formatted);
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/setup_nickname/%s/%s/%s", room->seed,
          room->password, nickname_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for sending message
char *send_message_in_room(struct Room *room, char *nickname, char *message,
                           int mark_read) {

  // Formatting variables
  char nickname_formatted[10000];
  char message_formatted[10000];
  if (nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(nickname, nickname_formatted);
  }
  if (message != 0) {
    REPLACE_SPECIAL_CHARACTERS(message, message_formatted);
  }

  // Formatting mark_read to right way
  char mark_read_formatted[6] = "true";
  if (mark_read == 0) {
    strcpy(mark_read_formatted, "false");
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/send_message/%s/%s/%s/%s/%s", room->seed,
          room->password, nickname_formatted, message_formatted,
          mark_read_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);
  printf("%s", full_url);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for clearing messages
char *clear_messages_in_room(struct Room *room) {

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/clear_messages/%s/%s", room->seed, room->password);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for marking next as read for nickname
char *mark_next_as_read_in_room(struct Room *room, char *nickname) {

  // Formatting variables
  char nickname_formatted[10000];
  if (nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(nickname, nickname_formatted);
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/mark_next_as_read/%s/%s/%s", room->seed,
          room->password, nickname_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for marking next as read for nickname
char *mark_all_as_read_in_room(struct Room *room, char *nickname) {

  // Formatting variables
  char nickname_formatted[10000];
  if (nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(nickname, nickname_formatted);
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/mark_all_as_read/%s/%s/%s", room->seed,
          room->password, nickname_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else {
    feedback = error_code;
  }

  // Returning feedback
  return feedback;
}

// Function for getting room data
char *get_room_data(struct Room *room) {

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/get_room_data/%s/%s", room->seed, room->password);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else if (strcmp(html_content, error_code) == 0) {
    feedback = error_code;
  } else {
    feedback = html_content;
  }

  // Returning feedback
  return feedback;
}

// Function for getting all messages from room
char *get_all_messages(struct Room *room, int only_message) {

  // Formatting only_message to right way
  char only_message_formatted[6] = "true";
  if (only_message == 0) {
    strcpy(only_message_formatted, "false");
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/get_all_messages/%s/%s/%s", room->seed,
          room->password, only_message_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else if (strcmp(html_content, error_code) == 0) {
    feedback = error_code;
  } else {
    feedback = html_content;
  }

  // Returning feedback
  return feedback;
}

// Function for getting last n messages from room
char *get_last_n_messages(struct Room *room, int n, int only_message) {

  // Formatting only_message to right way
  char only_message_formatted[6] = "true";
  if (only_message == 0) {
    strcpy(only_message_formatted, "false");
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/get_last_n_messages/%s/%s/%i/%s", room->seed,
          room->password, n, only_message_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else if (strcmp(html_content, error_code) == 0) {
    feedback = error_code;
  } else {
    feedback = html_content;
  }

  // Returning feedback
  return feedback;
}

// Function for reading first unread message
char *read_first_unread_message_in_room(struct Room *room, char *nickname,
                                        int only_message, int mark_read) {

  // Formatting variables
  char nickname_formatted[10000];
  if (nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(nickname, nickname_formatted);
  }

  // Formatting only_message to right way
  char only_message_formatted[6] = "true";
  if (only_message == 0) {
    strcpy(only_message_formatted, "false");
  }

  // Formatting mark_read to right way
  char mark_read_formatted[6] = "true";
  if (mark_read == 0) {
    strcpy(mark_read_formatted, "false");
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/read_first_unread_message/%s/%s/%s/%s/%s",
          room->seed, room->password, nickname_formatted,
          only_message_formatted, mark_read_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else if (strcmp(html_content, error_code) == 0) {
    feedback = error_code;
  } else {
    feedback = html_content;
  }

  // Returning feedback
  return feedback;
}

// Function for reading last unread message
char *read_last_unread_message_in_room(struct Room *room, char *nickname,
                                       int only_message, int mark_read) {

  // Formatting variables
  char nickname_formatted[10000];
  if (nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(nickname, nickname_formatted);
  }

  // Formatting only_message to right way
  char only_message_formatted[6] = "true";
  if (only_message == 0) {
    strcpy(only_message_formatted, "false");
  }

  // Formatting mark_read to right way
  char mark_read_formatted[6] = "true";
  if (mark_read == 0) {
    strcpy(mark_read_formatted, "false");
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/read_last_unread_message/%s/%s/%s/%s/%s",
          room->seed, room->password, nickname_formatted,
          only_message_formatted, mark_read_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else if (strcmp(html_content, error_code) == 0) {
    feedback = error_code;
  } else {
    feedback = html_content;
  }

  // Returning feedback
  return feedback;
}

// Function for reading all unread message
char *read_all_unread_messages_in_room(struct Room *room, char *nickname,
                                       int only_message, int mark_read) {

  // Formatting variables
  char nickname_formatted[10000];
  if (nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(nickname, nickname_formatted);
  }

  // Formatting only_message to right way
  char only_message_formatted[6] = "true";
  if (only_message == 0) {
    strcpy(only_message_formatted, "false");
  }

  // Formatting mark_read to right way
  char mark_read_formatted[6] = "true";
  if (mark_read == 0) {
    strcpy(mark_read_formatted, "false");
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route, "/urlbased/read_all_unread_messages/%s/%s/%s/%s/%s",
          room->seed, room->password, nickname_formatted,
          only_message_formatted, mark_read_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else if (strcmp(html_content, error_code) == 0) {
    feedback = error_code;
  } else {
    feedback = html_content;
  }

  // Returning feedback
  return feedback;
}

// Function for reading first unread message from nickname
char *read_first_unread_message_from_nickname_in_room(struct Room *room,
                                                      char *nickname,
                                                      char *searching_nickname,
                                                      int only_message,
                                                      int mark_read) {

  // Formatting variables
  char nickname_formatted[10000];
  char searching_nickname_formatted[10000];
  if (nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(nickname, nickname_formatted);
  }
  if (searching_nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(searching_nickname,
                               searching_nickname_formatted);
  }

  // Formatting only_message to right way
  char only_message_formatted[6] = "true";
  if (only_message == 0) {
    strcpy(only_message_formatted, "false");
  }

  // Formatting mark_read to right way
  char mark_read_formatted[6] = "true";
  if (mark_read == 0) {
    strcpy(mark_read_formatted, "false");
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route,
          "/urlbased/read_first_unread_message_from_nickname/%s/%s/%s/%s/%s/%s",
          room->seed, room->password, nickname_formatted,
          searching_nickname_formatted, only_message_formatted,
          mark_read_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else if (strcmp(html_content, error_code) == 0) {
    feedback = error_code;
  } else {
    feedback = html_content;
  }

  // Returning feedback
  return feedback;
}

// Function for reading last unread message from nickname
char *read_last_unread_message_from_nickname_in_room(struct Room *room,
                                                     char *nickname,
                                                     char *searching_nickname,
                                                     int only_message,
                                                     int mark_read) {

  // Formatting variables
  char nickname_formatted[10000];
  char searching_nickname_formatted[10000];
  if (nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(nickname, nickname_formatted);
  }
  if (searching_nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(searching_nickname,
                               searching_nickname_formatted);
  }

  // Formatting only_message to right way
  char only_message_formatted[6] = "true";
  if (only_message == 0) {
    strcpy(only_message_formatted, "false");
  }

  // Formatting mark_read to right way
  char mark_read_formatted[6] = "true";
  if (mark_read == 0) {
    strcpy(mark_read_formatted, "false");
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route,
          "/urlbased/read_last_unread_message_from_nickname/%s/%s/%s/%s/%s/%s",
          room->seed, room->password, nickname_formatted,
          searching_nickname_formatted, only_message_formatted,
          mark_read_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else if (strcmp(html_content, error_code) == 0) {
    feedback = error_code;
  } else {
    feedback = html_content;
  }

  // Returning feedback
  return feedback;
}

// Function for reading all unread message from nickname
char *read_all_unread_messages_from_nickname_in_room(struct Room *room,
                                                     char *nickname,
                                                     char *searching_nickname,
                                                     int only_message,
                                                     int mark_read) {

  // Formatting variables
  char nickname_formatted[10000];
  char searching_nickname_formatted[10000];
  if (nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(nickname, nickname_formatted);
  }
  if (searching_nickname != 0) {
    REPLACE_SPECIAL_CHARACTERS(searching_nickname,
                               searching_nickname_formatted);
  }

  // Formatting only_message to right way
  char only_message_formatted[6] = "true";
  if (only_message == 0) {
    strcpy(only_message_formatted, "false");
  }

  // Formatting mark_read to right way
  char mark_read_formatted[6] = "true";
  if (mark_read == 0) {
    strcpy(mark_read_formatted, "false");
  }

  // Defining route for fetching
  char route[10000];
  sprintf(route,
          "/urlbased/read_all_unread_messages_from_nickname/%s/%s/%s/%s/%s/%s",
          room->seed, room->password, nickname_formatted,
          searching_nickname_formatted, only_message_formatted,
          mark_read_formatted);

  // Defining full url
  char full_url_unformatted[100000];
  strcpy(full_url_unformatted, room->url);
  strcat(full_url_unformatted, route);

  // Formatting full url
  char full_url[100000];
  strcpy(full_url, full_url_unformatted);

  // Requesting html code of url
  char *html_content = get_html_content(full_url);

  // Formatting content
  char *feedback;
  if (strcmp(html_content, success_code) == 0) {
    feedback = success_code;
  } else if (strcmp(html_content, fetch_error_code) == 0) {
    feedback = fetch_error_code;
  } else if (strcmp(html_content, error_code) == 0) {
    feedback = error_code;
  } else {
    feedback = html_content;
  }

  // Returning feedback
  return feedback;
}

int main() {
  struct Room* room = define_room("http://127.0.0.1:2419", "effdgvaaaaaaa", "rivas");
    printf("%i", room_exists(room));
    printf("%s", get_all_messages(room, 0));
    return 0;
}