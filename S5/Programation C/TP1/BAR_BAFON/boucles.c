#include <stdio.h>

int main(){
  int count = 100;
  int i = count;
  int j ;
  if (count <= 3)
  {
    puts("Valeur incorrecte");
  }
  else
  {
    while (i!=0)
    {
      printf("*");
      i=i-1;
    }
    i = count-1;
    printf("\n");
    while (i!=2)
    {
      j = i-2;
      printf("*");
      while (j!=0)
      {
	printf("#");
	j = j-1;
      }
      printf("*");
      printf("\n");
      i = i-1;
    }
    printf("**");
    printf("\n");
    printf("*");
    printf("\n");
  }
  return 0;
}