/*
*Programme qui permet la gestion de 5 étudiants. Pour chaque étudiant, on est intéressé par son nom,  son prénom, son adresse, et ses notes dans 2 modules (Programmation en C, Système d’exploitation).
*Auteurs : Antoine Gamain  Simon Suard
*11/09/2018 initialisation 
*/

#include <stdio.h> //headers
#include <string.h>

int main()
{
	int i = 0;
	char nom[5][32];
	char prenom[5][32];
	char adresse[5][255];
	double note_c[5];
	double note_os[5];

//Initialisation des étudiants

strcpy(nom[0], "Dimitri");
strcpy(prenom[0], "Crackers");
strcpy(adresse[0], "Rue de oui");
note_c[0] = 12.0;
note_os[0] = 13.0;

strcpy(nom[1], "Philipe");
strcpy(prenom[1], "Cobra");
strcpy(adresse[1], "Derrière le rocher");
note_c[1] = 01.0;
note_os[1] = 05.0;

strcpy(nom[2], "Vega");
strcpy(prenom[2], "Vincent");
strcpy(adresse[2], "L.A residence wallace");
note_c[2] = 12.0;
note_os[2] = 13.0;

strcpy(nom[3], "Wayne");
strcpy(prenom[3], "Batman");
strcpy(adresse[3], "Manoire Wayne 122 rue du crime Gotam");
note_c[3] = 19.0;
note_os[3] = 18.0;

strcpy(nom[4], "Jim");
strcpy(prenom[4], "Gordon");
strcpy(adresse[4], "?????");
note_c[4] = 11.0;
note_os[4] = 15.0;

	
//Affichage des informations des étudiants
	for(i = 0; i<=4; i++){
		printf("L'étudiant n°%d :\n", i);
		puts(nom[i]);
		puts(prenom[i]);
		puts(adresse[i]);
		printf("%f \n", note_c[i]);
		printf("%f \n", note_os[i]);
	    printf("\n");
	}
	return 0;
}
