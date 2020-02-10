# TP 4 programation concurente

## Exo 1 :

Code d'antoine gamain

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

#define TAILLE_MESSAGE 256 /* Correspond à la taille de la chaîne à lire et à écrire */

int main(void)
{
    pid_t pid_fils;
    int descripteurTube[2];

    unsigned char messageLire[TAILLE_MESSAGE], messageEcrire[TAILLE_MESSAGE];

    printf("Création du tube.\n");
    
    if(pipe(descripteurTube) != 0)
    {
        fprintf(stderr, "Erreur de création du tube.\n");
        return EXIT_FAILURE;
    }

    pid_fils = fork();

    if(pid_fils == -1)    
    {
        fprintf(stderr, "Erreur de création du processus.\n");
        return 1;
    }

    if(pid_fils == 0)
    {
        printf("Fermeture de l'entrée dans le fils.\n\n");
        close(descripteurTube[1]);
        
        read(descripteurTube[0], messageLire, TAILLE_MESSAGE);
        printf("Nous sommes dans le fils (pid = %d).\nIl a reçu le message suivant du père : \"%s\".\n\n\n", getpid(), messageLire);
    }

    else
    {
        printf("\nFermeture de la sortie dans le père.\n");
        close(descripteurTube[0]);

        sprintf(messageEcrire, "Bonjour, fils. Je suis ton père !");

        printf("Nous sommes dans le père (pid = %d).\nIl envoie le message suivant au fils : \"%s\".\n\n\n", getpid(), messageEcrire);

        write(descripteurTube[1], messageEcrire, TAILLE_MESSAGE);

        wait(NULL);
    }

    return 0;
}
```
---------------
Code d'Enzo Baldisserri

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>

#define BUFFER_SIZE 1024

int main(void) {
    int pfd[2];
    char buffer[BUFFER_SIZE];

    if (pipe(pfd) == -1) {
        perror("Cannot create pipe");
        exit(1);
    }

    write(pfd[1], "Test message", BUFFER_SIZE);

    read(pfd[0], buffer, BUFFER_SIZE);

    printf("Received: %s\n", buffer);
}
```
## Exo 2

### cat fichier | wc

Ici, on utilise les pipes avec les descripteurs ainsi que les entrée standards des fichiers.
On rappelle que lorsqu'on lance une commande (= fichier), il y a 3 interfaces qui sont:
* 0 --> Entrée
* 1 --> Sortie 
* 2 --> Sortie d'erreur

Lorsqu'on lance une commande d'un terminal, l'entrée est reliée au clavier, la sortie ainsi que la sorte d'erreu à l'écran.
Ici, le but est, dans un code c, de lancer une commande linux (cat puis wc) et de se passer les données.

Code d'Augustin BAR

```c
#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>

//cat fichier | wc

int main (int argc, char* argv[])
{
    int tube[2] ;//Descripteur
    unsigned char buffer[256] ;//Message à passe
    printf("Création du tube\n") ;
    if (pipe(tube) != 0) //Création du tube avec problème
    {
        perror("Problème – création du tube\n") ;
        exit (1) ;
    }
    if (fork() == 0)//Dans le processus fils
    {
        close(tube[0]);//On ferme l'entrée (lecture)
        dup2(tube[1],1);//On redirige la sortie standard de la commande qu'on va executer(cat) vers l'écriture du tube pour l'envoyer au père
        close(tube[1]);//Dès qu'on a redirigé, on ferme le coté
        execl("/bin/cat","cat",argv[1],NULL);//On execute la commande cat qui est censée afficher le contenu d'un fichier
        perror("error cat");//Comme un execl écrase la suite du code, il n'est pas censé être executé
        
    }
    else
    {
        close(tube[1]);//Ferme l'écriture du tube
        dup2(tube[0],0);//Met l'entrée de la commande qu'on va éxecuter avec le coté de lecture du tube
        close(tube[0]);//On ferme ce coté
        execl("/usr/bin/wc","wc",NULL);//On éxécute la commande wc qui donne le nombre de lignes, mots et octets d'un fichier en entrée
        perror("error wc");//Comme un execl écrase la suite du code, il n'est pas censé être executé
    }
    return 0 ;
    
}
```

//Dans le descripteur, la première case ([0]) est pour la lecture (entrée) alors que la seconde ([1]) est pour l'écriture (sortie)

-------------------------

