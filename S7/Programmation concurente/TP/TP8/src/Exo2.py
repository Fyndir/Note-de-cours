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
		# print(student.nom)
		# print(student.age)
		# print(student.notes)
		mean += student.notes[i]
		if student.notes[i] < min:
			min = student.notes[i]
		if student.notes[i] > max:
			max = student.notes[i]
	print("module " + str(i) + " moyenne: " + str(mean/len(students)) + " min: " + str(min) + " max: " + str(max))