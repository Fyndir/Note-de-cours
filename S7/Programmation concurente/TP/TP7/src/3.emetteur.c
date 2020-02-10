#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include "dijkstra.c"

int main(void) {

    printf("Je suis un émetteur et j'arrive\n");
    fflush(stdout);

    P(SEM_1);
    P(SEM_1);

    V(SEM_2);
    V(SEM_2);

    printf("Je suis un émetteur et je pars\n");
    fflush(stdout);
}