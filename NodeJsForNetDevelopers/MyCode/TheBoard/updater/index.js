(function (updater){

    var socket = require('socket.io');

    updater.init = function (server) {
        var io = socket.listen(server);

        // Socket is the connecting client. Maybe lots of them.
        io.sockets.on("connection", function (socket) {
            console.log("Socket was connected");

            //socket.emit("showThis", "This is from the server");

            socket.on("join category", function (category) {
                socket.join(category);
            });

            // First parameter is the key
            socket.on("newNote", function (data) {
                // Broadcast will send to every client except the one for the socket we are receiving on
                socket.broadcast.to(data.category).emit("broadcast note", data.note);
            });

/*            // First parameter is the key
            socket.on("newNote", function (data) {
                // Broadcast will send to every client except the one for the socket we are receiving on
                socket.broadcast.emit("broadcastNote", data.note);
            });*/
        });
    };

}(module.exports));