import os, time,math, random, sys
from array import array  # Attention : différent des 'Array' des Process
import os
from multiprocessing  import Process, Semaphore , Array , Value , Pool , Manager
import ctypes
import random


CLEARSCR = "\x1B[2J\x1B[;H"  # Clear SCReen

def init(size):
    return [[random.randint(0,1) for i in range(size)]for j in range(size)]

def getVoisin(x,y,mon_tableau):
    voisins = 0
    if(x < len(mon_tableau)-1 and x >= 0) :
        voisins+=mon_tableau[x-1][y]
        voisins+=mon_tableau[x+1][y]              
    if(y < len(mon_tableau[x])-1 and y >= 0):
        voisins+=mon_tableau[x][y-1]
        voisins+=mon_tableau[x][y+1]
    if (y < len(mon_tableau)-1 and x >= 0):
        voisins+=mon_tableau[x-1][y+1]               
    if (x < len(mon_tableau)-1 and y >= 0):        
        voisins+=mon_tableau[x+1][y-1]
    if (x<len(mon_tableau)-1 and y < len(mon_tableau[x])-1):
        voisins+=mon_tableau[x+1][y+1] 
        voisins+=mon_tableau[x-1][y-1] 
    return voisins

def life(mon_tableau):
    new_tableau = [[0 for i in range(len(mon_tableau))]for j in range(len(mon_tableau))]
    for i in range(len(mon_tableau)):
        for j in range(len(mon_tableau[i])):            
            voisins = getVoisin(i,j,mon_tableau)
            if (mon_tableau[i][j]==1)  :
                new_tableau[i][j]=1 if (voisins>=2 and voisins<3) else 0 
            else:
                new_tableau[i][j]=1 if (voisins == 3) else 0           
    return new_tableau

def affichage(mon_tableau):
    effacer_ecran()
    for i in range(len(mon_tableau)):
        for j in range(len(mon_tableau[i])):
            if (mon_tableau[i][j] == 0):
                print(" ",end='')
            else : 
                print("#",end='')
        print()
    time.sleep(0.5)
    

def effacer_ecran():
    print(CLEARSCR, end='')         


if __name__ == "__main__":
    mon_tableau=init(120)
    while True:
        mon_tableau= life(mon_tableau)
        affichage(mon_tableau)
