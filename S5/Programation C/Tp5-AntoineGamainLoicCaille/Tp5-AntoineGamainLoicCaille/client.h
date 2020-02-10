#ifndef __CLIENT_H__
#define __CLIENT_H__

#define PORT 8089

/* envoi et reception de message
 */
int envoie_recois_message(int socketfd);

int envoie_operateur_numeros(int socketfd);

float envoie_operateur_numeros2(int socketfd, char* operation);

int shutdownServer(int socketfd);

typedef struct Etudiant{

    char path[256];
    int count_note;
    int somme_totale;
    float moy;

}Etudiant;

void displayEtudiant(Etudiant* etu);

typedef struct folder
{
	char folder_path[256];
	struct folder* next_folder;
}folder;

void lire_dossier(char* path,int socketfd);

#endif
