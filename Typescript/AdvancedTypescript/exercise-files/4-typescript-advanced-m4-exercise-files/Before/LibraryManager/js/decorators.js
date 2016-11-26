"use strict";
function sealed(name) {
    return function (target) {
        console.log("Sealing the constructor: " + name);
        Object.seal(target);
        Object.seal(target.prototype);
    };
}
exports.sealed = sealed;
function logger(target) {
    var newConstructor = function () {
        console.log("Creating new instance.");
        console.log(target);
    };
    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = target;
    return newConstructor;
}
exports.logger = logger;
//# sourceMappingURL=decorators.js.map