Code d'Enzo Baldisserri

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char* argv[]) {
    // Vérification du nombre d'arguments
    if (argc != 2) {
        printf("1 arg required\n");
        exit(EXIT_SUCCESS);
    }

    // Création du pipe
    int pfd[2];
    pipe(pfd);

    // fork
    // Le processus père lancera "wc"
    // Le processus fils lancera "cat"
    int pid = fork();

    if (pid == -1) {
        perror("Cannot fork");
        exit(EXIT_FAILURE);
    }

    if (pid == 0) {
        // Exécution de "cat"

        // On ferme la lecture du pipe car on ne l'utilisera pas
        close(pfd[0]);

        // On remplace l'écriture du tube par la sortie standard
        dup2(pfd[1], 1);

        // L'écriture du tube n'est donc plus utilisée, on la ferme
        close(pfd[1]);

        // /!\ Ce chemin peut changer en fonction des systèmes !
        execl("/bin/cat", "cat", argv[1], NULL);

        perror("Cannot exec \"cat\"");
        exit(EXIT_FAILURE);
    } else {
        // Execution de "wc"

        // On ferme l'écriture du pipe car on ne l'utilisera pas
        close(pfd[1]);

        // On remplace la lecture du tube par l'entrée standard
        dup2(pfd[0], 0);

        // La lecture du tube n'est plus utilisée, on la ferme
        close(pfd[0]);

        // /!\ Ce chemin peut changer en fonction des systèmes !
        execl("/usr/bin/wc", "wc", NULL);

        perror("Cannot exec \"wc\"");
        exit(EXIT_FAILURE);
    }

    return EXIT_SUCCESS;
}
```

Pour lancer le fihcier, on utilisera donc 
``` gcc file.c | ./a.out file.c ```
Ca permet donc d'utiliser le file.c en entrée.


### sort < fichier | grep chaine | tail –n 5 > sortie

Code d'Augustin BAR

```c
#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <fcntl.h>
#include <string.h>

