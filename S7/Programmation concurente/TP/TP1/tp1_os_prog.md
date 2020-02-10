# TP 1 Prog système

## Ex 1.1

```c
#include <stdio.h>

int main(int argc, char* argv[])
{
	int i;
	printf("Nom du programme : %s\n", argv[0]);
	printf("Nombre d'arguments de la ligne de commandes : %d\n", argc-1);
	printf("Les arguments sont : \n");
	for(i = 1; i < argc; i++)
	{
		printf("\t%d : %s\n",i,argv[i]);
	}
	return 0;
}
```

## Ex 1.2 (miroir)

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char* argv[])
{
	// exo 3
	for(int i = 1; i < argc; i++)
	{
		// exo 2
		for(int j = strlen(argv[i]); j >= 0; j--)
			printf("%c", argv[i][j]);
		printf("\n");
	}
}
```

## Ex 2 (moyenne)

```c
#include <stdlib.h>
#include <stdio.h>

int main(int argc, char* argv[])
{
	// checks
	if(argc < 2)
	{
		printf("Aucune moyenne à calculer\n");
		return 1;
	}

	int gradeSum = 0;
	for(int i = 0; i < argc; i++)
	{
		// check
		if(atoi(argv[i]) < 0 || atoi(argv[i]) > 20)
		{
			printf("Note non valide\n");
			return 2;
		}
		// if everything is ok
		else
			gradeSum += atoi(argv[i]);
	}
	printf("Moyenne est : %.2f\n", (float) gradeSum/(argc-1));
	return 0;
}
```

## Ex 3 (VisuVariable)

```c
#include <stdlib.h>
#include <stdio.h>
#include <string.h>/**/

int main(int argc, char** argv)
{
	// triche
	// printf("%s\n\n", getenv(argv[1]));

	// pas triche
	extern char** environ;
	for(int i = 0; environ[i]; i++)
		if(strncmp(environ[i], argv[1], strlen(argv[1])) == 0)
			printf("%s\n", environ[i]);
}
```