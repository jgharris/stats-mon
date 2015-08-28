/*
	ColObj


	Collect and update info for a collector

 */

module.exports = ColObj; 

function ColObj(col) {
	this.orig_collector = col;
	this.collector = col;
	this.objUpdate({ running: false, stopped: ''});
}

ColObj.prototype.running = false;

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
			this.running = false;
			obj.objUpdate({ running: false, stopped: new Date().toISOString()});
			if (code) console.log('vmstat: child process exited with code ' + code);
		});
		
		// get the right handler for this command
		var han=this.getHandler();
		if (!han) {
			cb(false, this.collector.name + ": no handler");
			return;
		}
		
		// process command output
		obj = this;
		this.proc.stdout.on('data', function(data) {
			var newData = han.processHunk(data);
			obj.updateStats(obj.collector.name, newData);
		});
		
		// all set
		cb(true, "got going");
	} else {
		cb(true, "still going");
	}
}

// put newData into the stats
// make a new record if needed
ColObj.prototype.updateStats = function (name, newData) {
	Stats.findOne(name).exec(function (err, stat) {
		if (!err) {
			if (!stat) {
				Stats.create({name: name, stats: {}}).exec(function (err, created) {
					update(created, newData);
				});
			} else {
				update(stat, newData);
			}
		}
	});

	// save stats and publish changes
	var update = function(stat, newData) {
		for (key in newData.stats) {
			stat.stats[key] = newData.stats[key];
		}
		stat.save(function (error) {
			if (!error) {
				Stats.publishUpdate(name, newData);
			} else {
				console.log("error: "+error);
			}
		});
	}
}

// get a handler object to process this output
ColObj.prototype.getHandler = function () {
	var han=require("../handlers/"+this.collector.handler);
	this.handler = new han();
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

