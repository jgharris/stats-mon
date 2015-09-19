io.socket.on('connect', function() {
	io.socket.on("message", updateDashboard);
	if (typeof Widgets != "undefined")
		setupWidgets();
});

var subscribe = function(name, params) {
	io.socket.get('/publisher/subs/' + name, params, function(data) {
		console.log("subs", data);
	});
}

// update the correct widget with this data
function updateDashboard(message) {
	Widgets.forEach(function(widget) {
		if (message.id == widget.name) {
			updateCharts(widget, message.data);
		}
	});
}

// create chart, update item
function updateCharts(obj, data) {
	data.forEach(function(item) {
		var key;
		for (key in item) {
		}
		// make new charts when needed
		if (typeof obj.w.charts[key] == "undefined") {
			createSpan(obj, key);
			obj.w.oneChart(key);
		}
		// update charts with data
		obj.w.update(obj.w.charts[key], item[key]);
	});
}

// create the span to hold this chart
function createSpan(obj, title) {
	var render = obj.id;
	var span = $('<div>');
	var id = render + "-" + title;
	span.attr("id", id);
	var outer = $('<span><span class="charttitle">' + render + "-" + title
			+ "</span></span>");
	outer.append(span);
	$('#' + render).append(outer);
}

function setupWidgets() {
	Widgets.forEach(function(widget) {
		//$('#'+widget.id).innerHTML = "loading: " + widget.id + " " + widget.type;
		var w;
		if (widget.name == "sar-u") {
			widget.w = new SarUWidget(widget);
		}
	});
}

