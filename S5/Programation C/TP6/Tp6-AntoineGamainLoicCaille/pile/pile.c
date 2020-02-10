/* Fichier: pile.c
 * Communication client-serveur
 * Auteurs: Antoine Gamain, Loïc Caille
 */

#include <stdio.h>
#include "pile.h"
#include <stdlib.h>

int main() {
    
    Liste* liste = malloc(sizeof(Liste));
    liste->prevVal = NULL;
    
    liste = empiler(1,liste);
    liste = empiler(2,liste);
    liste = empiler(3,liste);
    
    printf("Depile : %d\n",depiler(&liste));
    
    liste = empiler(4,liste);
    liste = empiler(5,liste);
    
    printf("Depile %d\n",depiler(&liste));
    printf("Depile %d\n",depiler(&liste));
    printf("Depile %d\n",depiler(&liste));
    printf("Depile %d\n",depiler(&liste));

    return 0;
}

Liste* empiler(int val, Liste* liste){
    
    Liste* new = malloc(sizeof(Liste));
    
    new->val = val;

    new->prevVal = liste;
    
    liste = new;
    
    return liste;
}

int depiler(Liste** liste){
    
    int val = 0;
    Liste* current;
    
    if(liste != NULL){
        
        current = *liste;  
        val = current->val;
        *liste = (current)->prevVal;
        free(current);
        
    }
    
    return val;
    
}
