/**
* Vmstat.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
		
  start: function (cb) {
	  if (!Vmstat.running) {
		  var spawn = require('child_process').spawn;
		  Vmstat.running = true;
		  Vmstat.proc = spawn('vmstat', ['1']);
		  Vmstat.proc.stdout.on('data', function (message) {
			  var data = message.toString();
			  if (!data.match(/[a-z]/)) {
				  var vals = data.split(/  */);
				  var id = 16
				  Vmstat.findOne(id).exec(function (err, stat) {
					  if (!err) {
						  stat.procs.r = vals[1];
						  stat.procs.b = vals[2];
						  stat.memory.swpd = vals[3]
						  stat.memory.free = vals[4]
						  stat.memory.buff = vals[5]
						  stat.memory.cache = vals[6]
						  stat.swap.si = vals[7]
						  stat.swap.so = vals[8]
						  stat.io.bi = vals[9]
						  stat.io.bo = vals[10]
						  stat.system.int = vals[11];
						  stat.system.cs = vals[12];
						  stat.cpu.us = vals[13];
						  stat.cpu.sy = vals[14];
						  stat.cpu.id = vals[15];
						  stat.cpu.wa = vals[16];
						  stat.cpu.st = vals[17];
						  stat.save(function (error) {
							  if (!error) {
								  Vmstat.publishUpdate(id, stat);
							  } else {
								  console.log("error: "+error);
							  }
						  });
					  }
				  });
			  }
		  });
		  Vmstat.proc.stderr.on('data', function (data) {
			  console.log('vmstat: ' + data);
		  });
		  Vmstat.proc.on('close', function (code) {
			  Vmstat.running = false;
			  console.log('vmstat: child process exited with code ' + code);
		  });
		  cb(true, "started");
	  } else {
		  cb(true, "already running")
	  }
  },		
  stop: function (cb) {
	  if (Vmstat.running) {
		  Vmstat.proc.kill();
		  cb(true, "killed vmstat" );
	  } else {
		  cb(true, "vmstat is not running");
	  }
  },		


  attributes: {
//	  procs: {
//		  r: { type: 'integer' },
//		  b: { type: 'integer' }
//	  },
//	  memory: {
//		  swpd: { type: 'integer' },
//		  free: { type: 'integer' },
//		  buff: { type: 'integer' },
//		  cache: { type: 'integer' }
//	  },
//	  swap: {
//		  si: { type: 'integer' },
//		  so: { type: 'integer' }
//	  },
//	  io: {
//		  bi: { type: 'integer' },
//		  bo: { type: 'integer' }  
//	  },
//	  system: {
//		  bo: { type: 'integer' },
//		  int: { type: 'integer' }  
//	  },
//	  cpu: {
//		  cs: { type: 'integer' },
//		  us: { type: 'integer' },
//		  sy: { type: 'integer' },
//		  id: { type: 'integer' },
//		  wa: { type: 'integer' },
//		  wt: {	type: 'integer' }
//	  }
  }
};

