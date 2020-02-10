/*
*Programme qui permet de voir les octets d'une variable.
*Auteurs : Antoine Gamain  Loic Caille
*9/10/2018 initialisation 
*/

#include <stdio.h> //headers

int main(){

  int i;
  
  unsigned char* ptrOctet;
  
  short monShort = 11;
  ptrOctet = (unsigned char*) &monShort;
  printf("%d en short : ", monShort);
  for(i=(int) sizeof(monShort)-1;i>=0;i--){
    printf("%2x",*(ptrOctet+i));
  }
  printf("\n");
  
  int monInt = 0xabc;
  ptrOctet = (unsigned char*) &monInt;
  printf("%d en int : ", monInt);
  for(i=(int) sizeof(monInt)-1;i>=0;i--){
    printf("%2x",*(ptrOctet+i));
  }
  printf("\n");
  
  long int monLongInt = 11;
  ptrOctet = (unsigned char*) &monLongInt;
  printf("%ld en long int : ", monLongInt);
  for(i=(int) sizeof(monLongInt)-1;i>=0;i--){
    printf("%2x",*(ptrOctet+i));
  }
  printf("\n");
  
  float monFloat = 11;
  ptrOctet = (unsigned char*) &monFloat;
  printf("%f en float : ", monFloat);
  for(i=(int) sizeof(monFloat)-1;i>=0;i--){
    printf("%2x",*(ptrOctet+i));
  }
  printf("\n");
  
  double monDouble = 11;
  ptrOctet = (unsigned char*) &monDouble;
  printf("%G en double : ", monDouble);
  for(i=(int) sizeof(monDouble)-1;i>=0;i--){
    printf("%2x",*(ptrOctet+i));
  }
  printf("\n");
  
  long double monLongDouble = 11;
  ptrOctet = (unsigned char*) &monLongDouble;
  printf("%LG en long double : ", monLongDouble);
  for(i=(int) sizeof(monLongDouble)-1;i>=0;i--){
    printf("%2x",*(ptrOctet+i));
  }
  printf("\n");
  
  return 0;
}