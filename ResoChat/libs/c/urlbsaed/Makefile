CC = gcc
CFLAGS = -Wall -Wextra -pedantic
LDFLAGS = -lcurl -w

resochat: resochat.c
	$(CC) $(CFLAGS) $^ $(LDFLAGS) -o $@

clean:
	rm -f resochat
