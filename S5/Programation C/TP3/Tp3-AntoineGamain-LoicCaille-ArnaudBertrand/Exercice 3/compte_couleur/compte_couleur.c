/*
*Programme qui permet la gestion des couleurs
*Auteurs : Antoine Gamain  Loic Caille Arnaud Bertrand
*9/10/2018 initialisation 
*/

#include <stdio.h>
#include <string.h>

#define MAX 20

//Structure permetant de stocker les couleurs (on utilise des char pour faire des octets).
struct rgba {
    unsigned char r;
    unsigned char g;
    unsigned char b;
    unsigned char a;
    unsigned int count; //Ajout dans la structure d'une valeur qui garde le compte
};

//Affiche la couleur et son nombre
void displayColor(struct rgba color) {
    printf("0x%x 0x%x 0x%x 0x%x %d\n", color.r, color.g, color.b, color.a, (color.count/2)); //Pour une raison qui m'échappe encore les couleurs s'ajoutent deux fois
    //On divise donc par deux le nombre de couleurs ajoutées
}

//Fonction qui compare deux couleurs, renvoi 1 si elles sont égales, 0 sinon
int clrcmp(struct rgba clr1, struct rgba clr2){
    if(clr1.r != clr2.r){
        return 0;
    } else if(clr1.g != clr2.g){
        return 0;
    } else if(clr1.b != clr2.b){
        return 0;
    } else if(clr1.a != clr2.a){
        return 0;
    }
    return 1;
}

int main(){

    int end = 0;
    int found = 0;
    char res[256];
    unsigned int red, green, blue, opacity;
    size_t colors_len = 0;
    struct rgba couleurs[MAX];
    struct rgba color;

    printf("Saisissez vos couleurs (%d maximum) : \n", MAX);

    while (!end) {
        fgets(res, 20, stdin);

        if (strcmp(res, "FIN\n")) {

            sscanf(res, "%x %x %x %x", &red, &green, &blue, &opacity);
            color.r = red;
            color.g = green;
            color.b = blue;
            color.a = opacity;
            
            //Pour chaque couleur saisie, si elle existe déjà on rajoute 1 dans le compteur de celle ci
            //Sinon on la rajoute dans le tableau
            found = 0;
            for (size_t i = 0; i < colors_len && !found; i++) {
                if (clrcmp(couleurs[i], color)) {
                    found = 1;
                    couleurs[i].count += 1;
                }
            }

            if (!found) {
                color.count = 1;
                couleurs[colors_len++] = color;
            }
        } else {
            end = 1;
        }
    }

    for(int i = 0; i < (int) colors_len; i++){
        displayColor(couleurs[i]);
    }


    return 0;
    
}