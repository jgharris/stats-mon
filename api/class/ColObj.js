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
		
		if (this.collector.action == "repeat") {
			if (!this.repeat(this.collector.rate)) {
				cb(false, "wont go");
				return;
			}
		}

		
		// all set
		cb(true, "started");
	} else {
		cb(true, "already running");
	}
}

// publish data as an update of the Publisher
ColObj.prototype.updateStats = function (name, newData) {
	Publisher.publishUpdate(name, newData);
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
	if (!this.proc) return false ;

	// update status
	this.objUpdate({ running: true, started: new Date().toISOString()});
	this.running = true;

	// stop when process dies 
	var obj = this;
	this.proc.on('close', function (code) {
		obj.running = false;
		obj.objUpdate({ running: false, stopped: new Date().toISOString()});
		if (code) console.log(this.collector.exec + ': process exit code ' + code);
	});
	
	// get the right handler for this command
	var han=this.getHandler(this.collector);
	if (!han) return false;
	
	// process command output
	obj = this;
	var line = 1;
	this.proc.stdout.on('data', function(data) {
		var newData = han.processHunk(data, line);
		obj.updateStats(obj.publisher, newData);
	});
	
	return true;
}

ColObj.prototype.repeat = function (rate) {
	var spawn = require('child_process');
	var obj = this;
	var proc = spawn.exec(this.collector.exec, 
		function (error, stdout, stdin) {
			var newData = [];
			var ref = { refresh: stdout };
			newData.push(ref);
			obj.updateStats(obj.publisher, newData);
			setTimeout(function () { obj.repeat() }, rate);
	});
	if (!proc) return false ;

	// update status
//	this.objUpdate({ running: true, started: new Date().toISOString()});
//	this.running = true;

	return true;
}
