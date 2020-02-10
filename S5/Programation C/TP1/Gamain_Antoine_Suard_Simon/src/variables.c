/*
*Programme qui affecte et affiche les valeurs des variables de 
différents types de base : char, short, int, long int, long long int, float, double, long double. 
*Auteurs : Antoine Gamain  Simon Suard
*11/09/2018 initialisation 
*/

#include <stdio.h> //headers

int main()
{
	char c = 'a';
	unsigned char uc = 65;
	short s = 1;
	unsigned short us = 1;
	int i = 1;
	unsigned short ui = 1;
	long int li = 1;
	unsigned long int uli = 1;
	long long int lli = 1;
	unsigned long long int ulli = 1;
	float f = 1.0f;
	double d = 1.0;
	long double ld = 1.0;

  	printf("Affichage d'un char : %c \n", c);
	printf("Affichage d'un unsigned char : %c \n", uc);
	printf("Affichage d'un short : %d \n", s);
	printf("Affichage d'un unsigned short : %d \n", us);
 	printf("Affichage d'un int : %d \n", i);
	printf("Affichage d'un unsigned int : %d \n", ui);
	printf("Affichage d'un long int : %ld \n", li);
	printf("Affichage d'un unsigned long int : %ld \n", uli);
	printf("Affichage d'un long long int : %lld \n", lli);
	printf("Affichage d'un unsigned long long int : %lld \n", ulli);
	printf("Affichage d'un float : %f \n", f);
	printf("Affichage d'un double : %f \n", d);
	printf("Affichage d'un long double : %LG \n", ld);

   	return 0;	  
}
