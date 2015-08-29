/*
	ColObj


	Collect and update info for a collector

 */

module.exports = ColObj; 

function ColObj(col, name) {
	this.orig_collector = col;
	this.collector = col;
	this.publisher = name;
	this.objUpdate({ running: false, stopped: ''});
}

ColObj.prototype.running = false;
ColObj.prototype.collector = false;
ColObj.prototype.publisher = false;

ColObj.prototype.start = function (cb) {
	if (!this.running) {

		// fire it up
		if (this.collector.action == "spawn") {
			if (!this.spawn()) {
				cb(false, "wont go");
				return;
			}
		}
		
		// update status
		this.objUpdate({ running: true, started: new Date().toISOString()});
		this.running = true;

		// standard event handlings 
		var obj = this;
		this.proc.on('close', function (code) {
			obj.running = false;
			obj.objUpdate({ running: false, stopped: new Date().toISOString()});
			if (code) console.log('vmstat: child process exited with code ' + code);
		});
		
		// get the right handler for this command
		var han=this.getHandler(this.collector);
		if (!han) {
			cb(false, this.collector.name + ": no handler");
			return;
		}
		
		// process command output
		obj = this;
		this.proc.stdout.on('data', function(data) {
			var newData = han.processHunk(data);
			obj.updateStats(obj.publisher, newData);
		});
		
		// all set
		cb(true, "got going");
	} else {
		cb(true, "still going");
	}
}

// publish data as an update of the Publisher
ColObj.prototype.updateStats = function (name, newData) {
	Publisher.publishUpdate(name, newData);
//	Publisher.findOne(name).exec(function (err, pub) {
//		if (!err) {
//			Publisher.publishUpdate(pub.name, newData);
//		}
//	});
}

// get a handler object to process this output
ColObj.prototype.getHandler = function (stats) {
	var han=require("../handlers/"+this.collector.handler.name);
	this.handler = new han(this.collector);
	return this.handler;
}

// update and save object
// publish changes
ColObj.prototype.objUpdate = function (data) {
	for (key in data) {
		this.collector[key] = data[key];
	}
	var colname=this.collector.name;
	this.collector.save(function (error) {
		if (!error) Collector.publishUpdate(colname, data);
	});
}

ColObj.prototype.stop = function (cb) {
	if (this.running) {
		this.proc.kill();
		this.running = false;
		cb(true, "no going");
	} else {
		cb(true, "not going");
	}
}

ColObj.prototype.spawn = function () {
	var spawn = require('child_process').spawn;
	this.proc = spawn(this.collector.exec, this.collector.params.split(/ /));
	return this.proc;
}

