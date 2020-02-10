/*
 Ligne de commande qui fait des opérations en fonction des parametres 
 * Auteurs : Antoine Gamain  Loic Caille Arnaud bertrand
*23/10/2018 initialisation 
*/

#include <stdio.h>
#include <stdlib.h>
#include "operator.h"

int main(int argc, char *argv[]){
  
  if(argc == 4){
  
    char op = (char) *argv[2];
    int num1 = atoi(argv[1]);
    int num2 = atoi(argv[3]);
    
    switch(op){
      case '+' :
	printf("%d + %d = %d \n" , num1,num2,Add(num1,num2));
	break;

      case '-' :
	printf("%d - %d = %d \n" , num1,num2,Substract(num1,num2));
	break;

      case '*' :
	printf("%d * %d = %d \n" , num1,num2,Mult(num1,num2));
	break;

      case '/' :
	printf("%d / %d = %f \n" , num1,num2,Divide(num1,num2));
	break;

      case '%' :
	printf("%d mod %d = %d \n" , num1,num2,Mod(num1,num2));
	break;

      case '&' :
	printf("%d && %d = %d \n" , num1,num2,And(num1,num2));
	break;

      case '|' :
	printf("%d || %d = %d \n" , num1,num2,Or(num1,num2));
	break;

      default :
	puts("Erreur dans les données rentrées par l'utilisateur");
	break;
    }
    
  } else {
    printf("Vous avez rentré %d arguments, vous devez en rentrer 3", (argc-1));
  }
  
  return 0;
}

int Add(int num1,int num2)
{
 return num1+num2; 
}

int Substract(int num1,int num2)
{
 return num1-num2; 
}

int Mult(int num1,int num2)
{
  return num1*num2;
}

float Divide(int num1,int num2)
{
  return (float)num1/(float)num2;
}

int Mod(int num1,int num2)
{
 return num1%num2; 
}

int And(int num1,int num2)
{
 return num1&&num2; 
}

int Or(int num1,int num2)
{
 return num1||num2;  
}