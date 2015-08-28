/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

	// set up exit processing
	process.stdin.resume();//so the program will not close instantly

	function exitHandler(options, err) {
		if (options.cleanup) {
			console.log('cleanup');
//			Collector.cleanUp(function(status, message) {
//				if (status) {
//					console.log('cleaned: ' + message);
//				} else {
//					console.log('cleaning error: ' + message);
//				}
//				process.exit();
//			});
		}
		if (err) console.log(err.stack);
		process.exit();

	}

	//do something when app is closing
	process.on('exit', exitHandler.bind(null,{cleanup:true}));

	//catches ctrl+c event
	process.on('SIGINT', exitHandler.bind(null, {exit:true}));

	//catches uncaught exceptions
	process.on('uncaughtException', exitHandler.bind(null, {exit:true}));	

	// It's very important to trigger this callback method when you are finished
	// with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
	cb();
};


