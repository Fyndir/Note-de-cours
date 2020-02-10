n = int(input("input a number: "))
if n < 10:
	to_print = ""
	for i in range(1,n+1):
		to_print += str(i)
		print(to_print)
else:
	print("too big")