#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

static int testpain=1;

void StopPain()
{
  printf("arret du pain \n");
  testpain=0;

}


int main(void)
{
    signal(SIGINT,StopPain);

    while(testpain)
        {
            printf("pain au lait \n");
            sleep(1);
        }
    return 0;
}