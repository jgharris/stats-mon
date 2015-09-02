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
		Publisher.findOne(name).exec(function(err, col) {
			if (!col) {
				cb(true, "cannot find publisher [" + name + "]");
			} else {
				Collector.start(col.collector, name, cb);
			}
		});
	},

	stop : function(name, cb) {
		Publisher.findOne(name).exec(function(err, col) {
			if (!col) {
				cb(true, "cannot find publisher [" + name + "]");
			} else {
				Collector.stop(col.collector, cb);
			}
		});
	},
	
	subs : function(name, req, cb) {
		if (!name) return (true, "nothing to do");
		Publisher.find(name).exec(function (err, pubs) {
			if (err) { 
				cb (false, "cannot find "+name);
			} else {
				var pub = pubs[0];
				Publisher.subscribe(req.socket, pubs);
				Collector.start(pub.collector, name, function (status, message) {
					return (status, message);
				});
			}
		});
	}
	
};
