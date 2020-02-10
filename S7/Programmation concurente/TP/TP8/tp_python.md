# Ex 1

```py
n = int(input("input a number: "))
if n < 10:
	to_print = ""
	for i in range(1,n+1):
		to_print += str(i)
		print(to_print)
else:
	print("too big")
```

# Ex 2

```py
class Student:
	def __init__(self, name, age, grades):
		self.nom = name
		self.age = age
		self.notes = grades

students = [Student("student" + str(x), x, [y+x for y in range(5)]) for x in range(10)]

mean = 0
min = 20
max = 0
for i in range(5):
	for student in students:
		mean += student.notes[i]
		if student.notes[i] < min:
			min = student.notes[i]
		if student.notes[i] > max:
			max = student.notes[i]
	print("module " + str(i) + " moyenne: " + str(mean/len(students)) + " min: " + str(min) + " max: " + str(max))
```

# Ex 3
```py
inp = str(input("file: "))
file = open(inp, "r")
txt = file.read()
print("nb char: " + str(len(txt)))
print("nb lines: " + str(len(txt.split("\n"))))
print("nb words: " + str(len(txt.split(" "))))
distinct = list(set(txt.split(" ")))
print("distinct: ", end = "")
print(distinct)
first = " ".join(txt.split(" ")[0:19])
print("20 1st words: " + first)
```

# Ex 4

```py
import os
fld = input("folder: ")
for root, dirs, files in os.walk(fld):
    path = root.split(os.sep)
    print((len(path) - 1) * '---', os.path.basename(root))
    for file in files:
        print(len(path) * '---', file)
```