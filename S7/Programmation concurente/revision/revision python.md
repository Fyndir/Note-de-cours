# Syntaxe clef : 

## Import :
```py
import sys
from random import *
import math
import time
import os
from multiprocessing  import Process, Semaphore , Array , Value
```

## declaration object : 

```py
class Student:
	def __init__(self, name, age, grades):
		self.nom = name
		self.age = age
		self.notes = grades
```

## Queue / semaphore  / Process:

On  considère  deux  processus  producteurs  P1  et  P2  qui  produisent  des  messages  (nombres  entiers  tirés aléatoirement) et les déposent dans deux queues (files message vues en cours) Q1 et Q2 respectivement (Qi pour Pi, i=1,2). Deux processus consommateurs C1 et C2 consomment les messages : C1 ceux déposés dans Q1, C2 ceux déposés dans Q2; avec la contrainte que lorsqu’un processus Ci (i=1,2) consomme un message, il attendra que l’autre processus Cj (j=3-i) ait consommé un message lui aussi pour continuer à consommer un autre message (Rendez-vous  entre  C1  et  C2  après  chaque  consommation).  Synchroniser  ces  processus  en  utilisant  les sémaphores. 

```py

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
    p2 = Process(target=P2, args=(Q2,))
    p3 = Process(target=C1, args=(sem1,sem2,Q1))    
    p4 = Process(target=C2, args=(sem1,sem2,Q2))
    mesProcess = [p1,p2,p3,p4]
    for process in mesProcess :
        process.start()
    for process in mesProcess :
        process.join()
```

## execlp / pipe

Ecrire un script python qui prend en parametre des fichier .c qui les compiles séparément dans des fork et créé un executable

```python

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

## pool :

calcul de pi avec la methode de monte carlo en multi process

```py
def frequence_de_hits_pour_n_essais(nb_iteration):    
    count = 0
    for i in range(nb_iteration):
        x = random.random()
        y = random.random()
        if x * x + y * y <= 1:
            count += 1
    return count

def frequence_de_hits_pour_n_essais_multiprocess(nb_iteration):    
    nb_iteration_process = nb_iteration//os.cpu_count()
    pool = Pool() 
    Processes = []
    for i in range(os.cpu_count()):
        Processes.append(pool.apply_async(frequence_de_hits_pour_n_essais, args = [nb_iteration_process,]))
    count = sum(process.get() for process in Processes)
    return count
```

## Value / get_lock :
```py
def remplirArray(MonArray):   
      for i in range(len(MonArray)):
        MonArray[i]=randint(0,1000)  

def SommeArray(MonArray,Sommetotal,ideb,ifin):  
    Somme= 0
    for i in range(ideb,ifin):
        Somme+=MonArray[i]
    print("la somme du segment est de : {}".format(Somme))
    with Sommetotal.get_lock():
        Sommetotal.value+=Somme

def SommeMultiProcess(MonArray,NbProcess,Sommetotal):
    SegmentDebut = 0
    SegmentFin = int(len(MonArray)//NbProcess)
    MesProcess = [] 
    for i in range(NbProcess):
        p = Process(target=SommeArray, args=(MonArray,Sommetotal,SegmentDebut,SegmentFin))
        SegmentDebut+=int(len(MonArray)//NbProcess)
        SegmentFin+=int(len(MonArray)//NbProcess)
        MesProcess.append(p)
        p.start()
    for i in range(NbProcess):
        MesProcess[i].join()

if __name__ == "__main__":  
    Sommetotal=Value("d",0)    
    LongueurArray = 1000000
    NbProcess=os.cpu_count()
    MonArray = Array("d",LongueurArray,lock=True)
    remplirArray(MonArray)
    with Sommetotal.get_lock():
        Sommetotal.value=0
    SommeMultiProcess(MonArray,os.cpu_count(),Sommetotal)
```