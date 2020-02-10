# Semaphore et memoire partagée

## Exercice 1 : Somme des éléments d'une liste

Pour  calculer  la  somme  des  éléments  d’une  liste L  à N  entiers  on  utilise  deux  processus  qui  s’exécutent en parallèle. Le processus P1 parcourt les éléments d’indice impair et le processus P2 parcourt les éléments d’indice pair. Le processus père lance les 2 processus P1 et P2. A la fin d’exécution de P1 et P2, le processus père affiche le résultat stocké dans la variable partagée Somme

```py
from multiprocessing import Process, Value
from random import randint

def sum_list(S, L, r):
    with S.get_lock():
        S.value += sum(k for i, k in enumerate(L) if i % 2 == r)


if __name__ == "__main__":
    N = 10
    L = [randint(0, 1000) for i in range(N)]

    S = Value('d', 0.0)

    p1 = Process(target=sum_list, args=(S, L, 0))
    p2 = Process(target=sum_list, args=(S, L, 1))

    p1.start()
    p2.start()

    p1.join()
    p2.join()

    print('sum = {}'.format(S.value))

```

## Exercice 2 : Précédence de taches

On considère un ensemble de six tâches séquentielles : A, B, C, D, E et F avec les contraintes suivantes :
* La tâche A doit précéder les tâches B, C, D [ces trois tâches ne peuvent démarrer qu’à la fin d’exécution de la tâche]. 
* Les tâches B et C doivent précéder la tâche E.  
* Les tâches D et E doivent précéder la tâche F.

Réaliser la synchronisation de ces tâches en utilisant les sémaphores.  Chaque tâche est exécutée par un processus. Chaque processus se contente d’afficher son état. 

```py
from multiprocessing import Process,Semaphore

def A():
    print("A")    
    sem1.release()
    sem1.release()
    sem1.release()

def B():
    sem1.acquire()
    print("B")
    sem2.release()

def C():
    sem1.acquire()
    print("C")
    sem2.release()

def D():
    sem1.acquire()
    print("D")
    sem3.release()

def E():
    sem2.acquire()
    sem2.acquire()
    print("E")
    sem3.release()

def F():
    sem3.acquire()
    sem3.acquire()
    print("F")
    
   
    
if __name__ == '__main__':   
    
    sem1 = Semaphore(0)
    sem2 = Semaphore(0)
    sem3 = Semaphore(0)

    p = Process(target=A, args=())
    p.start()
    p = Process(target=B, args=())
    p.start()
    p = Process(target=C, args=())
    p.start()
    p = Process(target=D, args=())
    p.start()
    p = Process(target=E, args=())
    p.start()
    p = Process(target=F, args=())
    p.start()

    p.join()
    p.join()
    p.join()
    p.join()
    p.join()
    p.join()

```

## Exercice 3 : Précédence des taches

Un système est composé de deux tâches T1 et T2 soumises à la  contrainte  de  précédence T1  <  T2.  Ces  deux  tâches appartiennent  à  deux  processus P1  et P2    différents  qui doivent être synchronisés Le processus P2 doit retarder l’exécution  de  la  tâche  T2  jusqu’à  ce  que  le  premier processus P1 termine la tâche T1.

```py
from multiprocessing import Process,Semaphore
import time

def T1(sem1):   
    time.sleep(1)
    print("T1")
    sem1.release()

def T2(sem1):  
    sem1.acquire() 
    print("T2")
    
   
    
if __name__ == '__main__':   
    
    sem1 = Semaphore(0)

    p = Process(target=T1, args=(sem1,))
    p.start()
    p = Process(target=T2, args=(sem1,))
    p.start()
   
    p.join()
    p.join()

```

## Exercice 4 : Rendez-vous de deux processus 

