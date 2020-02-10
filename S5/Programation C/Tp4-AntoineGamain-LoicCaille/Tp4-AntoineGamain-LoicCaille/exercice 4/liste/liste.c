/*
* Ligne de commande qui parcour une liste de couleur
* Auteurs : Antoine Gamain  Loic Caille 
* 06/11/2018 initialisation 
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include "liste.h"

int main(){  
  
  // Création/Initialisation des couleurs

  couleur Rouge = { 0xf8, 0x00, 0xfd, 0xff, NULL};
  couleur Orange = { 0x4f, 0xff, 0x18, 0x8f, NULL};
  couleur Degueu = { 0x66, 0x69, 0x00, 0x4f, NULL};
  couleur Jaune = { 0x18, 0xe9, 0x00, 0xff, NULL};

  
  // On créé un pointeur pour chaque couleur (car les fonctions prennent un pointeur)
  
  couleur* R = &Rouge;
  couleur* P = &Orange;
  couleur* D = &Degueu;
  couleur* L = &Jaune;
  
  // On init la liste avec un premier element
  
  liste_couleurs liste;
  liste.last = R;
  
  // On créé un pointeur pour la liste (car les fonctions prennent un pointeur)
  
  liste_couleurs* ptrListe = &liste;
  
  // On insère les autres éléments
  
  insertion(P, ptrListe);
  insertion(D, ptrListe);
  insertion(L, ptrListe);
  // On parcours la liste
  
  parcours(ptrListe);
  
  return 0;
}

void insertion(couleur* coul, liste_couleurs* list) {
 
  coul->next = list->last;  
  list->last = coul;
  
}

void parcours(liste_couleurs* list) {
 
  couleur* current = list->last;
  
  while(current->next != NULL) {
    
    printf("Couleur (%hhx, %hhx, %hhx, %hhx)\n",current->r, current->g,current->b, current->a);
    
    current = current->next;
    
  }
  
  printf("Couleur (%hhx, %hhx, %hhx, %hhx)\n",current->r, current->g,current->b, current->a);
  
}
