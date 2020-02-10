/*
*Programme qui calcule l'aire/perimetre d'un cercle dans la console avec en variable le rayon
*Auteurs : Antoine Gamain  Simon Suard
*11/09/2018 initialisation 
*/

#include <stdio.h> //headers

int main()
{
  	double rayon = 3;
	double aire=3.14*rayon*rayon;
	double perimetre=3.14*rayon*2;
	printf("l'aire du cercle de rayon %f est de %f\n", rayon,aire);
	printf("le perimetre du cercle de rayon %f est de %f\n",rayon, perimetre);
   	return 0;	  
}
