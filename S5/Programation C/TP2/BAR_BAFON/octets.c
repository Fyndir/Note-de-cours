#include <stdio.h>

int main(){
  char *var;
  short vshort=2;
  /*int vint=4;
  long int vlong_int=5;
  float vfloat=6.2;
  double vdouble=8;
  long double vlong_double=49845575;*/
  
 var=(char*) &vshort;
 printf("%x \n", *var);
 return 0;
  
}