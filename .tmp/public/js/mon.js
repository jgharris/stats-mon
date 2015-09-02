// set global title in template
io.socket.on('connect', function () {
	Widgets= [];
	io.socket.on("publisher", updateWidget);
	if (title) subscribe(title);
});

var subscribe = function(name) {
	io.socket.get( '/publisher/subs/'+name, {}, function () {});
}
	var updateWidget = function(message) {
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

Widget.prototype.appendRow = function(key, value) {
//	console.log("appendRow", key, value);
	var id = this.name + "-" + key;
	if ($('#'+id).length==0) {
		this.table.append("<tr><th>"+key+"</td><td id="+id+">"+value+"</td></tr>");
	} else {
		$('#'+id)[0].innerHTML = value;
	}
}

