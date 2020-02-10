import time
import sys
import multiprocessing as mp
from ctypes import *

size = 100000000
ones = [1 for i in range(size)]

global lock
lock = mp.Lock()
global sumAll
sumAll = mp.Value(c_int, 0)

def divided_sum(sublist):
	with lock:
		global sumAll
		sumAll.value += sum(sublist)

processes = [mp.Process(target=divided_sum, args=(ones[int(i*(len(ones)/int(sys.argv[1]))):int((i+1)*(len(ones)/int(sys.argv[1])))],)) for i in range(int(sys.argv[1]))]

for process in processes:
	process.start()
	process.join()
