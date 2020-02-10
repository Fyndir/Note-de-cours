#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/types.h>
#include <signal.h>

void Perdu()
{
    printf("Perdu !!!!\n");
    exit(0);
}

int main(void)
{        
    int puid;
    printf("Tape un entier \n");
    puid=fork();    
    if (puid==0)
    {  
        sleep(5); 
        kill(getppid(),SIGUSR2);                   
    }   
    else
    {
        signal(SIGUSR2,Perdu);


        int entier;   
        while(1)
        {
            int result=  scanf("%d",&entier);
            if(result==1)
                {
                       printf("Gagner !!!!\n");                       
                       exit(0);
                }
                while(getchar()!= '\n');
        }   
        
    }

    return 0;
}
