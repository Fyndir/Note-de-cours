#include <stdio.h>

int main()
{
 char lettre = 'c';
 int i = 0;
 
 switch (lettre)
 {
   case 'a' :
     while (i!=1000)
     {
       if (i%2 == 0 && i%15 ==0)
       {
	 printf("\n %d",i);
       }
       i=i+1; 
     }
     break;
     
   case 'b' : 
        while (i!=1000)
     {
       if (i%103 == 0 || i%107 ==0)
       {
	 printf("\n %d",i);
       }
       i=i+1; 
     }
     break;
     
   case 'c' :
      while (i!=1000)
     {
       if ((i%7 == 0 || i%5 == 0) && i%3 !=0)
       {
	 printf("\n %d",i);
       }
       i=i+1; 
     }
     break;
}
printf("\n");     
return 0;
}