//sort < fichier | grep chaine | tail –n 5 > sortie
//On va créer 3 processus alignés verticalement généalogiquement
//Le 3ème, le plus jeune, va ouvrir un descripteur de fichier pour récupérer un fichier puis executer la commande sort
//Le 2nd va prendre la sortie du 3ème et faire grep chaine
//Le 1er va prendre la sortie du 2ème et faire tail -n 5 et le rediriger dans un fichier créé avec open
int main (int argc, char* argv[])
{
  int tube1[2], tube2[2] ;//Descripteurs des tubes
  int i;
  printf("Création du tube\n") ;
    if (pipe(tube1) != 0) //Création du tube avec problème
    {
        perror("Problème – création du tube\n") ;
        exit (1) ;
    }
    if (pipe(tube2) != 0) //Création du tube avec problème
    {
        perror("Problème – création du tube\n") ;
        exit (1) ;
    }
    if (fork() == 0)//2ème
    {
      
      if (fork() == 0)//Le 3ème tube, celui qui va récupérer le fichier avec un descripteur et faire un sort
      {
	close(tube2[1]);//On ferme le tube2 car on ne s'en sert pas ici
	close(tube2[0]);
	
	close(tube1[0]);//O ferme la lecture du tube
	
	i = open(argv[1],O_RDONLY);//On créé un descripteur de fichier pour relier le fichier à l'entrée standard
	if (i == -1)
	{
            perror("Cannot open input file");
            exit(EXIT_FAILURE);
	}
	dup2(i,0); //On relie le descripteur de fichier à l'entrée standard
	
	dup2(tube1[1],1);//On relie la sortie standard de la commande sort (qu'on va executer) avec l'écriture du tube
	close(tube1[1]);//On ferme l'écriture du tube
	execl("usr/bin/sort","sort",NULL);
	perror("error sort");
	exit(EXIT_FAILURE);
      }
      else//Le 2ème processus, celui qui va executer a commande grep
      {
	close(tube2[0]);//On va écrire dans le tube 2, donc on ferme sa lecture
		
	close(tube1[1]);//On a besoin que de lire le résultat de sort donc on ferme l'écriture
	dup2(tube1[0],0);//On relie la lecture du tube avec lentrée standard pour éxécuter grep
	close(tube1[0]);//On ferme la lecture du tube
	
	dup2(tube2[2],1);//On relie la sortie de grep avec l'entrée du tube2
	close(tube2[1]);//On ferme l'écriture de tube2
	execl("bin/grep","grep",argv[2],NULL);//On execute grep
	perror("error grep");//On vérifie que grep s'est bien executé
	exit(EXIT_FAILURE);
      }
    }
    else//Le 1er processus
    {
      close(tube1[0]);//On n'aura pas besoin du tube1
      close(tube1[1]);
      
      close(tube2[1]);//On va juste récupére la sortie de grep via la lecture du tube2, donc on ferme l'écriture
      
      dup2(tube2[0],0);//On relie l'entrée standard avec la lecture de tube2
      close(tube2[0]);//On ferme la lecture du tube2
      
      i = open(argv[3],O_WRONLY| O_CREAT);//On créé un fichier dans lequel on va écrire la sortie de grep
      if (i == -1)
	{
            perror("Cannot open output file");
            exit(EXIT_FAILURE);
	}
      dup2(i,1);//On relie la sortie sandard avec le descripteur de fichier
      
      execl("usr/bin/tail","tail", "-n", "5",NULL);//On execute tail
      perror("error tail");//On vérifie que grep a bien été executé
    }
      
      
      
  return 0;
}
```

--------------------------------

Code d'Enzo Baldisserri

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>

#define INPUT_PATH "2.2-testfile"
#define OUTPUT_PATH "sortie"

int main(void) {
    // Création du pipe qui servira pour lié "sort" et "grep"
    int spfd[2];
    if (pipe(spfd) == -1) {
        perror("Cannot create sort pipe");
        exit(EXIT_FAILURE);
    }

    int pid1 = fork();
    if (pid1 == -1) {
        perror("Cannot fork sort");
        exit(EXIT_FAILURE);
    }

    if (pid1 == 0) {
        // Fermeture du pipe "sort/grep" en lecture
        close(spfd[0]);

        // Création du descripteur de fichier du fichier d'entrée
        int ifd = open(INPUT_PATH, O_RDONLY);
        if (ifd == -1) {
            perror("Cannot open input file");
            exit(EXIT_FAILURE);
        }

        // Remplacement du df du fichier d'entrée par l'entrée standard
        dup2(ifd, 0);

        // Remplacement du tube "sort/grep" de sortie par la sortie standard
        dup2(spfd[1], 1);

        // Fermeture de la sortie du tube "sort/grep" car elle n'est plus utilisée
        close(spfd[1]);

        execl("/usr/bin/sort", "sort", NULL);

        perror("Cannot exec 'sort'");
        exit(EXIT_FAILURE);
    } else {
        // Fermeture de la sortie du tube "sort/grep"
        close(spfd[1]);

        // Création du tube "grep/tail"
        int gpfd[2];
        if (pipe(gpfd) == -1) {
            perror("Cannot create grep pipe");
            exit(EXIT_FAILURE);
        }

        int pid2 = fork();
        if (pid2 == -1) {
            perror("Cannot fork grep");
            exit(EXIT_FAILURE);
        }

        if (pid2 == 0) {
            // Fermeture de la lecture du tube "grep/tail"
            close(gpfd[0]);

            // Remplacement de la lecture du tube "sort/grep" par l'entrée standard
            dup2(spfd[0], 0);

            // Remplacement de l'écriture du tube "grep/tail" par la sortie standard
            dup2(gpfd[1], 1);

            // Fermeture de l'écriture du tube "grep/tail"
            close(gpfd[1]);

            execl("/bin/grep", "grep", "chaine", NULL);

            perror("Cannot exec 'grep'");
            exit(EXIT_FAILURE);
        } else {
            // Fermeture de la lecture du tube "sort/grep"
            // La totalité du tube n'est plus accessible
            close(spfd[0]);

            // Fermeture de l'écriture du tube "grep/tail"
            // Seule la lecture est disponible
            close(gpfd[1]);

            // Création du df du fichier de sortie
            int ofd = open(OUTPUT_PATH, O_WRONLY | O_CREAT);
            if (ofd == -1) {
                perror("Cannot open output file");
                exit(EXIT_FAILURE);
            }

            // Remplacement de la lecture du tube "grep/tail" par l'entrée standard
            dup2(gpfd[0], 0);

            // Remplacement du df de fichier de sortie par la sortie standard
            dup2(ofd, 1);

            // Fermeture du df de fichier de sortie car il n'est plus utilisé
            close(ofd);

            execl("/usr/bin/tail", "tail", "-n", "5", NULL);

            perror("Cannot exec 'grep'");
            exit(EXIT_FAILURE);
        }

    }

    return EXIT_SUCCESS;
}
```

## Exo 3

