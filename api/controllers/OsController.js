/**
 * OsController
 *
 * @description :: Server-side logic for managing os
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		mon: function (req, res) {
			Os.find(function(err, stats) {
				if (err) {return res.serverError(err);}
				var s = require('os');
				res.locals.scripts = [ '/js/mon-os.js' ];
				return res.view('mon', {title: 'os', os: s, stat: stats[0]});
			});
		}	
};

