/**
 * RemoteSocket.js
 *
 * @description :: Get a web socket to a remote node-console, republish the collectors room
 * @docs        :: 
 */

module.exports = RemoteSocket;

function RemoteSocket(host) {
	this.host = host;
	this.url = "http://" + host + ":50100/";
	this.connected = false;			// only connect once
	this.connecting = false;		// connection can take a while to establisth
}

RemoteSocket.prototype.socket = undefined;
RemoteSocket.prototype.host = undefined;
RemoteSocket.prototype.url = undefined;
RemoteSocket.prototype.connected = undefined;
RemoteSocket.prototype.connecting = undefined;

// use the connection now, or connect it, then run it
// example start a collector
RemoteSocket.prototype.connect = function (cb) {
	var sock = require('socket.io-client');
	var sailsIOClient = require('sails.io.js');
	var io = sailsIOClient(sock);
	io.sails.url = this.url;
	
	// establish websocket to remote node-console
	if (!this.connected) {
		if (!this.connecting) {
			this.connecting = true;
			console.info("connecting: ", this.url);
			this.socket = io.sails.connect() ;
		}
		var obj = this;
		
		// once connected set up re-broadcast
		this.socket.on("connect", function (status, message) {
			if (!status) {
				obj.connected = true;
			}
			obj.connecting = false;
			
			// re-broadcast message to host specific room
			obj.socket.on("message", function (message) {
				var room = obj.host + "-" + message.id;
				message.id = room;
				sails.sockets.broadcast(message.id, message);
			});
			
			// whatever...
			cb(status, message);
		});
	} else {
		// whatever...
		cb(undefined, "already connected")
	}
}

RemoteSocket.prototype.update = function (message) {
	var room = this.host + "-" + message.id;
	message.id = room;
//	console.info("broadcast", message.id, message);
	sails.sockets.broadcast(message.id, message);
}

RemoteSocket.prototype.log = function(status, message) {
	console.log(status, message, this.connected, this.host);
}
