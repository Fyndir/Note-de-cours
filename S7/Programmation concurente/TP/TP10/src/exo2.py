from multiprocessing import Process,Semaphore

def A():
    print("A")    
    sem1.release()
    sem1.release()
    sem1.release()

def B():
    sem1.acquire()
    print("B")
    sem2.release()

def C():
    sem1.acquire()
    print("C")
    sem2.release()

def D():
    sem1.acquire()
    print("D")
    sem3.release()

def E():
    sem2.acquire()
    sem2.acquire()
    print("E")
    sem3.release()

def F():
    sem3.acquire()
    sem3.acquire()
    print("F")
    
   
    
if __name__ == '__main__':   
    
    sem1 = Semaphore(0)
    sem2 = Semaphore(0)
    sem3 = Semaphore(0)

    p = Process(target=A, args=())
    p.start()
    p = Process(target=B, args=())
    p.start()
    p = Process(target=C, args=())
    p.start()
    p = Process(target=D, args=())
    p.start()
    p = Process(target=E, args=())
    p.start()
    p = Process(target=F, args=())
    p.start()

    p.join()
    p.join()
    p.join()
    p.join()
    p.join()
    p.join()
