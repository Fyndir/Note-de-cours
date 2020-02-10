#include<stdio.h>


int main(){
char* tab[5][5]={{"DUFOURD","BERTRAND","BOB","BOULANGER","JAMES"},{"pierre","marley","jean","loic","alex"},{"5 rue du pic","6 rue du coeur","7 rue du carreaux","8 rue du trèfle","9 rue de l'as"},{"18","12","15","14","16"},{"20","10","18","8","19"}};
int j=0;
int i=0;
for(i=0;i<5;i++){
  
  for(j=0;j<5;j++)
    {printf("\n %s",tab[j][i]);
    
    }printf("\n");
  }
return(0);
}