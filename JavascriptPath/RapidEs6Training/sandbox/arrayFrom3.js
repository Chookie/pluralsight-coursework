'use strict';
// Use node to run this one

let amounts = [800, 810, 820];
let salaries = Array.from(amounts, v => v + this.adjustment, { adjustment: 50});
console.log(salaries);