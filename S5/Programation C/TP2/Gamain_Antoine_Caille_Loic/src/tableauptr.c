/*
*Programme qui manipule des tableaux avec des pointeurs. 
*Auteurs : Antoine Gamain  Loic Caille
*9/10/2018 initialisation 
*/

#include <stdio.h> //headers
#include <stdlib.h>
#include <time.h>

//Fonction qui affiche les tableaux d'int
void AfficherTableauInt(int tabInt[10], float tabFloat[10]){
  int i;
  
  printf("Tableau d'int\tTableau de float\n\n");
  
  for(i=0; i<10; i++){
    printf("\t%d", tabInt[i]);
    printf("\t%f\n", tabFloat[i]);
  }
  
  printf("\n\n");
}

int main()
{
  int i;
  
  //Déclaration des tableaux
  int tabInt[10];
  float tabFloat[10];
  

 
  //On remplit les tableaux avec des valeurs aléatoires
  for(i=0; i<10; i++){
    tabInt[i] = rand()%250;
    //On cast en float les rand pour obtenir un float
    tabFloat[i] = (float) (rand()%250) / (float) (rand()%250); 
  }
  
    printf("Affichage après génération\n");
    AfficherTableauInt(tabInt, tabFloat);
    
  for(i=0; i<10; i++){
    //Si l'indice est divisible par 2 on multiplie la valeur à l'adresse du tableau + l'indice par 3 
    if(i%2==0){
      *(tabInt+i) = *(tabInt+i) * 3;
      *(tabFloat+i) = *(tabFloat+i) * 3;
    }
  }
  
  printf("Affichage après application de l'algo de multiplication\n");
  AfficherTableauInt(tabInt, tabFloat);
  
  return 0;	  
}
