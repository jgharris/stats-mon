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
			return res.view('vmstat/mon', {os: os, stat: stats[0]});
		});
	}
};

