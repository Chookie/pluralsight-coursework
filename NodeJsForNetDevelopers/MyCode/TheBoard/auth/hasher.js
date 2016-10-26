(function (hasher) {

    // Built into node so don't need to npm
    var crypto = require("crypto");

    hasher.createSalt = function () {
        var len = 8;
        // generating random bytes.  Len/2 to give 4 bytes. 4 bytes in hex gives a string length 8.  Then substring to ensure is only 8.
        // 6.6 Securing passwords @ 2:55
        return crypto.randomBytes(Math.ceil(len/2)).toString("hex").substring(0,len);
    };

    hasher.computeHash = function (source, salt) {
        // hmac is encryption algorithm.  sha1 is fast encryption but might want more secure for something like banking
        // Salt makes the encryption algorithm a little more random
        var hmac = crypto.createHmac("sha1", salt);
        // Create the hash
        var hash = hmac.update(source);
        return hash.digest("hex");
    };

}(module.exports));