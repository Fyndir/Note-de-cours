/*
* Ligne de commande calcule des factoriels
* Auteurs : Antoine Gamain  Loic Caille 
* 06/11/2018 initialisation 
*/


#include <stdio.h>
#include <stdlib.h> 


// Calcul la factoriel du nombre en parametre 
int factorielle (int num) 
{ 
	if (num == 0) 
	{ 
		return 1; 
	} 
	else 
	{ 
		return (num * factorielle (num-1)); 
	} 

}


int main()
{
	int j = 10;
	int i;
		for(i=0;i<j;i++)
		{
			printf("Fact of %d = %d \n", i, factorielle(i));
		
		}
	return 0;
}

 
