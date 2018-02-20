students = []


class Student:
    def __init__(self, name, student_id=332):
        self.name = name
        self.student_id = student_id
        students.append(self)

    def __str__(self):
        return "Student " + self.name


mark = Student("Mark")
print(mark)
