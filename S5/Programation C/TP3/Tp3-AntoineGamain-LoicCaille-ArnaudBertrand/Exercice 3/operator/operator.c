/*
*Programme  qui utilise trois variables num1 (entier), num2 (entier) et op (un caractère).
*La variable c contient un de ces différents opérateurs. (+, -, *, /, %, &, |, ~).
*Utilisez switch et réutiliser le code de votre premier exercice. Si c’est égal à ‘+’, le programme fait l’addition de deux variables num1 et num2, si c est égal à ‘&’, le programme fait l’opération ET etc.
*Auteurs : Antoine Gamain  Loic Caille Arnaud bertrand
*23/10/2018 initialisation 
*/

#include <stdio.h> //headers
#include "operator.h"
int main()
{
	int num1, num2;
	char op;

	puts("Rentrez l'operateur");
	if(scanf("%c", &op)==0){
		puts("Erreur");
	}
	puts("Rentrez le premier nombre");
	if(scanf("%d", &num1)==0){
		puts("Erreur");
	}
	puts("Rentrez le second nombre");
	if(scanf("%d", &num2)==0){
		puts("Erreur");
	}

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



