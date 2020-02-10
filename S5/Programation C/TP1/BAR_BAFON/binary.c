#include <stdio.h>
#include <math.h>

int main()
{
  double i = 16;
  int decimal = 0 ;
  double power;
  double DEUX = 2;
  
  printf("\n");
  while (i>=0)
  {
    power = pow(DEUX,i);
    if (decimal >= power)
    {
      decimal = decimal - power;
      printf("1");
    }
    else
    {
      printf("0");
    }
    i = i-1;
  }
  printf("\n");
  return 0;
}