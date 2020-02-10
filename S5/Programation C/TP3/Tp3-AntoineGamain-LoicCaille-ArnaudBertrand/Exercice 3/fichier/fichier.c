/*
*Programme qui manipule un fichier .txt 
*Auteurs : Antoine Gamain  Loic Caille Arnaud bertrand
*23/10/2018 initialisation 
*/


#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include "fichier.h"


int main(){
  
  char fichier1[] = "fichier1.txt";
  char fichier2[] = "fichier2.txt";
  char* message = "Ceci est un test d'écriture";
  
  if(!lire_fichier(fichier1)){
    printf("ça ne marche pas !\n");
  }
  
  if(!ecrire_dans_fichier(fichier2,message)){
    printf("ça ne marche pas !\n");
  }
  
  return 0;
}


//Methode qui lit le fichier passé en parmetre 
int lire_fichier(char *nom_de_fichier){
  
  char content[1000];
  int count;
  
  int fd = open(nom_de_fichier,O_RDONLY);
  int size = read(fd, content, 1000);
  
  for(count = 0; count < size; count++){
    printf("%c", content[count]);
  }
  
  printf("\n");
  
  close(fd);
  
  return 1;
  
}

//Methode qui ecrire_dans_fichier en parametre le message en parametre
int ecrire_dans_fichier(char *nom_de_fichier, char *message){
  
  int fd = open(nom_de_fichier,O_WRONLY);
  
  write(fd,message,strlen(message));

  close(fd);
  
  return 1;
  
}