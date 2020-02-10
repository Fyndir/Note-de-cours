#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/types.h>
#include <signal.h>

static int testpain=1;

void StopPain()
{
  printf("arret du pain \n");
  testpain=0;

}

int main(void)
{
    signal(SIGINT,StopPain);
    int puid;
    puid=fork();

    if (puid==0)
    {
        while(testpain)
        {
            printf("pain au lait \n");           
        }
    }
    else
    {
        for(int i=0;i<3;i++)
        {
            printf("papa \n");     
            sleep(1);
        }
        kill(puid,SIGINT);
    }
       
    return 0;
}