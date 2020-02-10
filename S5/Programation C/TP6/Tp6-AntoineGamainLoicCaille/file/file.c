/* Fichier: pile.c
 * Communication client-serveur
 * Auteurs: Antoine Gamain, Loïc Caille
 */

#include <stdio.h>
#include "file.h"
#include <stdlib.h>

int main() {
    
    Liste* liste = NULL;
    
    liste = enfiler(1,liste);
    liste = enfiler(1,liste);
    liste = enfiler(3,liste);
    
    printf("Defile : %d\n",defiler(&liste));
    
    liste = enfiler(4,liste);
    liste = enfiler(8,liste);
    
    printf("Defile : %d\n",defiler(&liste));
    printf("Defile : %d\n",defiler(&liste));
    printf("Defile : %d\n",defiler(&liste));
    printf("Defile : %d\n",defiler(&liste));

    return 0;
}

Liste* enfiler(int val, Liste* liste){
    
    Liste* new = malloc(sizeof(Liste));
    new->val = val;
    
    if(liste != NULL){
        new->prevVal = liste;
        liste->nextVal = new;
    }
    
    liste = new;
    
    return liste;
}

int defiler(Liste** liste){
    
    int val = 0;
    Liste* current;
    
    if(liste != NULL){
        
        current = *liste;
        
        current = find_end(current);
        
        val = current->val;
        
        if(current->nextVal != NULL){
            current->nextVal->prevVal = NULL;
        }
        free(current);
        
    }
    
    return val;
    
}

Liste* find_end(Liste* current) {
    
    while(current->prevVal != NULL){
        current = current->prevVal;
    }
    
    return current;
    
}
