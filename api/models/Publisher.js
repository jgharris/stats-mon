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
				cb(true, "cannot find collector [" + name + "]");
			} else {
				Collector.start(col.collector, cb);
			}
		});
	},

	stop : function(name, cb) {
		Publisher.findOne(name).exec(function(err, col) {
			if (!col) {
				cb(true, "cannot find collector [" + name + "]");
			} else {
				Collector.stop(col.collector, cb);
			}
		});
	}
};
