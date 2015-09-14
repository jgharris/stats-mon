/**
 * RemoteCollector.js
 *
 * @description :: Subscribe to a collector on a remote node server
 * @docs        :: 
 */

module.exports = RemoteCollector;

function RemoteCollector(name, host) {
	this.name = name;
	this.host = host;
	this.running = false;
	this.remote = getRemoteSocket(host);
}

RemoteCollector.prototype.running;
RemoteCollector.prototype.name;
RemoteCollector.prototype.host;
RemoteCollector.prototype.remote;

// subscribe to collector on remote node-console
// triggers start
// republish messages
RemoteCollector.prototype.start = function (cb) {
	var obj = this;
	this.remote.connect(function (status, message) {
		console.log("connected: ", obj, status, message);
		if (!obj.running) {
			console.log("get", obj.name)
			obj.remote.socket.get("/publisher/subs/"+obj.name, function (status, message) {
				console.info("got", status, "m:", message);
				obj.running = true;
				cb(status, message);
			});
		}
	});
}

//get socket connection to remote server
function getRemoteSocket (host) {
	if (!Collector.remoteSockets) Collector.remoteSockets = [];
	if (!Collector.remoteSockets[host]) {
		var RS = require('../class/RemoteSocket');
		Collector.remoteSockets[host] = new RS(host);
	}
	console.log("socket", host, Collector.remoteSockets[host]);
	return Collector.remoteSockets[host];
}

