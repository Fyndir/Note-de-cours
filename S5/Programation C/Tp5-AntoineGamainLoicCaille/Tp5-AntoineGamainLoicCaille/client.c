/* Fichier: client.c
 * Communication client-serveur
 * Auteurs: John Samuel, Antoine Gamain, Loïc Caille
 */

#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>  
#include <sys/socket.h>
#include <sys/stat.h>
#include <netinet/in.h>
#include <string.h>
#include <dirent.h>
#include <fcntl.h>

#include "client.h"

/* envoi et reception de message
*/

int main() {
    int socketfd;
    int bind_status;
    int inst;


    struct sockaddr_in server_addr, client_addr;

    /*
    * Creation d'un socket
    */
    socketfd = socket(AF_INET, SOCK_STREAM, 0);
    if ( socketfd < 0 ) {
        perror("socket");
        exit(EXIT_FAILURE);
    }

    //détails du serveur (adresse et port)
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    server_addr.sin_addr.s_addr = INADDR_ANY;

    //demande de connection au serveur
    int connect_status = connect(socketfd, (struct sockaddr *) &server_addr, sizeof(server_addr));
    if ( connect_status < 0 ) {
        perror("connection serveur");
        exit(EXIT_FAILURE);
    }
    
    int active=1;

    //On passe par une boucle infini pour laisser le client actif.
    while(active)
    {
        printf("Choisissez votre instruction :\n1- pour envoyer un message\n2- pour effectuer une opération (+,-,/)\n3- pour afficher les moyennes des étudiants\n4- pour quitter\n");
        scanf("%d",&inst);  
        while(getchar() != '\n');

        switch(inst){
        case 1:
            envoie_recois_message(socketfd);
            break;
        case 2:
            envoie_operateur_numeros(socketfd);
            break;
        case 3:
            lire_dossier("etudiant", socketfd);
            break;
        case 4:  
            //La boucle infini ce fini dans ce cas là
            shutdownServer(socketfd);
            active = 0; 
        }
    }
}

int shutdownServer(int socketfd) {
    
    char shdMsg[256] = "shutdown";
    
    int write_status = write(socketfd, shdMsg, strlen(shdMsg));
    if ( write_status < 0 ) {
        perror("erreur ecriture");
        exit(EXIT_FAILURE);
    }

    memset(shdMsg, 0, sizeof(shdMsg));
    int read_status = read(socketfd, shdMsg, sizeof(shdMsg));
    if ( read_status < 0 ) {
        perror("erreur lecture");
        return -1;
    }
    
    close(socketfd);
    return 0;
}

int envoie_recois_message(int socketfd) {
    char data[1024];
    memset(data, 0, sizeof(data));
    char message[100];
    printf("Votre message (max 1000 caracteres): ");
    fgets(message, 1024, stdin);
    strcpy(data, "message: ");
    strcat(data, message);

    int write_status = write(socketfd, data, strlen(data));
    if ( write_status < 0 ) {
        perror("erreur ecriture");
        exit(EXIT_FAILURE);
    }

    memset(data, 0, sizeof(data));
    int read_status = read(socketfd, data, sizeof(data));
    if ( read_status < 0 ) {
        perror("erreur lecture");
        return -1;
}

printf("Message recu: %s\n", data);

return 0;
}

//Fonction qui gère l'envoi d'un calcul au serveur (le calcul se fait num1 op num2 pour être
//plus proche d'une écriture compréhensible par l'humain)
int envoie_operateur_numeros(int socketfd) {

    char data[1024];
    memset(data, 0, sizeof(data));
    char message[100];
    printf("Votre calcul (max 1000 caracteres): ");
    fgets(message, 1024, stdin);
    //On rajoute 'calcul: ' pour que le serveur interprête cet envoi comme un calcul à effectuer
    strcpy(data, "calcul: ");
    strcat(data, message);

    int write_status = write(socketfd, data, strlen(data));
    if ( write_status < 0 ) {
        perror("erreur ecriture");
        exit(EXIT_FAILURE);
    }

    memset(data, 0, sizeof(data));
    int read_status = read(socketfd, data, sizeof(data));
    if ( read_status < 0 ) {
        perror("erreur lecture");
        return -1;
    }

    printf("Message recu: %s\n\n", data);

    return 0;
}

