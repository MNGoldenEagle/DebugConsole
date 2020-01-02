var debugServer = new Server({port:411});
var socket = null;

debugServer.on('connection', function(newSocket) {
	socket = newSocket;
	
	newSocket.on('close', function() {
		socket = null;
	});
});

events.onexec(0x800021B0, function() {
	var code = gpr.a0;
	var addr = gpr.a1;
	var len = gpr.a2;
	
	if (code > 1) {
		socket.write('\n\n\n!!!Code was ' + code + ' on addr ' + addr + ' with len ' + len + '\n\n\n');
	}
	
	var str = mem.getblock(addr, len);
	
	if (socket !== null) {
		socket.write(str);
	}
});

// A0 = 0, A1 = no-var string size 30, A2 = 0x30
// Result: should transfer entire string up to A2 - 1 (A2 would include \0)
// A0 = 0, A1 = var string size 53, A2 = 0x45
// Result: should transfer entire string up to A2 - 1 (A2 would include %)
// A0 = 1, A1 = no-var string size D, A2 = 0xD
// Result: should transfer entire string up to A2
// A0 = 1, A1 = no-var string size 1, A2 = 1
// Result: should transfer entire string up to A2
