/**
 * VmstatController
 *
 * @description :: Server-side logic for managing vmstats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	mon: function (req, res) {
		Vmstat.find(function(err, stats) {
			if (err) {return res.serverError(err);}
			var os = require('os');
			return res.view('mon', {title: 'vmstat', os: os, stat: stats[0]});
		});
	},
	start: function (req, res) {
		Vmstat.start(function (succeed, message) {
			if (succeed) {
				return res.ok(message);
			} else {
				return res.serverError("cannot start vmstat: " + message);
			}
		});
	},
	stop: function (req, res) {
		Vmstat.stop(function (succeed, message) {
			if (succeed) {
				return res.ok(message);
			} else {
				return res.serverError("cannot stop vmstat: " + message);
			}
		});
	}
};

