#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include "dijkstra.c"

int main(void) {
    P(SEM_1);

    printf("Tache 1, début...\n");
    sleep(2);
    printf("Tache 1, fin...\n");

    V(SEM_1);
    return EXIT_SUCCESS;
}