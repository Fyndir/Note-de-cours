/*
*Programme qui affecte et affiche les valeurs des variables de 
différents types de base : char, short, int, long int, long long int, float, double, long double. 
*Auteurs : Antoine Gamain  Loic Caille
*9/10/2018 initialisation 
*/

#include <stdio.h> //headers
#include <string.h>

int main()
{
	char c;
	char *pointeurC = &c;
	*pointeurC = 'a';
	printf("Affichage d'un char : %c, adresse : %p\n", c, pointeurC);
	
	unsigned char uc;
	unsigned char *pointeurUc = &uc;
	*pointeurUc = 65;
	printf("Affichage d'un unsigned char : %uc, adresse : %p\n", uc, pointeurUc);
	
	short s;
	short *pointeurS = &s;
	*pointeurS = 1;
	printf("Affichage d'un short : %d, adresse : %p\n", s, pointeurS);
	
	unsigned short us;
	unsigned short *pointeurUs = &us;
	*pointeurUs = 1;
	printf("Affichage d'un unsigned short : %ud, adresse : %p\n", us, pointeurUs);
	
	int i;
	int *pointeurI = &i;
	*pointeurI = 1;
	printf("Affichage d'un int : %d, adresse : %p\n", i, pointeurI);
	
	unsigned short ui;
	unsigned short *pointeurUi = &ui;
	*pointeurUi = 1;
	printf("Affichage d'un unsigned int : %ud, adresse : %p\n", ui, pointeurUi);
	
	long int li;
	long int *pointeurLi = &li;
	*pointeurLi = 1;
	printf("Affichage d'un long int : %ld, adresse : %p\n", li, pointeurLi);
	
	unsigned long int uli;
	unsigned long int *pointeurUli = &uli;
	*pointeurUli = 1;
	printf("Affichage d'un unsigned long int : %ld, adresse : %p\n", uli, pointeurUli);
	
	long long int lli;
	long long int *pointeurLli = &lli;
	*pointeurLli = 1;
	printf("Affichage d'un long long int : %lld, adresse : %p\n", lli, pointeurLli);
	
	unsigned long long int ulli;
	unsigned long long int *pointeurUlli = &ulli;
	*pointeurUlli = 1;
	printf("Affichage d'un unsigned long long int : %lld, adresse : %p\n", ulli, pointeurUlli);
	
	float f;
	float *pointeurF = &f;
	*pointeurF = 1.0f;
	printf("Affichage d'un float : %f, adresse : %p\n", f, pointeurF);
	
	double d = 1.0;
	double *pointeurD = &d;
	*pointeurD = 1.0;
	printf("Affichage d'un double : %g, adresse : %p\n", d, pointeurD);
	
	long double ld = 1.0;
	long double *pointeurLd = &ld;
	*pointeurLd = 1.0;
	printf("Affichage d'un long double : %LG, adresse : %p\n", ld, pointeurLd);

   	return 0;	  
}