//Fonction de calcul qui gère les calculs pour la somme totale et la moyenne
//La fonction est la même que 'envoie_operateur_numeros' sauf qu'elle renvoi le résultat au lieu de
//l'afficher
float envoie_operateur_numeros2(int socketfd, char* operation) {

    char data[1024];
    memset(data, 0, sizeof(data));
    float num;

    int write_status = write(socketfd, operation, strlen(operation));
    if ( write_status < 0 ) {
        perror("erreur ecriture");
        exit(EXIT_FAILURE);
    }

    memset(data, 0, sizeof(data));
    int read_status = read(socketfd, data, sizeof(data));
    if ( read_status < 0 ) {
        perror("erreur lecture");
        return -1;
    }
    
    //Pour récupérer uniquement le résultat
    sscanf(data,"resultat = %f", &num);

    return num;
}

void displayEtudiant(Etudiant* etu){
    printf("path : %s - somme totale : %d - moyenne : %f\n",etu->path,etu->somme_totale,etu->moy);
}


//Fonction qui lit chaque dossier pour établir les sommes et moyennes de chaque étudiant (dossier)
//Le code est similaire à celui qui parcours itérativement chaque dossiers
void lire_dossier(char* path,int socketfd){
    struct dirent *lecture;
    DIR *rep;
    char real_path[512]="";
    char real_pathFolder[512]="";
    folder* first, *last, *current, *new;
    Etudiant* etu;
    int fd;
    char char_val[2];
    int val;
    char operation[256];
    int i = 0;
    int temp;

    first = malloc(sizeof(folder));

    strcpy(first->folder_path,path);
    first->next_folder = NULL;

    last = first;
    current = first;

    while(current->folder_path != NULL){

        rep = opendir(current->folder_path);

        while ((lecture = readdir(rep))) {    
            if(strcmp(lecture->d_name,".") && strcmp(lecture->d_name,"..")){

                sprintf(real_path,"%s/%s",current->folder_path,lecture->d_name);
                if (lecture->d_type == DT_DIR){
                    sprintf(real_pathFolder,"%s/%s",current->folder_path,lecture->d_name); 
                    new = malloc(sizeof(folder));
                    strcpy(new->folder_path,real_pathFolder);
                    new->next_folder = NULL;

                    last->next_folder = new;
                    last = new;
                
                } else {
                    //Dans le cas où l'objet sur lequel on est n'est pas un dossier, c'est qu'on est sur une note
                    //On vérifie alors si cette note est dans le même dossier que la note parcourue avant
                    //(on sait que chaque note d'un élève se suivront)
                    if(i==0 || strcmp(etu->path,current->folder_path)){
                        //Si les paths sont différents on crée un nouvel élève
                        if(i > 0){
                            //Si un élève a déjà été crée et qu'un nouveau va être créé alors on affiche les informations de l'ancien élève
                            //Moyenne calculée grace au serveur
                            sprintf(operation,"calcul: %d / %d",etu->somme_totale,etu->count_note);
                            etu->moy = envoie_operateur_numeros2(socketfd, operation); 
                            displayEtudiant(etu);
                        }
                        
                        etu = malloc(sizeof(Etudiant));
                        strcpy(etu->path,current->folder_path);
                        etu->count_note = 0;
                        etu->somme_totale = 0;
                        etu->moy = 0;
                        i++;
                    } 
                    etu->count_note = etu->count_note + 1;
                    //On lit la nouvelle note et on l'ajoute à la somme en la calculant grace au serveur
                    fd = open(real_path,O_RDONLY);
                    int size = read(fd, char_val, 2);
                    val = atoi(char_val);
                    sprintf(operation,"calcul: %d + %d",etu->somme_totale,val);
                    etu->somme_totale = (int) envoie_operateur_numeros2(socketfd, operation);
                }
            }

        }
        current = current->next_folder;
    }

    sprintf(operation,"calcul: %d / %d",etu->somme_totale,etu->count_note);
    etu->moy = envoie_operateur_numeros2(socketfd, operation); 
    displayEtudiant(etu);
    printf("\n");
    closedir(rep);
    
}