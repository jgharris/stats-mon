// We need this to build our post string
var querystring = require('querystring');
var http = require('http');

var args = process.argv.slice(2);
var js = require('./'+args[0]);
var col = new js();
var name = col.object.name;
var path = "/" + col.path;

Delete(path, name, function () {
	Post(col.path, JSON.stringify(col.object));
});
function Delete(path, name, cb) {

	// An object of options to indicate where to post to
	var req = http.get({ host : 'localhost', port : '50100',  path : path+"/destroy/"+name}, function (res) {
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			console.log('destroy: ' + chunk);
		});
	});
	cb();
}

function Post(path, data, file) {
	// Build the post string from an object

	// An object of options to indicate where to post to
	var post_options = {
		host : 'localhost',
		port : '50100',
		path : "/"+path+"/create/",
		method : 'POST',
		headers : {
//			'Content-Type' : 'application/x-www-form-urlencoded',
			'Content-Length' : data.length
		},
	};

	// Set up the request
	console.log("requesting", post_options);
	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			console.log('create: ' + chunk);
		});
	});
	post_req.write(data);
	post_req.end();
}
