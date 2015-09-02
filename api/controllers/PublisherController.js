/**
 * PublisherController
 *
 * @description :: Server-side logic for managing publishers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		start: function (req, res) {
			var col = req.param('id');
			Publisher.start(col, function (succeed, message) {
				if (succeed) {
					return res.ok(message);
				} else {
					return res.serverError("cannot start " + col + ": " + message);
				}
			});
		},
		stop: function (req, res) {
			Publisher.stop(req.param('id'), function (succeed, message) {
				if (succeed) {
					return res.ok(message);
				} else {
					return res.serverError("cannot stop  " + col + ": " + message);
				}
			});
		},
		mon: function (req, res) {
			var name = req.param('id');
//			Publisher.start(name, function (succeed, message) {
//				if (!succeed) return res.serverError("cannot start  " + name + ": " + message);
				Publisher.findOne(name).exec(function(err, pub) {
						if (err) {return res.serverError(err);}
						Collector.findOne(pub.collector, function(err, col) {
							var os = require('os');
							return res.view('mon', {title: name, os: os, stat: col.stats});
						});
				});
//			});
		},
		subs: function (req, res) {
			Publisher.subs(req.param('id'), req, function (succeed, message) {
				if (succeed) {
					return res.ok(message);
				} else {
					return res.serverError(message);
				}
			});
		}
	
};

