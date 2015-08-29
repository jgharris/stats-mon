/**
 * Collector.js
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

		start : function(name, pub, cb) {
			Collector.findOne(name).exec( function (err, col) {
				if (!col) {
					cb(true, "cannot find collector [" + name + "] ");
				} else if (err) {
					cb(false, "error on collector find [" + name + "] ");
				} else {
					var collector = getCollector(col, pub);
					collector.start(cb);
				}
			});
		},

		stop : function(name, cb) {
			Collector.findOne(name).exec( function (err, col) {
				if (err) cb(true, "cannot find collector [" + col + "] " + err);
				var collector = getCollector(col, name);
				collector.stop(cb);
			});
		},

};

function getCollector (col, name) {
	if (!Collector.list) Collector.list = [];
	if (!Collector.list[col.name]) {
		var ColObj = require('../class/ColObj');
		Collector.list[col.name] = new ColObj(col, name);
	}
	return Collector.list[col.name];
}
