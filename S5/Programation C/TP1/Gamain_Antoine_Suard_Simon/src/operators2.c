/*
*Programme  qui utilise trois variables num1 (entier), num2 (entier) et op (un caractère). La variable c contient un de ces différents opérateurs. (+, -, *, /, %, &, |, ~). Utilisez switch et réutiliser le code de votre premier exercice. Si c’est égal à ‘+’, le programme fait l’addition de deux variables num1 et num2, si c est égal à ‘&’, le programme fait l’opération ET etc.
*Auteurs : Antoine Gamain  Simon Suard
*11/09/2018 initialisation 
*/

#include <stdio.h> //headers

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
	printf("%d + %d = %d \n" , num1,num2,(num1+num2));
	break;
	
	case '-' :
	printf("%d - %d = %d \n" , num1,num2,(num1-num2));
	break;

	case '*' :
	printf("%d * %d = %d \n" , num1,num2,(num1*num2));
	break;

	case '/' :
	printf("%d / %d = %d \n" , num1,num2,(num1/num2));
	break;

	case '%' :
	printf("%d mod %d = %d \n" , num1,num2,(num1 % num2));
	break;

	case '&' :
	printf("%d && %d = %d \n" , num1,num2,(num1&&num2));
	break;

	case '|' :
	printf("%d || %d = %d \n" , num1,num2,(num1||num2));
	break;

	case '~' :
	printf("~%d = %d \n" , num1, ~num1);
	break;

	default :
	puts("Erreur dans les données rentrées par l'utilisateur");
	break;
}
	return 0;
}
