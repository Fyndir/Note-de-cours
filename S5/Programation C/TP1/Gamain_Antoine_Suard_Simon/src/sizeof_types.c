/*
*Programme qui affiche la taille de différents types de base 
(en octets) : char, short, int, long int, long long
 int, float, double, long double
*Auteurs : Antoine Gamain  Simon Suard
*11/09/2018 initialisation 
*/

#include <stdio.h> //headers

int main()
{
  	printf("Taille d'un char : %lu octet\n", sizeof(char));
	printf("Taille d'un unsigned char : %lu octet\n", sizeof(unsigned char));
	printf("Taille d'un short : %lu octets\n", sizeof(short));
	printf("Taille d'un unsigned short : %lu octets\n", sizeof(unsigned short));
 	printf("Taille d'un int : %lu octets\n", sizeof(int));
	printf("Taille d'un unsigned int : %lu octets\n", sizeof(unsigned int));
	printf("Taille d'un long int : %lu octets\n", sizeof(long int));
	printf("Taille d'un unsigned long int : %lu octets\n", sizeof(unsigned long int));
	printf("Taille d'un long long int : %lu octets\n", sizeof(long long int));
	printf("Taille d'un unsigned long long int : %lu octets\n", sizeof(unsigned long long int));
	printf("Taille d'un float : %lu octets\n", sizeof(float));
	printf("Taille d'un double : %lu octets\n", sizeof(double));
	printf("Taille d'un long double : %lu octets\n", sizeof(long double));

   	return 0;	  
}
