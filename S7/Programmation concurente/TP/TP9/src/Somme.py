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