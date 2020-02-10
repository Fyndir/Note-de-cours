# Code de antoine gamain

import random, time , os
from multiprocessing  import Process, Semaphore , Array , Value , Pool
import ctypes

# calculer le nbr de hits dans un cercle unitaire (utilisé par les différentes méthodes)
def CalculPiArctan(nb_iteration):    
    pi=0.00
    for i in range(nb_iteration):
        pi+= 4/(1+(((i+0.5)/nb_iteration)**2))
    return pi/nb_iteration

def CalculPiArctanMulti_Segment(segment_debut,segment_fin,pi,nb_iteration): 
    localpi=0
    for i in range(segment_debut,segment_fin):
        localpi+=4/(1+(((i+0.5)/nb_iteration)**2))
    with pi.get_lock():
        pi.value+= localpi

def CalculPiArctanMulti_multiprocess(nb_iteration):  
    pi= Value(ctypes.c_float,0)
    nb_process = os.cpu_count()
    segmentdebut = 0
    segmentFin = nb_iteration//nb_process
    MesProcess = []
    for i in range(nb_process):
        p=Process(target=CalculPiArctanMulti_Segment, args=(segmentdebut,segmentFin,pi,nb_iteration,))
        MesProcess.append(p)
        p.start()
        segmentdebut = segmentFin
        segmentFin += nb_iteration//nb_process
    for process in MesProcess:
        process.join()
    
    

    return pi.value / nb_iteration
   

if __name__ == "__main__":  
    # Nombre d’essai pour l’estimation
    n=1000000
    Datedeb = time.time()
    pi=CalculPiArctan(n)
    dateFin= time.time()

    print("Valeur estimée Pi par la méthode Mono−Processus : ", pi,"Temps necessaire au calcul : {} secondes".format(dateFin-Datedeb) )

    pi=CalculPiArctanMulti_multiprocess(n)
    DateFinMultiProcess = time.time()

    print("Valeur estimée Pi par la méthode Multi−Processus : ",pi,"Temps necessaire au calcul : {} secondes".format(DateFinMultiProcess-dateFin) )


  

    #TRACE :
    # Calcul Mono−Processus : Valeur estimée Pi par la méthode Mono−Processus : 3.1412604