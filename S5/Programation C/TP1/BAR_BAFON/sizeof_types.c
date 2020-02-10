#include <stdio.h>

int main(void)
{
  long int lg_char, lg_short, lg_int, lg_long_int, lg_long_long_int, lg_float, lg_double, lg_long_double, lg_unsigned_char, lg_unsigned_short, lg_unsigned_int, lg_unsigned_long_int, lg_unsigned_long_long_int;
  lg_char = sizeof (char);
  printf ("La taille d'un char est :%ld",lg_char);
  lg_short = sizeof (short);
  printf ("\n La taille d'un short est :%ld",lg_short);
  lg_int = sizeof (int);
  printf ("\n La taille d'un int est :%ld",lg_int);
  lg_long_int = sizeof (long int);
  printf ("\n La taille d'un long int est :%ld",lg_long_int);
  lg_long_long_int = sizeof (long long int);
  printf ("\n La taille d'un long long int est :%ld",lg_long_long_int);
  lg_float = sizeof (float);
  printf ("\n La taille d'un float est :%ld",lg_float);
  lg_double = sizeof (double);
  printf ("\n La taille d'un double est :%ld",lg_double);
  lg_long_double = sizeof (long double);
  printf ("\n La taille d'un long double est :%ld",lg_long_double);
  lg_unsigned_char = sizeof (unsigned char);
  printf ("\n La taille d'un unsigned char est :%ld",lg_unsigned_char);
  lg_unsigned_short = sizeof (unsigned short);
  printf ("\n La taille d'un unsigned short est :%ld",lg_unsigned_short);
  lg_unsigned_int = sizeof (unsigned int);
  printf ("\n La taille d'un unsigned int est :%ld",lg_unsigned_int);
  lg_unsigned_long_int = sizeof (unsigned long int);
  printf ("\n La taille d'un unsigned long int est :%ld",lg_unsigned_long_int);
  lg_unsigned_long_long_int = sizeof (unsigned long long int);
  printf ("\n La taille d'un unsigned long long int est :%ld",lg_unsigned_long_long_int);
  printf ("\n");
  return 0;
}