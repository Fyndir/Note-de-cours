#include <stdio.h>

int main(){
  int a = 16;
  float fa = a;
  int b = 3;
  float fb = b;
  float division = a/b;
  int modulo = a%b;
  int soustraction = a - b;
  int somme = a + b;
  int multiplicaton = a*b;
  printf("division : %f", division);
  printf("\n modulo : %d",modulo);
  printf("\n soustraction : %d",soustraction);
  printf("\n somme : %d",somme);
  printf("\n multiplicaton : %d",multiplicaton);
  if (a >= b) {printf ("\n a >= b");} else {printf ("\n b >= a");};
  if (a < b) {printf ("\n a < b");} else {printf ("\n b < a");};
  if (a == b) {printf ("\n a = b");} else {printf ("\n b != a");};
  printf("\n");
  return 0;  
}