var HelloWorld = (function () {
    function HelloWorld(message) {
        this.message = message;
    }
    return HelloWorld;
}());
var hello = new HelloWorld('Hello Typescript');
console.log(hello.message);
console.log("Hello Visual Studio Code");
//# sourceMappingURL=app.js.map