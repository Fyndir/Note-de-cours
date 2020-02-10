/*
*Programme qui sauvegarde des élèves dans un fichier txt 
*Auteurs : Antoine Gamain  Loic Caille Arnaud bertrand
*23/10/2018 initialisation 
*/


#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>

//Declaration d'un struct pour stocker nos etudiants , on pourrais aussi faire une Fonction Construct
struct etudiant{
  char nom[32];
  char prenom[32];
  char adresse[255];
  double note_c;
  double note_os;
};


//Methode qui ecrit dans le fichier *file le contenu de la structure etudiant en parametre
void enregistrer_eleve(struct etudiant etu, FILE *file){
  
  fprintf(file,"%s %s, %s. Note c : %f. Note OS %f \n", etu.prenom, etu.nom, etu.adresse, etu.note_c, etu.note_os);
}

int main()
{
  char *fichier = "fichier.txt";
  int i;
  struct etudiant mesEtudiants[5];
  

  //Initialisation des étudiants

  strcpy(mesEtudiants[0].nom, "Dimitri");
  strcpy(mesEtudiants[0].prenom, "Crackers");
  strcpy(mesEtudiants[0].adresse, "Rue de oui");
  mesEtudiants[0].note_c = 12.0;
  mesEtudiants[0].note_os = 13.0;

  strcpy(mesEtudiants[1].nom, "Loïc");
  strcpy(mesEtudiants[1].prenom, "Michel");
  strcpy(mesEtudiants[1].adresse, "Rue de non");
  mesEtudiants[1].note_c = 15.0;
  mesEtudiants[1].note_os = 3.0;

  strcpy(mesEtudiants[2].nom, "Couturier");
  strcpy(mesEtudiants[2].prenom, "Vincent");
  strcpy(mesEtudiants[2].adresse, "Rue de l'arc en ciel");
  mesEtudiants[2].note_c = 18.0;
  mesEtudiants[2].note_os = 20.0;

  strcpy(mesEtudiants[3].nom, "Bouchon");
  strcpy(mesEtudiants[3].prenom, "stephanie");
  strcpy(mesEtudiants[3].adresse, "21b becker street");
  mesEtudiants[3].note_c = 8.0;
  mesEtudiants[3].note_os = 9.0;

  strcpy(mesEtudiants[4].nom, "Jon");
  strcpy(mesEtudiants[4].prenom, "Jon");
  strcpy(mesEtudiants[4].adresse, "Rue de la street");
  mesEtudiants[4].note_c = 10.0;
  mesEtudiants[4].note_os = 10.0;
  
  FILE *file = fopen(fichier, "w");
  
	
//Affichage des informations des étudiants
  for(i = 0; i<=4; i++){
    enregistrer_eleve(mesEtudiants[i], file);
  }
  return 0;
}





