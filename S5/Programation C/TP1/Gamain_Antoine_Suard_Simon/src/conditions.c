/*
*Programme qui utilise les boucles (for, while ou do..while) et les branchements inconditionnels (break ou continue) pour l’affichage de
numéros <= 100 qui sont divisés par : 
a. 2 et 15 
b. 103 ou 107 
c. 7 ou 5, mais pas par 3 
*Auteurs : Antoine Gamain  Simon Suard
*11/09/2018 initialisation 
*/

#include <stdio.h> //headers

int main()
{
	int compteur = 0;
	puts("Nombres de 0 à 1000 divisées par 2 et 15");
	for(compteur = 0; compteur<=1000; compteur++){
		if(compteur%2 == 0 && compteur%15 == 0)
		{
			printf("%d \n", compteur);
		}
	}
	puts("Nombres de 0 à 1000 divisées par 103 ou 107");
	for(compteur = 0; compteur<=1000; compteur++){
		if(compteur%103 == 0 || compteur%107 == 0)
		{
			printf("%d \n", compteur);
		}
	}
	puts("Nombres de 0 à 1000 divisées par 7 ou 5, mais pas par 3");
	for(compteur = 0; compteur<=1000; compteur++){
		if((compteur%7 == 0 || compteur%5 == 0) && compteur%3 != 0)
		{
			printf("%d \n", compteur);
		}
	}
	return 0;
}
