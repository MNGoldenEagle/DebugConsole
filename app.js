const TextDecoder = require('text-encoding').TextDecoder;
const Socket = require('net').Socket;

let client = new Socket();

client.on('error', function(err) {
	if (err.message.includes('ECONNREFUSED')) {
		console.error('Could not connect to game.  Start server and try again.');
	} else {
		console.error('Error occurred on data stream---');
		console.error(err);
	}
});

client.connect(411, '127.0.0.1', function() {
	console.log('Connection established.');

	client.on('data', function(data) {
		let converted = new Uint8Array(data);
		let decoded = new TextDecoder('euc-jp').decode(converted);
		process.stdout.write(decoded);
	});

	client.on('close', function() {
		console.log();
		console.log('Connection terminated.');
	});
});
