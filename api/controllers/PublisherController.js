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
		}
	
};

