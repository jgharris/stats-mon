/**
 * Collector.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
List = [];
remoteList = [];

module.exports = {

		attributes : {
			name : {
				type : 'string',
				primaryKey : true,
				required : true
			}
		},
		
		getList : function() {
			return get();
		},

		getRemoteList : function() {
			return getRemote();
		},
		
		
		start : function(name, host, cb) {
			if (host) {
				var rc = getRemoteCollector(name, host);
				rc.start(cb);
			} else {
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
			}
		},

		stop : function(name, cb) {
			Collector.findOne(name).exec( function (err, col) {
				if (err) cb(true, "cannot find collector [" + col + "] " + err);
				var collector = getCollector(col, name);
				collector.stop(cb);
			});
		},

};

function get() {
	return List;
}

function getRemote() {
	return remoteList;
}

function getCollector (col) {
	if (!List) List = [];
	if (!List[col.name]) {
		var ColObj = require('../class/ColObj');
		List[col.name] = new ColObj(col);
	}
	return List[col.name];
}

//get collector on remote node-console
function getRemoteCollector (name, host) {
	var col=host + "-" + name;
	if (!remoteList) remoteList = [];
	if (!remoteList[col]) {
		var RC = require('../class/RemoteCollector');
		remoteList[col] = new RC(name, host);
	}
	return remoteList[col];
}

