// Defining static codes for response
extern char empty_code[100];
extern char error_code[100];
extern char success_code[100];
extern char fetch_error_code[100];

// Defining struct which saves room base data
struct Room {
  char *url;
  char *seed;
  char *password;
};

// Function for defining room
struct Room *define_room(char *url, char *seed, char *password);

// Function for checking connection to server
int ping_server(struct Room *room);
// Function for checking if room exists with given seed and password
int room_exists(struct Room *room);


