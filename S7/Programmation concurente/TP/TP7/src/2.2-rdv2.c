#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include "dijkstra.c"

int main(void) {
    V(SEM_1);
    V(SEM_3);
    P(SEM_2);
    P(SEM_2);

    printf("Tache 2\n");

    return EXIT_SUCCESS;
}