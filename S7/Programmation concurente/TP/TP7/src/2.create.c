#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include "dijkstra.c"

int main(void) {
    sem_create(SEM_1, 0);
    sem_create(SEM_2, 0);
    sem_create(SEM_3, 0);
    return EXIT_SUCCESS;
}