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
