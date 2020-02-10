from multiprocessing import Process,Semaphore
import time

def T1(sem1):   
    time.sleep(1)
    print("T1")
    sem1.release()

def T2(sem1):  
    sem1.acquire() 
    print("T2")
    
   
    
if __name__ == '__main__':   
    
    sem1 = Semaphore(0)

    p = Process(target=T1, args=(sem1,))
    p.start()
    p = Process(target=T2, args=(sem1,))
    p.start()
   
    p.join()
    p.join()
