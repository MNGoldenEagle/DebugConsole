var debugServer = new Server({port:411});
var socket = null;

debugServer.on('connection', function(newSocket) {
	socket = newSocket;
	console.print("Connection to client established.\n");
	socket.write("Server reporting ready status.\n");
	
	newSocket.on('close', function() {
		console.print("Connection to client lost.\n");
		socket = null;
	});
});

events.onexec(0x800021B0, function() {
	var addr = gpr.a1;
	var len = gpr.a2;
	
	var str = mem.getblock(addr, len);
	
	if (socket !== null) {
		socket.write(str);
	}
});
