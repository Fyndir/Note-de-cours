/*
*Programme qui permet la gestion des couleurs
*Auteurs : Antoine Gamain  Loic Caille
*9/10/2018 initialisation 
*/

#include <stdio.h>

//Structure permetant de stocker les couleurs (on utilise des char pour faire des octets).
struct rgba {
  unsigned char r;
  unsigned char g;
  unsigned char b;
  unsigned char a;
};

//Fonction pour initialiser notre structure
struct rgba Rgba(char R,char G,char B,char A)
{
  struct rgba couleurs;
  couleurs.r=R;
  couleurs.g=G;
  couleurs.b=B;
  couleurs.a=A;
  
  return couleurs;
}

int main() {
  
  int i;
  struct rgba couleurs[10];
  
  couleurs[0] = Rgba(20,13,4,247);
  couleurs[1] = Rgba(255,255,255,255);
  couleurs[2] = Rgba(255,0,0,255);
  couleurs[3] = Rgba(10,45,236,45);
  couleurs[4] = Rgba(34,36,10,63);
  couleurs[5] = Rgba(164,56,75,36);
  couleurs[6] = Rgba(10,67,57,37);
  couleurs[7] = Rgba(42,36,74,12);
  couleurs[8] = Rgba(0,0,0,0);
  couleurs[9] = Rgba(57,45,98,87);
  couleurs[10] = Rgba(86,89,10,27);
  
  for(i=0; i<10; i++){
    printf("Couleur %d : (%x,%x,%x,%x)\n", i+1, couleurs[i].r, couleurs[i].g, couleurs[i].b, couleurs[i].a);
  }
  
  return 0;
}
  