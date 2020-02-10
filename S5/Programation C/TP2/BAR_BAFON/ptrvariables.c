#include <stdio.h>

int main()
{
  char vchar = '*';
  char *pvchar = &vchar; 
  unsigned char vunsigned_char = '|';
  unsigned char *pvunsigned_char = &vunsigned_char; 
  short vshort = -94;
  short *pvshort = &vshort;
  unsigned short vunsigned_short = -44;
  unsigned short *pvunsigned_short = &vunsigned_short;
  int vint = -83;
  int *pvint = &vint;
  unsigned int vunsigned_int = 854;
  unsigned int *pvunsigned_int = &vunsigned_int;
  long int vlong_int = -544516848;
  long int *pvlong_int = &vlong_int;
  unsigned long int vunsigned_long_int = -54268455;
  unsigned long int *pvunsigned_long_int = &vunsigned_long_int;
  long long int vlong_long_int = -58745555;
  long long int *pvlong_long_int = &vlong_long_int;
  unsigned long long int vunsigned_long_long_int =-487874894;
  unsigned long long int *pvunsigned_long_long_int = &vunsigned_long_long_int;
  float vfloat = 3.05841;
  float *pvfloat = &vfloat;
  double vdouble = -54154154;
  double *pvdouble = &vdouble;
  long double vlong_double = -9999991961;
  long double *pvlong_double = &vlong_double;
  printf ("\n char %c à l'adresse: %p", vchar,pvchar);
  printf ("\n unsigned char %hhu à l'adresse: %p", vunsigned_char,pvunsigned_char);
  printf ("\n short %hd à l'adresse: %p", vshort,pvshort);
  printf ("\n unsigned short %hu à l'adresse: %p", vunsigned_short,pvunsigned_short);
  printf ("\n int %d à l'adresse: %p", vint,pvint);
  printf ("\n unsigned int %u à l'adresse: %p", vunsigned_int,pvunsigned_int);
  printf ("\n long int %ld à l'adresse: %p", vlong_int,pvlong_int);
  printf ("\n unsigned long int %lu à l'adresse: %p", vunsigned_long_int,pvunsigned_long_int);
  printf ("\n long long int %lld à l'adresse: %p", vlong_long_int,pvlong_long_int);
  printf ("\n unsigned long long int %llu à l'adresse: %p", vunsigned_long_long_int,pvunsigned_long_long_int);
  printf ("\n float %f à l'adresse: %p", vfloat,pvfloat);
  printf ("\n double %g à l'adresse: %p", vdouble,pvdouble);
  printf ("\n long double %Lf à l'adresse: %p", vlong_double,pvlong_double );
  printf("\n");
  return 0;
}