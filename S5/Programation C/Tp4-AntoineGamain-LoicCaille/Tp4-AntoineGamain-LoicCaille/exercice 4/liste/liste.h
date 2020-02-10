#ifndef LISTE
#define LISTE

typedef struct couleur {

    int r;
    int g;
    int b;
    int a;
    struct couleur* next;
}couleur;

typedef struct liste_couleurs {
	couleur* last;
}liste_couleurs;

void insertion(couleur* coul, liste_couleurs* list);
void parcours(liste_couleurs* list);

#endif // LISTE
