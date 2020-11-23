const TextDecoder = require('text-encoding').TextDecoder;
const Socket = require('net').Socket;

let client = new Socket();

const DoDecoding = (process.argv.length > 2 && process.argv[2] === '--utf8') ? false : true;
const EucJpDecoder = new TextDecoder('euc-jp');

console.log(`Decoding from ${DoDecoding ? 'euc-jp' : 'utf-8'}.`);

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
		let decoded = DoDecoding ? EucJpDecoder.decode(converted) : converted;
		process.stdout.write(decoded);
	});

	client.on('close', function() {
		console.log();
		console.log('Connection terminated.');
	});
});
