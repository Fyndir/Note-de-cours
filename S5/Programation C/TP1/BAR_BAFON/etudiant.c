#include <stdio.h>

int maint()
{
  char tableau[5,5];//On déclare un tableau de 100 élèves
  tableau[0][0] = "BAR";
  tableau[0][1] = "Augustin";
  tableau[0][2] = "26 avenue jules guesdes, 69200 Venissieux";
  tableau[0][3] = "12/20";
  tableau[0][4] = "13.5/20";
  tableau[1][0] = "BAFON";
  tableau[1][1] = "Kevin";
  tableau[1][2] = "8 avenue du général de gaule, 69008 Lyon";
  tableau[1][3] = "15/20";
  tableau[1][4] = "18/20";
  tableau[2][0] = "Nom Eleve 1";
  tableau[2][1] = "Prénom Eleve 1";
  tableau[2][2] = "Adresse Eleve 1";
  tableau[2][3] = "Note 1 Eleve 1";
  tableau[2][4] = "Note 2 Eleve 1";
  tableau[3][0] = "Nom Eleve 2";
  tableau[3][1] = "Prénom Eleve 2";
  tableau[3][2] = "Adresse Eleve 2";
  tableau[3][3] = "Note 1 Eleve 2";
  tableau[3][4] = "Note 2 Eleve 2";
  tableau[4][0] = "Nom Eleve 3";
  tableau[4][1] = "Prénom Eleve 3";
  tableau[4][2] = "Adresse Eleve 3";
  tableau[4][3] = "Note 1 Eleve 3";
  tableau[4][4] = "Note 2 Eleve 3";
  
  int lig = 5 ;
  int col = 5 ;
  while (col!=0)
  {
    while (lig != 0)
    {
      printf("%c",tableau[col][lig]);
      lig = lig -1;
    }
    col = col -1;
    lig = 5;
  }
  return 0;
}
