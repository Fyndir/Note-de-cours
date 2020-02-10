#include<stdio.h>
#include<string.h>

int main(){
struct etudiant{
char nom[20];
char prenom[20];
char adresse[20];
char note1[20];
char note2[20];
  };
  
  struct etudiant kevin;
  strcpy(kevin.nom,"BAFON");
  strcpy(kevin.prenom,"Kevin");
  strcpy(kevin.adresse,"69 rue du moulin rouge");
  strcpy(kevin.note1,"30");
  strcpy(kevin.note2,"30");
  
  struct etudiant augustin;
  strcpy(augustin.nom,"BAR");
  strcpy(augustin.prenom,"Augustin");
  strcpy(augustin.adresse,"26 avenue jules guesde");
  strcpy(augustin.note1,"20");
  strcpy(augustin.note2,"20");
  
  struct etudiant juliette;
  strcpy(juliette.nom,"BONIAUDS");
  strcpy(juliette.prenom,"Juliette");
  strcpy(juliette.adresse,"23 rue de l'ours");
  strcpy(juliette.note1,"16");
  strcpy(juliette.note2,"15");
  
  struct etudiant jeanbaptiste;
  strcpy(jeanbaptiste.nom,"MONNIN");
  strcpy(jeanbaptiste.prenom,"Jean-Baptiste");
  strcpy(jeanbaptiste.adresse,"7 avenue du rouge gorge");
  strcpy(jeanbaptiste.note1,"15");
  strcpy(jeanbaptiste.note2,"15");
  
  struct etudiant chen;
  strcpy(chen.nom,"XIADONG");
  strcpy(chen.prenom,"Chen");
  strcpy(chen.adresse,"8 chemin du chien heureux");
  strcpy(chen.note1,"18");
  strcpy(chen.note2,"19");
  
  
  
printf("L'etudiant %s %s habite au %s et a les notes de %s & %s \n",kevin.nom, kevin.prenom,kevin.adresse,kevin.note1,kevin.note2);
printf("L'etudiant %s %s habite au %s et a les notes de %s & %s \n",augustin.nom, augustin.prenom,augustin.adresse,augustin.note1,augustin.note2);
printf("L'etudiant %s %s habite au %s et a les notes de %s & %s \n",juliette.nom, juliette.prenom,juliette.adresse,juliette.note1,juliette.note2);
printf("L'etudiant %s %s habite au %s et a les notes de %s & %s \n",jeanbaptiste.nom, jeanbaptiste.prenom,jeanbaptiste.adresse,jeanbaptiste.note1,jeanbaptiste.note2);
printf("L'etudiant %s %s habite au %s et a les notes de %s & %s \n",chen.nom, chen.prenom,chen.adresse,chen.note1,chen.note2);
return(0);
}