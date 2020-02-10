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
    
    
    