On  considère  deux  processus  producteurs  P1  et  P2  qui  produisent  des  messages  (nombres  entiers  tirés aléatoirement) et les déposent dans deux queues (files message vues en cours) Q1 et Q2 respectivement (Qi pour Pi, i=1,2). Deux processus consommateurs C1 et C2 consomment les messages : C1 ceux déposés dans Q1, C2 ceux déposés dans Q2; avec la contrainte que lorsqu’un processus Ci (i=1,2) consomme un message, il attendra que l’autre processus Cj (j=3-i) ait consommé un message lui aussi pour continuer à consommer un autre message (Rendez-vous  entre  C1  et  C2  après  chaque  consommation).  Synchroniser  ces  processus  en  utilisant  les sémaphores. 

```py
from multiprocessing import Process,Queue,Semaphore
import random

def P1(Q1):   
    for i in range(100):
        Q1.put(random.randrange(0,100))     
  
def P2(Q2): 
    for i in range(100):   
        Q2.put(random.randrange(100,200))   
   

def C1(sem1,sem2,Q1):
    while not Q1.empty():
        sem1.acquire()
        val=Q1.get()
        print(val)
        sem2.release()

def C2(sem1,sem2,Q2):
    while not Q1.empty():
        sem2.acquire()
        val=Q2.get()
        print(val)
        sem1.release()
    
   
    
if __name__ == '__main__':   
    Q1= Queue()
    Q2= Queue()
    
    sem1 = Semaphore(1)
    sem2 = Semaphore(0)

    p1 = Process(target=P1, args=(Q1,))
    p1.start()
    
    p2 = Process(target=P2, args=(Q2,))
    p2.start()

    p3 = Process(target=C1, args=(sem1,sem2,Q1))
    p3.start()
    
    p4 = Process(target=C2, args=(sem1,sem2,Q2))
    p4.start()

    p1.join()
    p2.join()
    p3.join()
    p4.join()

```

## Exercice 5 : Rendez-vous à 2 et à 3 – Exercice supplémentaire

Deux processus P1 et P2 souhaitent établir un rendez-vous avant l’exécution de la fonction rdv1() pour l’un et rdv2() pour l’autre. En utilisant les sémaphores, écrire les scripts  P1 et P2 permettant d’établir ce rendez-vous.

```py
from multiprocessing import Process, Semaphore

def P1(s1: Semaphore, s2: Semaphore):
    s1.acquire()
    s2.release()
    print('rdv1')

def P2(s1: Semaphore, s2: Semaphore):
    s1.release()
    s2.acquire()
    print('rdv2')

if __name__ == "__main__":
    s1, s2 = Semaphore(0), Semaphore(0)
    p1, p2 = Process(target=P1, args=(s1, s2)), Process(target=P2, args=(s1, s2))

    p1.start()
    p2.start()

    p1.join()
    p2.join()
```

## Exercice 6 : Le Rendez-vous – Exercice supplémentaire

Pour  réaliser  un  mécanisme  de  communication  un  à  plusieurs,  on  utilise  un  ensemble  de  processus  composé d’émetteurs et de récepteurs. Un émetteur produit un message (à simuler par l’affichage d’un message sur l’écran) et se met en attente jusqu’à ce qu’il y ait N-1 récepteurs au rendez-vous. Un récepteur lancé attend l’émission et l’arrivée des autres récepteurs.  Prenons l’exemple d’un rendez-vous 1 à 2 - On exécute ce script avec 4 récepteurs et 2 émetteurs : 

>$> python exercice6 R E E R R R 
Voici un exemple des affichages de ce script : 
* Le processus 1 récepteur se met en attente
* Le processus 2 émetteur produit un message et se met en attente
* Le processus 3 émetteur produit un message et se met en attente
* Le processus 4 récepteur débloque les processus 1 et 2  et consomme le le message.
* Le processus 5 récepteur au Rendez-vous  avec le processus 3 émetteur - Attente
* Le processus 6 récepteur débloque les processus 3 et 5. 

```py

```
