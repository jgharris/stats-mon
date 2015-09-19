/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		dashboard: function (req, res) {
			var os = require('os');
			return res.view('dashboard', { os: os });
		},	
};

