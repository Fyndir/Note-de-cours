#ifndef PILE_H
#define PILE_H

struct maillon* empiler(int, struct maillon*);

struct maillon
	{
		int valeur ;//Valeur dans la chaîne
		struct maillon* suivant;//Pointeur vers la prochaine valeur
		struct maillon** precedent;
	};
int depiler(struct maillon**);
#endif
