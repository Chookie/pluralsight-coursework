'use strict';

const Student = require('../Student');
const Course = require('../Course');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect();

describe('Student', function () {
  const studentName = 'John Doe';
  const studentGrade = 5;

  it('should save the info on the student and create and id when created', function (){
    const student = Student.create("John Doe", 5);

    student.name.should.exist;
    // or could do
    should.exist(student.name)
    student.name.should.equal(studentName);

    should.exist(student.grade);
    student.grade.should.equal(studentGrade);

    student.id.should.exist;
  });

  it('should advance grade by 1 when advance grade is called', function () {
    // ARRANGE
    // Tests more readable if duplicate the arrange rather than put in before test
    const student = Student.create("John Doe", 5);

    // ACT
    student.advanceGrade();

    // ASSERT
    student.grade.should.equal(studentGrade + 1);
  });
});
