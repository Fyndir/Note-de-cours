#include <stdio.h>

int main()
{
  char vchar = '*';
  unsigned char vunsigned_char = '|';
  short vshort = -94;
  unsigned short vunsigned_short = -44;
  int vint = -83;
  unsigned int vunsigned_int = 854;
  long int vlong_int = -544516848;
  unsigned long int vunsigned_long_int = -54268455;
  long long int vlong_long_int = -58745555;
  unsigned long long int vunsigned_long_long_int =-487874894;
  float vfloat = 3.05841;
  double vdouble = -54154154;
  long double vlong_double = -9999991961;
  
  printf ("char %c", vchar);
  printf ("\n unsigned char %hhu", vunsigned_char);
  printf ("\n short %hd", vshort);
  printf ("\n unsigned short %hu", vunsigned_short);
  printf ("\n int %d", vint);
  printf ("\n unsigned int %u", vunsigned_int);
  printf ("\n long int %ld", vlong_int);
  printf ("\n unsigned long int %lu", vunsigned_long_int);
  printf ("\n long long int %lld", vlong_long_int);
  printf ("\n unsigned long long int %llu", vunsigned_long_long_int);
  printf ("\n float %f", vfloat );
  printf ("\n double %g", vdouble);
  printf ("\n long double %lf", vlong_double);
  printf("\n");
  return 0;
  
}