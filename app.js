const TextDecoder = require('text-encoding').TextDecoder;
const Socket = require('net').Socket;

let client = new Socket();
let host = 'localhost';
let port = 411;
let decode = true;
let portArg = false;

for (let i = 0; i < process.argv.length; i++) {
	let arg = process.argv[i];
	if (arg === '--utf8') {
		decode = false;
	} else if (process.argv[i].startsWith('--port')) {
		if (arg.indexOf('=') > 0) {
			port = arg.split('=')[1];
		} else {
			portArg = true;
		}
	} else if (process.argv[i].startsWith('--host')) {
		if (arg.indexOf('=') > 0) {
			host = arg.split('=')[1];
		} else {
			hostArg = true;
		}
	} else if (portArg) {
		port = arg;
		portArg = false;
	} else {
		host = arg;
		hostArg = false;
	}
}

if (portArg) {
	console.error("Port number required with --port.");
	return -1;
}

const EucJpDecoder = new TextDecoder('euc-jp');

console.log(`Decoding from ${decode ? 'euc-jp' : 'utf-8'}.`);

client.on('error', function(err) {
	if (err.message.includes('ECONNREFUSED')) {
		console.error(`Could not connect to port ${port}.  Start server and try again.`);
	} else {
		console.error('Error occurred on data stream---');
		console.error(err);
	}
});

client.connect(port, host, function() {
	console.log(`Connection established on ${host}:${port}.`);

	client.on('data', function(data) {
		let converted = new Uint8Array(data);
		let decoded = decode ? EucJpDecoder.decode(converted) : converted;
		process.stdout.write(decoded);
	});

	client.on('close', function() {
		console.log();
		console.log('Connection terminated.');
	});
});
