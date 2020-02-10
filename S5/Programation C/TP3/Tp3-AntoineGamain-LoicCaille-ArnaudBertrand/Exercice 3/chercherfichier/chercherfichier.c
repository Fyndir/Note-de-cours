/*
*Programme qui permet la recherche dans un fichier
*Auteurs : Antoine Gamain  Loic Caille Arnaud Bertrand
*9/10/2018 initialisation 
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 20

//Structure qui stocke une ligne et la ligne suivante
//Pour faciliter la lecture ligne par ligne du fichier
struct line_reader {
    char* line;
    struct line_reader *next;
} line_reader;

//Recherche un mot dans une ligne
size_t chercherMot(const char* ligne, const char* mot) {
    unsigned int count = 0;
    size_t ligne_len = strlen(ligne),
        mot_len = strlen(mot),
        ligne_index = 0,
        mot_index = 0;

    for (ligne_index = 0; ligne_index < ligne_len; ligne_index++) {
        if (ligne[ligne_index] == mot[mot_index]) {
            mot_index++;

            if (mot_index == mot_len) {
                count += 1;
                mot_index = 0;
            }
        } else {
            mot_index = 0;
        }
    }

    return count;
}

//Lit le fichier passé en paramètre et renvoi une structure décomposant le
//contenu du fichier en lignes
struct line_reader* read_file(const char* filename) {
    FILE *file = fopen(filename, "r");
    struct line_reader *first_reader = (struct line_reader*) malloc(sizeof(struct line_reader));
    struct line_reader *current_read = first_reader;
    size_t line_len = 0;

    while (getline(&current_read->line, &line_len, file) != -1) {
        current_read->next = (struct line_reader*) malloc(sizeof(struct line_reader));
        current_read = current_read->next;
    }

    return first_reader;
}

int main(int argc, char *argv[]){
    
    if(argc == 3){
        
        char *string = argv[1];
        char *filename = argv[2];
        struct line_reader *reader;
        int count = 1;
        size_t nbLu = 0;
        
        reader = read_file(filename);
        
        while(reader != NULL){
            
            nbLu = chercherMot(reader->line, string);
            if (nbLu != 0) {
                printf("Ligne %u, %lu fois\n", count, nbLu);
            }

            count++;
            reader = reader->next;
        }
        
    } else {
        printf("Vous n'avez pas saisi le bon nombre d'arguments\n");
    }
    
    return 0;
}