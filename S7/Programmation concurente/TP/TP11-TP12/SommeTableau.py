import sys
from random import *
import math
import time
import os
from multiprocessing  import Process, Semaphore , Array , Value

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