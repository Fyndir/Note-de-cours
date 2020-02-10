/*
*Programme  qui utilise for, # et * et qui affiche un triangle rectangle.
*Auteurs : Antoine Gamain  Simon Suard
*11/09/2018 initialisation 
*/

#include <stdio.h> //headers

int main()
{
	int i = 0;
	int j = 0;
	int taille = 0;
	do{
		puts("Entrez la taille du triangle, minimum 5 inclus");
		scanf("%d", &taille);
	}while(taille<5);
	/*on print les premieres et dernieres lignes*/
	taille-=2;
	printf("* \n");
	for(i=0; i < taille; i++)
	{
		printf("*");

		for(j=0; j <= -1+i; j++)
			{
				printf("#");
			}	
		printf("* \n")	;
	
	}
/*on affiche la derniere ligne*/
	for(j=0; j < i+2; j++)
		{
 			printf("*");
		}
	printf("\n");
				
	return 0;
}
