#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include "dijkstra.c"

int main(void) {
    V(SEM_2);
    V(SEM_3);
    P(SEM_1);
    P(SEM_1);

    printf("Tache 1\n");

    return EXIT_SUCCESS;
}