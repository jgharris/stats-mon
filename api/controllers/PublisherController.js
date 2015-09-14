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
			var host = req.param('host');
			var os = require('os');
			return res.view('mon', {title: name, host: host, os: os });
		},
		subs: function (req, res) {
			var name = req.param('id');
			var host = req.param('host');
			Publisher.subs(name, host, req, function (succeed, message) {
				console.log("subs:", succeed, message)
				if (succeed) {
					return res.ok(message);
				} else {
					return res.serverError(message);
				}
			});
		}
	
};

