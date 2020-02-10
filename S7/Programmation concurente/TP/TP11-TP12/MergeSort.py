import math
import random
import time
from multiprocessing import  Value , Process , Pool
import os
import array


def merge(left, right):
    tableau = []  # tableau vide qui reçoit les résultats
    while len(left) > 0 and len(right) > 0:
        if left[0] < right[0]:
            tableau.append(left.pop(0))
        else:
            tableau.append(right.pop(0))

    tableau += left + right
    return tableau


def merge_sort(Tableau):
    length_Tableau = len(Tableau)
    if length_Tableau <= 1:
        return Tableau
    mid = length_Tableau // 2
    tab_left = Tableau[0:mid]
    tab_right = Tableau[mid:]
    tab_left = merge_sort(tab_left)
    tab_right = merge_sort(tab_right)
    return merge(tab_left, tab_right)


if __name__ == "__main__":     
    N = 20
    Tab = [random.randint(0, 2 * N) for _ in range(N)]
    print("Avant : ", Tab)
    start = time.time()
    Tab = merge_sort(Tab)
    end = time.time()
    print("Après : ", Tab)
    print("Le temps avec 1 seul Process = {} pour un tableau de {} element ".format((end - start) * 1000, N))
