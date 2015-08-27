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

		start : function(name, cb) {
			Collector.findOne(name).exec( function (err, col) {
				if (!col) {
					cb(true, "cannot find collector [" + name + "] ");
				} else if (err) {
					cb(false, "error on collector find [" + name + "] ");
				} else {
					var collector = getCollector(col);
					collector.start(cb);
				}
			});
		},

		stop : function(name, cb) {
			Collector.findOne(name).exec( function (err, col) {
				if (err) cb(true, "cannot find collector [" + col + "] " + err);
				var collector = getCollector(col);
				collector.stop(cb);
			});
		}
};

function getCollector (col) {
	var collector = Collector[col.name];
	if (!collector) {
		var ColObj = require('../class/ColObj');
		collector = new ColObj(col);
		Collector[col.name] = collector;
	}
	return collector;
}
