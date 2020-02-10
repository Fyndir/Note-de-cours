#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include "dijkstra.c"

int main(void) {
    sem_delete(SEM_1);
    sem_delete(SEM_2);
    return EXIT_SUCCESS;
}