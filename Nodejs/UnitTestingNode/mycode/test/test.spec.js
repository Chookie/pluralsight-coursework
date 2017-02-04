'use strict';

var chai = require('chai');
var expect = chai.expect;

// This attaches the should function to all js functions
chai.should();

describe('number tests', function() {
    function isEven(num) {
        return num % 2 === 0;
    }

    describe('isEven', function() {
        it('should return true when number is even', function() {
            isEven(4).should.be.true;
        });

        it('should return false when the number is odd', function() {
            // expect is differnt way of doing it
            expect(isEven(3)).to.be.false;
        });
    });


    function add(num1, num2) {
        return num1 + num2;
    }

    describe('Add with setup/teardown', function() {
        let num;

        beforeEach( function() {
            num = 5;
        });

        afterEach( function() {

        });

        it('should be ten when adding 5 to 5', function() {
            num = add(num, 5);
            num.should.equal(10);
        });

        // skip this test for now
        it.skip('should be twelve when adding 7 to 5', function() {
            add(num, 7).should.equal(12);
        });
        // skip this test for now.  Can do same with describe.§
        xit('should be twelve when adding 9 to 5', function() {
            add(num, 9).should.equal(14);
        });
    });
});
