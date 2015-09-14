/**
 * CollectorController
 *
 * @description :: Server-side logic for managing collectors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
//		start: function (req, res) {
//			var col = req.param('id');
//			Collector.start(col, function (succeed, message) {
//				if (succeed) {
//					return res.ok(message);
//				} else {
//					return res.serverError("cannot start " + col + ": " + message);
//				}
//			});
//		},
//		stop: function (req, res) {
//			Collector.stop(req.param('id'), function (succeed, message) {
//				if (succeed) {
//					return res.ok(message);
//				} else {
//					return res.serverError("cannot stop  " + col + ": " + message);
//				}
//			});
//		}
		status: function (req, res) {
			var os = require('os');
			return res.view('status', { collectors: Collector.getList(), rc: Collector.getRemoteList(), os: os });
		},
};

