Code de Antoine Gamain

# Signaux sur linux 

 Ecrire un programme qui réalise un affichage dans une boucle infinie, mais qui prévoit de s'arrêter à la réception du signal SIGINT. La fonction d'interception affichera un message signalant la réception du signal avant de terminer le programme par un appel exit( ). 

## Exo 1 :

```c
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
```

## Exo 2 :


 Modifier le programme précédent pour qu'il ignore le signal SIGINT. 

```c
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
    signal(SIGINT,SIG_IGN);

    while(1)
        {
            printf("pain au lait \n");
            sleep(1);
        }
    return 0;
}
```

## Exo 3

Modifiez le programme précédent pour qu'il fasse son affichage dans une boucle conditionnée par une variable booléenne fin initialisée à faux et qui sera mise à vrai par la fonction d'interception du signal. 

```c
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
```

## Exo 4 :

Ecrire un programme composé de 2 processus : Le père fait des affichages toutes les secondes dans une boucle for et le fils fait des affichages toutes les secondes aussi mais dans une boucle infinie, quand le compteur de boucle du père arrive à 3, le père envoie un signal SIGKILL au fils. On a constaté dans l'exercice 2, l'impossibilité d'ignorer ce signal. 

```c
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

```

## Exo 5

Modifier pour que le père n'envoie plus de signal au fils mais que le fils intercepte tous les SIGINT en affichant un message d'interception. 

```c
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

```

> on constate que le pere dispatch ces signaux dans les fils , si le pere se termine avant la fin du fils on ne peux plus envoyer de signaux au fils via la console et on doit utiliser ps -l et kill -9

## Exo6

Reprendre le programme de l'exercice précédent et le modifier pour que le fils ne fasse ses affichages qu'à la réception du signal SIGUSR1. Le père envoie ce signal dans son itération 3 et dans son itération 5. Il signale la fin du traitement au fils par envoi du signal SIGUSR2. Il n'y aura qu'une seule fonction d'interception dans le fils, elle recevra le numéro du signal déclencheur en paramètre. 


```c

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

```

## Exo 7 :

Ecrire un programme qui demande à l'utilisateur de taper au clavier un entier en moins de 5 secondes. Pour cela, votre programme ne doit pas "planter" si ce qu'il lit n'est pas un entier. Il devra donc lire une chaîne et tenter de la convertir en un entier, si c'est bon il se terminera après avoir désarmé le time out, sinon il recommencera éventuellement jusqu'aux 5 secondes où il affichera "trop tard" avant de s'arrêter. 

```c

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

```
