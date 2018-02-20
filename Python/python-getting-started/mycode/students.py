students = [];


def get_students_titlecase():
    students_titlecase = [];
    for student in students:
        students_titlecase.append(student["name"].title())
    return students_titlecase;


def print_students_titlecase():
    students_titlecase = get_students_titlecase()
    print(students_titlecase)


def add_student(name, student_id=332):
    student = {"name": name, "student_id": student_id}
    students.append(student)


def save_file(student):
    try:
        f = open("students.py.txt", "a")
        f.write(student + "\n")
        c.close()
    except Exception:
        print("Could not write file")


def read_file():
    try:
        f = open("students.py.txt", "r")
        for student in f.readlines():
            add_student(student)
        f.close()
    except Exception:
        print("Could not read file")


def enter_students():
    while True:
        new_student=input("Add a student? ") == "y"
        if not new_student:
            break
        new_name = input("Enter a student name: ")
        new_id = input("Enter student id: ")
        add_student(new_name, new_id)
        save_file(new_name)


read_file()
print_students_titlecase()

enter_students()    
