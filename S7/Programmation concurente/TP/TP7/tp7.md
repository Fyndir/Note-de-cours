# Sémaphores

> Les `#include` ne sont pas intégrés dans le compte-rendu, se référer au dossier `src`.

```c
// dijkstra.c
// bibliothèque pour la gestion des sémaphores
// (donnée dans le cours)

#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/sem.h>

// Définition de constantes pour le nommage des semaphores
#define SEM_1 1
#define SEM_2 2
#define SEM_3 3
#define SEM_4 4

int sem_create(key_t cle, int initval)
{
    int semid;

    union semun {
        int val;
        struct semid_ds *buf;
        ushort *array;
    } arg_ctl;

    semid = semget(cle, 1, IPC_CREAT | IPC_EXCL | 0666);

    if (semid == -1) {
        semid = semget(cle, 1, 0666);
        if (semid == -1) {
            perror("Erreur semget()");
            exit(1);
        }
    } else {
        arg_ctl.val = initval;
        if (semctl(semid, 0, SETVAL, arg_ctl) == -1) {
            perror("Erreur initialisation sémaphore");
            exit(1);
        }
    }

    return(semid);
}

// Prendre un token
void P(int semid) {
    struct sembuf sempar;
    sempar.sem_num = 0;
    sempar.sem_op = -1;
    sempar.sem_flg = 0;
    if (semop(semid, &sempar, 1) == -1) perror("Erreur operation P");
}

// Vendre un token
void V(int semid) {
    struct sembuf sempar;
    sempar.sem_num = 0;
    sempar.sem_op = 1;
    sempar.sem_flg = 0;
    if (semop(semid, &sempar, 1) == -1) perror("Erreur opération V");
}

void sem_delete(int semid) {
    if (semctl(semid, 0, IPC_RMID, 0) == -1) perror("Erreur dans destruction sémaphore");
}

```

## Exo 1:

Un système est composé de deux tâches (traitements) T1 et T2 soumises à la contrainte de précédence T1 < T2.
Ces deux tâches appartiennent à deux processus différents qui doivent être synchronisés ⇒ Le deuxième processus doit
retarder l’exécution de la tâche T2 jusqu’à ce que le premier processus termine la tâche T1.

### create.c
```c
// Création des sémaphores

int main(void) {
    sem_create(SEM_1, 1);
    return EXIT_SUCCESS;
}
```

### tache1.c
```c
int main(void) {
    // On prend un token dans le sémaphore
    P(SEM_1);

    // Execution d'une longue tâche...
    printf("Tache 1, début...\n");
    sleep(2);
    printf("Tache 1, fin...\n");

    // On repose le token
    V(SEM_1);

    return EXIT_SUCCESS;
}

```

### tache2.c
```c
int main(void) {
    // On prend un token dans la sémaphore
    // Si la tache 1 a déjà pris le token, on va être bloqué jusqu'à ce qu'elle le repose
    P(SEM_1);
    printf("Tache 2");
    V(SEM_1);

    return EXIT_SUCCESS;
}

```

### del.c
```c
int main(void) {
    // Suppression des sémaphores
    // /!\ Ceux-ci restent dans le système jusqu'à la fermeture de la session
    // si on ne les supprime pas

    sem_delete(SEM_1);
    return EXIT_SUCCESS;
}
```

## Exo 2:

Deux processus P1 et P2 souhaitent établir un rendez-vous avant l’exécution de la fonction fRendezVous_1() pour
l’un et fRendezVous_2() pour l’autre. En utilisant les sémaphores, écrire les programmes P1.c et P2.c permettant
d’établir ce rendez-vous.

Version 2 : Rendez-vous à 2 et à 3 : Réaliser un rendez-vous entre 3 processus P1, P2 et P3.

### Représentation de la solution

| P1  | P2  | P3  |
|-----|-----|-----|
| S2+ | S1+ | S1+ |
| S3+ | S3+ | S2+ |
| S1- | S2- | S3- |
| S1- | S2- | S3- |

> Le "**+**" correspond à `V(x)`, "**-**" à `P(x)`

### create.c
```c
int main(void) {
    sem_create(SEM_1, 0);
    sem_create(SEM_2, 0);
    sem_create(SEM_3, 0);
    return EXIT_SUCCESS;
}
```

### rdv1.c
```c
int main(void) {
    V(SEM_2);
    V(SEM_3);
    P(SEM_1);
    P(SEM_1);

    printf("Tache 1\n");

    return EXIT_SUCCESS;
}
```

### rdv2.c
```c
int main(void) {
    V(SEM_1);
    V(SEM_3);
    P(SEM_2);
    P(SEM_2);

    printf("Tache 2\n");

    return EXIT_SUCCESS;
}
```

### rdv3.c
```c
int main(void) {
    V(SEM_1);
    V(SEM_2);
    P(SEM_3);
    P(SEM_3);

    printf("Tache 3\n");

    return EXIT_SUCCESS;
}
```

### del.c
```c
int main(void) {
    sem_delete(SEM_1);
    sem_delete(SEM_2);
    sem_delete(SEM_3);
    return EXIT_SUCCESS;
}
```

## Exo 3:

Pour réaliser un mécanisme de communication un à plusieurs, on utilise un ensemble de processus composé
d’émetteurs et de récepteurs. Un émetteur produit un message (à simuler par l’affichage d’un message sur écran)
et se met en attente jusqu’à ce qu’il y ait n-1 récepteurs au rendez-vous. Un récepteur lancé attend l’émission et
l’arrivée des autres récepteurs. Prenons l’exemple d’un rendez-vous 1 à 2 :
1. $> recepteur & // Le récepteur 1 se met en attente
2. $> emmeteur i & // L’émetteur 2 affiche le message i et se met en attente
3. $> emmeteur j & // L’émetteur 3 produit le message j et se met en attente
4. $> recepteur & // Le récepteur 4 débloque 1 et 2.
5. $> recepteur & // Le récepteur 5 au Rendez-vous avec l’émetteur 3 - Attente
6. $> recepteur & // Débloque 3 et 5.

### Représentation de la solution

| E   | R   |
|-----|-----|
| R-  | R+  |
| R-  | E-  |
| E+  |     |
| E+  |     |

> Le "**+**" correspond à `V(x)`, "**-**" à `P(x)`

### create.c
```c
int main(void) {
    sem_create(SEM_1, 0);
    sem_create(SEM_2, 0);
    return EXIT_SUCCESS;
}
```

### emetteur.c
```c
int main(void) {

    printf("Je suis un émetteur et j'arrive\n");
    fflush(stdout);

    P(SEM_1);
    P(SEM_1);

    V(SEM_2);
    V(SEM_2);

    printf("Je suis un émetteur et je pars\n");
    fflush(stdout);
}
```

### recepteur.c
```c
int main(void) {

    V(SEM_1);

    printf("Je suis un récepteur et j'arrive\n");
    fflush(stdout);

    P(SEM_2);

    printf("Je suis un récepteur et je pars\n");
    fflush(stdout);
}
```

### del.c
```c
int main(void) {
    sem_delete(SEM_1);
    sem_delete(SEM_2);
    return EXIT_SUCCESS;
}
```