# Exercice 1 

Calcule la moyenne des notes passées en parametre 

```python
import sys
moyenne = 0
if (len(sys.argv) > 2):
    notes = list(map(lambda arg: int(arg) , sys.argv[1:]))
    for note in notes:
        if note > 20 or note < 0 :
            print('Note non valide')
            break
        else:
            moyenne += note
    print('Moyenne ; {}'.format(moyenne / len(notes)))
else:
    print('Aucune Moyenne à afficher')
    sys.exit(0)

```

# Exercice 2

Calcul la somme des elements d'un tableau de N entier générer aléatoirement en passant par deux processus : Un pour les membres impairs et un pour les membres pairs

```python
from multiprocessing import Pipe,Process
import random

tube = Pipe()

sommeImpair=0
sommePair=0

def SommePair(notes):
    global sommePair 
    for i in range(0,len(notes),2):
       sommePair += int(notes[i])
    tube[1].send(sommePair)

def SommeImpair(notes):
    global sommeImpair
    for i in range(1,len(notes),2):
        sommeImpair += int(notes[i])
    tube[1].send(sommeImpair)

N = 10
L = [random.randint(0,1000) for i in range(N)]

if __name__ == '__main__':   
    p = Process(target=SommeImpair, args=(L,))
    p.start()
    p = Process(target=SommePair, args=(L,))
    p.start()
    p.join()
    p.join()

    print(str(tube[0].recv()+tube[0].recv()))
```

# Exercice 3

Ecrire un script python qui prend en parametre des fichier .c qui les compiles séparément dans des fork et créé un executable

```python
import os
import sys
from multiprocessing import Pipe,Process

sortie,entre = Pipe()

def Compil(arg : str):
    name = arg.replace(".c",".o")
    entre.send(name)
    entre.close()
    os.execlp('gcc','gcc','-c',arg,'-o',name)   

Processus = []

if __name__ == '__main__':   
    if len(sys.argv) < 2: 
        print("Pas de fichier à compiler")
        sys.exit(0)
    for arg in sys.argv[1:]:
        p = Process(target=Compil, args=(arg,))
        p.start()
        Processus.append(p)
    nameo = []
    for proc in Processus:
        nameo.append(sortie.recv())
        proc.join()
    sortie.close()
    os.execlp('gcc','gcc','-o',"compil",*nameo)      
```
