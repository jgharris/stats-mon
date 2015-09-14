/**
 * Publisher.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes : {
		name : {
			type : 'string',
			primaryKey : true,
			required : true
		}
	},

	start : function(name, cb) {
			Collector.start(name, cb);
	},

	stop : function(name, cb) {
			Collector.stop(name, cb);
	},
	
	subs : function(name, host, req, cb) {
		var room = name;
		if (host) {
			room = host + "-" + name;
		}
		req.socket.join(room);
		console.log("joined: ", room);
		Collector.start(name, host, cb);
		console.log("started: ", host, name);
	}
};

