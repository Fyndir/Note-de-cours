#include <stdio.h>
#include <stdlib.h>
#include "pile.h"


struct maillon* empiler(int entier, struct maillon* tete)
	{
		struct maillon* nouveau = malloc(sizeof(struct maillon)); //Alloue une place pour un maillon et créé un pointeur nouveau vers cette place
		(*nouveau).valeur = entier;//On attribue la valeur voulue dans le nouveau maillon
		(*nouveau).suivant = tete;//On assigne l'adresse de ce mailon au élément "suivant" du maillon précédent
		return nouveau;
	}

int depiler(struct maillon** tete){

	int valeur;
	struct maillon* nouveau = (*tete).suivant;
	valeur = (*nouveau).valeur;
	free(nouveau);
	return valeur;
}


int main()
{
int valeur_depilee;
struct maillon* premier_maillon=NULL;
premier_maillon = empiler(3,premier_maillon);
printf("La première valeur de la chaîne est : %d \n",(*premier_maillon).valeur);
printf("La seconde valeur de la chaîne est : %d \n",(*(*premier_maillon).suivant).valeur);
valeur_depilee = depiler(premier_maillon);
printf("La valeur depilée de la dernière case est : %d \n",valeur_depilee);
return 0;
}
