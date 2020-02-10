/*
*Programme qui utilise deux variables a = 16 et b = 3 et test
les différents opérateurs arithmétiques et logiques
*Auteurs : Antoine Gamain  Simon Suard
*11/09/2018 initialisation 
*/

#include <stdio.h> //headers

int main()
{

 int a =16;
 int b =3;

 printf("opérateurs arithmétiques \n");
 printf("%d + %d = %d \n" ,a,b,(a+b));
 printf("%d - %d = %d \n" ,a,b,(a-b));
 printf("%d * %d = %d \n" ,a,b,(a*b));
 printf("%d / %d = %d \n" ,a,b,(a/b));
 printf("%d mod %d = %d \n" ,a,b,(a % b));

 printf("opérateurs logique \n");
 printf("!%d = %d \n" ,a, !a);
 printf("%d && %d = %d \n" ,a,b,(a&&b));
 printf("%d || %d = %d \n" ,a,b,(a||b));

return 0;	  
}
