#include <stdlib.h>
#include "dijkstra.c"

int main(void) {
    sem_create(SEM_1, 1);
    return EXIT_SUCCESS;
}