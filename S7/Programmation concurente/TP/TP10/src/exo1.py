from multiprocessing import Process, Value
from random import randint

def sum_list(S, L, r):
    with S.get_lock():
        S.value += sum(k for i, k in enumerate(L) if i % 2 == r)


if __name__ == "__main__":
    N = 10
    L = [randint(0, 1000) for i in range(N)]

    S = Value('d', 0.0)

    p1 = Process(target=sum_list, args=(S, L, 0))
    p2 = Process(target=sum_list, args=(S, L, 1))

    p1.start()
    p2.start()

    p1.join()
    p2.join()

    print('sum = {}'.format(S.value))
