/*
*Programme qui recherche une phrase dans un tableau de char*
*Auteurs : Antoine Gamain  Loic Caille
*9/10/2018 initialisation 
*/

#include <stdio.h> //headers

int cmpStr(char* str1, char* str2){

  int eq = 1;
  int i = 0;
  
  while(eq && (str1[i] != '\0' || str2[i] != '\0') ){
    if(str1[i] != str2[i]){
      eq = 0;
    }
    i++;
  }
  
  return eq;
}

int main(){
  
  
 //On declare les 10 phrases
  char* phrase1 ="phrase1";
  char* phrase2 ="phrase2";
  char* phrase3 ="phrase3";
  char* phrase4 ="phrase4";
  char* phrase5 ="phrase5";
  char* phrase6 ="phrase6";
  char* phrase7 ="phrase7";
  char* phrase8 ="phrase8";
  char* phrase9 ="phrase9";
  char* phrase10 ="phrase10";
  
  //On stocke les phrases dans un Char*
  char* phrases[10];   
  phrases[0]=phrase1;
  phrases[1]=phrase2;
  phrases[2]=phrase3;
  phrases[3]=phrase4;
  phrases[4]=phrase5;
  phrases[5]=phrase6;
  phrases[6]=phrase7;
  phrases[7]=phrase8;
  phrases[8]=phrase9;
  phrases[9]=phrase10;
  
  
  // On cherche dans notre tableau phrases la phrase "phrase1"
  int i;  
  for (i=0;i<10;i++){
 
    if(cmpStr("phrase1",(phrases[i])))
      printf("ouiiiiiiiii\n");
    else
      printf("non\n");
  }
  
  return 0; 
}