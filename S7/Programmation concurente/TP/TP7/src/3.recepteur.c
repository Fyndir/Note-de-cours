#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include "dijkstra.c"

int main(void) {

    V(SEM_1);

    printf("Je suis un récepteur et j'arrive\n");
    fflush(stdout);

    P(SEM_2);

    printf("Je suis un récepteur et je pars\n");
    fflush(stdout);
}