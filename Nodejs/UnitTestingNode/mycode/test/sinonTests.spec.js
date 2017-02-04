'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.should();

describe('sinon tests', function () {
  let student;
  let schedule;

  beforeEach(function () {
    student = {
      dropClass: function (classId, cb) {
        // do stuff
        if (!!cb.dropClass) {
          // if object obmethod exists then call that
          cb.dropClass();
        } else {
          // else call the function
          cb();
        }
      },
      addClass: function(schedule) {
        // console.log(schedule);
        if (!schedule.classIsFull()) {
          return true;
        } else {
          return false;
        }
      }
    };

    schedule = {
      dropClass: function() {
        console.log("class dropped");
      },
      classIsFull: function() {
        return true;
      }
    }
  })

  describe('student.dropclass', function() {
    it('should call the spy callback', function() {
      let spy = sinon.spy();

      student.dropClass(1, spy);
      spy.called.should.be.true;
    });

    it('should call the real callback', function() {
      function onClassDropped() {
        console.log("onClassDropped was called");
      }

      // spy wraps the real function in a proxy and calls it
      let spy = sinon.spy(onClassDropped);

      student.dropClass(1, spy);
      spy.called.should.be.true;
    });

    it('should call the callback even if it\'s a method of an object', function() {
      // This will just create spy of dropClass function
      // not the method on the schedule object.
      //sinon.spy(schedule.dropClass);
      sinon.spy(schedule, 'dropClass');
      student.dropClass(1, schedule);
      schedule.dropClass.called.should.be.true;
    });
  });

  describe('student with stubs', function() {
    it('should call a stubbed method using a function', function() {
      // Stubs the whole object, not just a method.
      let stub = sinon.stub(schedule);

      student.dropClass(1, stub.dropClass);
      stub.dropClass.called.should.be.true;
    });

    it('should call a stubbed method using an object', function() {
      // Stubs the whole object, not just a method.
      let stub = sinon.stub(schedule);

      student.dropClass(1, stub);
      stub.dropClass.called.should.be.true;
    });

    it('should return true when the class is not full', function() {
      let stub = sinon.stub(schedule);
      stub.classIsFull.returns(false);

      const returnVal = student.addClass(stub);
      returnVal.should.be.true;
    });

  });

  describe('student with mocks', function() {
    it('mocks schedule', function() {
      let mock = sinon.mock(schedule);
      const expectation = mock.expects('classIsFull').once();

      student.addClass(schedule);
      expectation.verify();
    })
  })

});
