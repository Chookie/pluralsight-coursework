"use strict";
var classes_1 = require('./classes');
var lib1 = new classes_1.UniversityLibrarian();
var lib2 = new classes_1.PublicLibrarian();
try {
    lib1.assistFaculty = function () { return console.log('assistFaculty replacement method'); };
    lib2.teachCommunity = function () { return console.log('teachCommunity replacement method'); };
}
catch (error) {
    console.log(error.message);
}
lib1.assistFaculty();
lib2.teachCommunity();
//# sourceMappingURL=app.js.map