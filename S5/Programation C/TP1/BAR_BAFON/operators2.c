#include <stdio.h>

int main(){
  int num1 = 16;
  float fnum1 = num1;
  int num2 = 3;
  float fnum2 = num2;
  char op = '~';
  
  float division = fnum1/fnum2;
  int modulo = num1%num2;
  int soustraction = num1 - num2;
  int somme = num1 + num2;
  int multiplication = num1*num2;
  int negation1 = ~num1;
  int negation2 = ~num2;
  int ET = num1 & num2;
  int OR = num1 | num2; 
  
  
  switch (op)
  {
    case '+' :  printf("\n somme : %d",somme);
    break;
    case '-' :  printf("\n soustraction : %d",soustraction);
    break;
    case '*' :  printf("\n multiplicaton : %d",multiplication);
    break;
    case '/' :  printf("\n division : %f", division);
    break;
    case '%' :  printf("\n modulo : %d",modulo);
    break;
    case '&' :  printf("\n ET logique : %d",ET);
    break;
    case '|' :  printf("\n OR logique : %d",OR);
    break;
    case '~' :  printf("\n negation de num1 : %d",negation1);
		printf("\n negation de num2 : %d",negation2);
    break;
  }
  printf("\n");
  return 0;  
}