/*
*Programme qui utilise for pour l’affichage d’une variable int en format binaire.
*Auteurs : Antoine Gamain  Simon Suard
*11/09/2018 initialisation 
*/

#include <stdio.h> //headers
#include <math.h> //headers

int main()
{
int  entier;
int i;

printf("Saisir l'entier a convertir en binaire : \n");
scanf("%d",&entier);
	

for (i=31;i>=0;i--)
{
	if(entier>=pow(2.0,i))
		{
			printf("1");
			entier-=pow(2.0,i);
		}
	else
		{
			printf("0");
		}

}
printf("\n");





return 0;
}
