# Code de antoine gamain

import random, time , os
from multiprocessing  import Process, Semaphore , Array , Value , Pool
import ctypes
import math
import random

# calculer le nbr de hits dans un cercle unitaire (utilisé par les différentes méthodes)
def f(x):
    return math.sqrt(1-x**2)

def CalculPiEsperance(nb_iteration):    
    Sumpi=0.00
    for i in range(nb_iteration):
        Sumpi += f(random.uniform(0, 1))
    return Sumpi/nb_iteration*4

def CalculPiEsperance_Segment(nb_iteration,Sumpi):
    localSumPi = 0
    for i in range(nb_iteration):
        localSumPi += f(random.uniform(0, 1))
    with Sumpi.get_lock():
        Sumpi.value+=localSumPi

def CalculPiEsperance_multiprocess(nb_iteration):  
    Sumpi=Value(ctypes.c_float,0)
    nb_process = os.cpu_count()
    MesProcess = []
    for i in range(nb_process):
        p = Process(target=CalculPiEsperance_Segment,args=(nb_iteration//nb_process,Sumpi,))
        MesProcess.append(p)
        p.start()
    for process in MesProcess:
        process.join()
    return Sumpi.value/nb_iteration*4
    

if __name__ == "__main__":  
    # Nombre d’essai pour l’estimation
    n=1000000
    Datedeb = time.time()
    pi=CalculPiEsperance(n)
    dateFin= time.time()

    print("Valeur estimée Pi par la méthode Mono−Processus : ", pi,"Temps necessaire au calcul : {} secondes".format(dateFin-Datedeb) )

    pi=CalculPiEsperance_multiprocess(n)
    DateFinMultiProcess = time.time()

    print("Valeur estimée Pi par la méthode Multi−Processus : ",pi,"Temps necessaire au calcul : {} secondes".format(DateFinMultiProcess-dateFin) )


  

    #TRACE :
    # Calcul Mono−Processus : Valeur estimée Pi par la méthode Mono−Processus : 3.1412604