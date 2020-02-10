#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main()
{
  int tint[10];
  float tfloat[10];
  int *pint = &tint[0];
  float *pfloat = &tfloat[0];
  srand(time(NULL));
  int i;
  for (i=0;i<10;i++)
  {
    if (i%2 == 0)
    {
    *(pint + i) =  (rand()%10000000)*3;
    *(pfloat + i) = (rand()%10000000)*3;
    printf("Valeur multipliée par 3 car rang n° %d \n",i);
    }     
    else
    { 
    *(pint + i) =  rand()%10000000;
    *(pfloat + i) =  rand()%10000000;  
    }
    printf("La valeur n° %d du tableau d'entier est %d \n",i,*(pint+i));
    printf("La valeur n° %d du tableau de float est %f \n",i,*(pfloat+i));
  }
return 0;
}