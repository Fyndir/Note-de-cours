#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

void StopPain()
{
    printf("arret du pain \n");
    exit(0);

}


int main(void)
{

    signal(SIGINT,StopPain);
    while(1)
        {
            printf("pain au lait \n");
            sleep(1);
        }
    return 0;
}