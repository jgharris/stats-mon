// set global title in template
io.socket.on('connect', function () {
	if (typeof title != "undefined") {
	Widgets= [];
	io.socket.on("message", updateWidget);
	if (typeof host != 'undefined') {
		subscribe(title, { host: host });
	} else {
		subscribe(title);
	}
	}
});

var subscribe = function(name, params) {
	io.socket.get( '/publisher/subs/'+name, params, function (data) {
		console.log("subs", data);
	});
}
	var updateWidget = function(message) {
//		console.log(message);
		if (!Widgets[message.id]) {
			Widgets[message.id] = new Widget(message.id, name, "top-widget");
			Widgets[message.id].setType("h");
			$('#' + message.id).empty().append(Widgets[message.id].span);
		}
		var w = Widgets[message.id];
		message.data.forEach(function(row) {
			w.add(row);
		});
	}

function Widget (name, short, c) {
	if (!c) var c = "stat";
	if (!short) var short = name;
	this.type = "v";
	this.name = name;
	this.span = $("<span id='"+name+"-span' class='"+c+"'>");
	this.title = $("<h2>"+short+"</h2>");
	this.table = $("<table id="+name+">");
	this.span.append(this.title).append(this.table);
	this.children = {};
}

Widget.prototype.setType = function(n) {
	this.type = n;
}

Widget.prototype.add = function(data) {
	for (var section in data) {
		var name = this.name + "-" + section;
		if ($.type(data[section]) == "object") {
			if (!this.children[name]) {
				var widget = new Widget(name, section);
				widget.add(data[section]);
				this.appendChild(widget);
			} else {
				this.children[name].add(data[section]);
			}
		} else {
			this.appendRow(section, data[section]);
		}
	}
}

Widget.prototype.appendChild = function(widget) {
	if (this.type == "h") {
		this.appendChildH(widget);
	} else {
		this.appendChildV(widget);
	}
}

Widget.prototype.appendChildH = function(widget) {
//	console.log("appendChild", widget);
	this.children[widget.name] = widget;
	this.span.append(widget.span);
}

Widget.prototype.appendChildV = function(widget) {
//	console.log("appendChild", widget);
	this.children[widget.name] = widget;
	var row = $('<tr></tr>');
	var col = ($('<td colspan=2></td>'));
	col.append(widget.span);
	row.append(col);
	this.table.append(row);
}

// use key of "code" to syntax highlight text
Widget.prototype.appendRow = function(key, value) {
//	console.log("appendRow", key, value);
	var id = this.name + "-" + key;
	if ($('#'+id).length==0) {
		if (key == "code") {
			this.table.append("<tr><td colspan=2 id="+id+"><pre><code class='language-clike'>"+value+"</code></pre></td></tr>");
		} else {
			this.table.append("<tr><th>"+key+"</td><td id="+id+">"+value+"</td></tr>");
		}
	} else {
		var html = "";
		if (key == "code") {
			html = "<pre><code  class='language-clike'>"+value+"</code></pre>";
		} else {
			html = value; 
		}
		$('#'+id)[0].innerHTML = html;
	}
	if (key == "code") {
		$('pre code').each(function(i, block) {
			Prism.highlightElement(block);
		});
	}
}

