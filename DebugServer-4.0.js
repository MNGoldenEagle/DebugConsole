var debugServer = new Server();
debugServer.listen(411, "127.0.0.1");
console.print("Server open on port 411. Awaiting connection.\n");
var socket = null;

debugServer.on('connection', function(newSocket) {
	socket = newSocket;
	console.print("Connection to client established.\n");
	socket.write("Server reporting ready status.\n");
	
	newSocket.on('end', function() {
		console.print("Connection to client lost.\n");
		socket = null;
	});
});

var captureEvent = null;

events.onstatechange(function(event) {
	if (event.state === EMU_LOADED_ROM || event.state === EMU_STARTED) {
		var is_proutSyncPrintf = null;
		checksum = mem.u32[0xB0000010];
		console.print("Checksum found: " + checksum);

		switch (checksum) {
			case 0x917D18F6:
				version = "Debug";
				is_proutSyncPrintf = 0x800021b0;
			default:
				version = "Unknown";
				is_proutSyncPrintf = 0x800021b0;
		};

		console.print("Version detected is " + version + ".  Registering callback on " + number.hex(is_proutSyncPrintf) + ".\n");

		captureEvent = events.onexec(is_proutSyncPrintf, function() {
			var addr = gpr.a1;
			var len = gpr.a2;

			var str = mem.getblock(addr, len);
	
			if (socket !== null) {
				socket.write(str);
			}
		});
	} else if (event.state === EMU_STOPPED) {
		is_proutSyncPrintf = null;
		events.remove(captureEvent);
		captureEvent = null;
	}
});
