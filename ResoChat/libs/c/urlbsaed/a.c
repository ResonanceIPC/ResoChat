#include <stdio.h>
#include "resochat.h"

int main(void) {
    printf("dsasdf %s", error_code);
    struct Room* room = define_room("http://127.0.0.1:2419", "eva", "rivas");
    printf("%i", room_exists(room));
    return 0;
}