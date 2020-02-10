from multiprocessing import Process, Semaphore

def P1(s1: Semaphore, s2: Semaphore):
    s1.acquire()
    s2.release()
    print('rdv1')

def P2(s1: Semaphore, s2: Semaphore):
    s1.release()
    s2.acquire()
    print('rdv2')

if __name__ == "__main__":
    s1, s2 = Semaphore(0), Semaphore(0)
    p1, p2 = Process(target=P1, args=(s1, s2)), Process(target=P2, args=(s1, s2))

    p1.start()
    p2.start()

    p1.join()
    p2.join()