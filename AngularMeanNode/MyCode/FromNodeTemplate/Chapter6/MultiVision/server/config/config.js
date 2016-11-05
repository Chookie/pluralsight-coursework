(function () {
    var path = require('path');

    var rootPath = path.normalize(__dirname + "/../../");

    module.exports = {
        development: {
            db: process.env.MONGODB_URL || 'mongodb://localhost:27017/multivision',
            rootPath: rootPath,
            port: parseInt(process.env.PORT, 10) || 3030
        },
        production: {
            db: process.env.MONGODB_URL || 'mongodb://localhost:27017/multivision',
            rootPath: rootPath,
            port: parseInt(process.env.PORT, 10) || 80
        }
    };

}());

