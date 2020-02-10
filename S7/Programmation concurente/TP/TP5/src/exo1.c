#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <time.h> 
#include <limits.h> 


int GenerationNombre()
{
    int i = rand();    
    return i;
}

int main(int argc, char * argv[]) 
{
    int TubeFinal[2];
    int Tube1[2];
    pipe(TubeFinal);
    pipe(Tube1);
    int puid;
    int nbprecedent=INT_MIN;
    int nbgrand;
    int i;
    for( i=-1;i<atoi(argv[1]);i++)
    {
        if((puid=fork())==0)
        {
            srand(getpid());
                read(Tube1[0],&nbprecedent,sizeof(int));                         
        }
        else
        {     
            int rdm = GenerationNombre();

            printf("%d \n",rdm);
            if (nbprecedent<rdm)
            {
                   write(Tube1[1],&rdm,sizeof(int));
            }
            else
            {
                  write(Tube1[1],&nbprecedent,sizeof(int));
            }
         
            break;
        }

    }
     if (i==0)
     {
          read(TubeFinal[0],&nbgrand,sizeof(int));
          printf("%d \n",nbgrand);
     }
     if (i==atoi(argv[1]))
     {
             write(TubeFinal[1],&nbprecedent,sizeof(int));
     }

}