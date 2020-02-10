#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/types.h>
#include <signal.h>


void StopPain()
{
  printf("arret du pain \n");
}

int main(void)
{    
    int puid;
    puid=fork();

    if (puid==0)
    {
        signal(SIGINT,StopPain);
        while(1)
        {
            printf("pain au lait \n");   
            sleep(1);        
        }
    }
    else
    {
        for(int i=0;i<5;i++)
        {
            printf("papa \n");     
            sleep(1);   
        }
    }
       
    return 0;
}

// on constate que le pere dispatch ces signaux dans les fils , si le pere se termine avant la fin du fils on ne peux plus envoyer de signaux au fils via la console et on doit utiliser ps -l et kill -9