Code d'Enzo Baldisserri

```c
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define N 10

#define PIPE_NPAIR "NombresPairs"
#define PIPE_NIMPAIR "NombresImpairs"

#define PIPE_SPAIR "SommesPairs"
#define PIPE_SIMPAIR "SommesImpairs"

void generateur();
void filtre(const char*, const char*);

int main() {
    // On s'assure que les pipe n'existent pas
    unlink(PIPE_NPAIR);
    unlink(PIPE_NIMPAIR);
    unlink(PIPE_SPAIR);
    unlink(PIPE_SIMPAIR);

    // Création des pipes nommés
    if (
        mkfifo(PIPE_NPAIR, 0644) == -1 ||
        mkfifo(PIPE_NIMPAIR, 0644) == -1 ||
        mkfifo(PIPE_SPAIR, 0644) == -1 ||
        mkfifo(PIPE_SIMPAIR, 0644) == -1
    ) {
        perror("Cannot create named pipe");
        exit(EXIT_FAILURE);
    }

    int pid = fork();

    if (pid == -1) {
        perror("Cannot fork generator");
        exit(EXIT_FAILURE);
    }

    if (!pid) {
        generateur();
    } else {
        pid = fork();

        if (pid == -1) {
            perror("Cannot fork filtre");
            exit(EXIT_FAILURE);
        }

        if (pid == 0) {
            filtre(PIPE_NPAIR, PIPE_SPAIR);
        } else {
            filtre(PIPE_NIMPAIR, PIPE_SIMPAIR);
        }
    }

    unlink(PIPE_NPAIR);
    unlink(PIPE_NIMPAIR);
    unlink(PIPE_SPAIR);
    unlink(PIPE_SIMPAIR);

    return 0;
}

void generateur() {
    // Création des pipes pour l'envoie des nombres aléatoires
    int fdp = open(PIPE_NPAIR, O_WRONLY);
    if (fdp == -1) {
        perror("generateur: Cannot open named write pipe");
        exit(EXIT_FAILURE);
    }

    int fdi = open(PIPE_NIMPAIR, O_WRONLY);
    if (fdi == -1) {
        perror("generateur: Cannot open named write pipe");
        exit(EXIT_FAILURE);
    }

    // Initialization du seed pour rand()
    srand(time(0));

    for (int i = 0; i < N; i++) {
        // Génération des nombres
        char x = (char) rand() & 0xFF;

        // Envoie des nombres sur les pipes en fonction de si ils sont pairs ou non
        if (x % 2 == 0) {
            write(fdp, &x, sizeof(x));
        } else {
            write(fdi, &x, sizeof(x));
        }
    }

    char term = -1;
    write(fdp, &term, 1);
    close(fdp);

    write(fdi, &term, 1);
    close(fdi);

    int sum = 0;
    int x;

    // Ouverture des pipes de lecture de la somme
    int fdsp = open(PIPE_SPAIR, O_RDONLY);
    if (fdsp == -1) {
        perror("generateur: Cannot open named read pipe");
        exit(EXIT_FAILURE);
    }

    read(fdsp, &x, sizeof(x));
    close(fdsp);

    sum += x;

    int fdsi = open(PIPE_SIMPAIR, O_RDONLY);
    if (fdsi == -1) {
        perror("generateur: Cannot open named read pipe");
        exit(EXIT_FAILURE);
    }

    read(fdsi, &x, sizeof(x));
    close(fdsi);

    sum += x;

    printf("%d\n", sum);
}

void filtre(const char* PIPE_N, const char* PIPE_S) {
// Ouverture du pipe de lecture des nombres aléatoires
    int fdi = open(PIPE_N, O_RDONLY);
    if (fdi == -1) {
        perror("filtre: Cannot open named read pipe");
        exit(EXIT_FAILURE);
    }

    int sum = 0;
    char x;

    // Tant qu'on ne lit pas un -1, on ajoute ce qui est réçu à la somme
    do {
        read(fdi, &x, sizeof(x));

        if (x != -1) {
            sum += x;
        }
    } while (x != -1);

    // Fermeture du pipe
    close(fdi);

    // Ouverture du pipe pour envoyer la somme
    int fdo = open(PIPE_S, O_WRONLY);
    if (fdo == -1) {
        perror("filtre: Cannot open named write pipe");
        exit(EXIT_FAILURE);
    }

    write(fdo, &sum, sizeof(sum));

    // Fermeture du pipe
    close(fdo);
}
```
