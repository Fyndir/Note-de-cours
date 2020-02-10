import random, time , os
from multiprocessing  import Process, Semaphore , Array , Value , Pool , Manager
import ctypes
import math
import random
from MergeSort import merge_sort

def estpremier(num):
    if num > 1:    
        if num == 2:
            return True 
        for i in range(2, num):        
            if num%i == 0: 
                return False
                break
        return True    
    else: 
        return False
 
def RemplirTableau(NbNombre):
     MesNombres = []
     MesNombres+= [i for i in range(NbNombre)]
     return MesNombres

def trouverNbPremier_Segment(Tableau,segmentdebut,segmentfin,TableauPremier,sem):
    TableauPremierLocal = []
    for i in range(segmentdebut,segmentfin) : 
        if estpremier(Tableau[i]):
            TableauPremierLocal.append(Tableau[i])
    sem.acquire()
    TableauPremier += TableauPremierLocal
    sem.release()

def trouverNbPremier_Multiprocess(Tableau,TableauPremier):    
    segmentdebut=0
    segmentfin = len(Tableau)//os.cpu_count()
    mesProcess = []
    sem = Semaphore(1)
    for i in range(os.cpu_count()):
        p = Process(target=trouverNbPremier_Segment , args= (Tableau,segmentdebut,segmentfin,TableauPremier,sem))
        mesProcess.append(p)
        p.start()
        segmentdebut=segmentfin+1
        segmentfin+=len(Tableau)//os.cpu_count()    
    for process in mesProcess:
        process.join()

    return TableauPremier

 
if __name__ == "__main__":
    NbNombre = 100000
    MesNombres = RemplirTableau(NbNombre)

    with Manager() as manager:
        TableauPremier =  manager.list()
        datedebut = time.time()
        Premiers = trouverNbPremier_Multiprocess(MesNombres,TableauPremier)
        datefin = time.time()

        print("il y a {} nombres premier entre {} et {} en multiprocess ".format(len(Premiers),0,NbNombre))
        print("temps d'execution  multiprocess: {}".format(datefin-datedebut))      
       
