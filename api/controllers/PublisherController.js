/**
 * PublisherController
 *
 * @description :: Server-side logic for managing publishers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		start: function (req, res) {
			var name = req.param('id');
			Publisher.start(name, function (succeed, message) {
				if (succeed) {
					return res.ok(message);
				} else {
					return res.serverError("cannot start " + name + ": " + message);
				}
			});
		},
		stop: function (req, res) {
			var name = req.param('id');
			Publisher.stop(name, function (succeed, message) {
				if (succeed) {
					return res.ok(message);
				} else {
					return res.serverError("cannot stop  " + name + ": " + message);
				}
			});
		},
		mon: function (req, res) {
			var name = req.param('id');
				Publisher.findOne(name).exec(function(err, pub) {
						if (err) {return res.serverError(err);}
						Collector.findOne(pub.collector, function(err, col) {
							var os = require('os');
							return res.view('mon', {title: name, os: os, stat: col.stats});
						});
				});
		},
		subs: function (req, res) {
			var name = req.param('id');
			Publisher.subs(name, req, function (succeed, message) {
				if (succeed) {
					return res.ok(message);
				} else {
					return res.serverError(message);
				}
			});
		}
	
};

