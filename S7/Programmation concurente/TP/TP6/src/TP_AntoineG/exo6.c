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

void DisplayPain()
{  
  printf("pain au lait \n");          
}

void KillFils()
{  
  exit(1);
}

int main(void)
{    
    int puid;
    puid=fork();

    if (puid==0)
    {
        signal(SIGUSR1,DisplayPain);
        signal(SIGUSR2,KillFils);
        while(1);
    }
    else
    {
        for(int i=0;i<5;i++)
        {
            printf("papa \n");  
            if (i== 3)
                {
                    kill(puid,SIGUSR1);
                }   
            if (i== 5)
                {
                    kill(puid,SIGUSR2);
                }   
            sleep(1);   
        }
    }
       
    return 0;
}
