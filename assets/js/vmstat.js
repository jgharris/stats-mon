io.socket.on('connect', function () {
	io.socket.get('/vmstat', {}, function () {});
	io.socket.on('vmstat', updateMon);
});

function showMon(stats) {
	$('#Stats').empty().append(oneStatRow(stats[0]));
}

function oneStatRow(stat) {
	var ret = $('<div id=vmstat>');
	var secs = [];
	for (var section in stat) {
		secs.push(section);
	}
	secs.sort();
	secs.forEach (function (section) {
		if ($.type(stat[section]) == "object") {
			var sect = $('<span id='+section+' style="float: left; border: 1px 1px 1px 1px;">');
			sect.append("<h2>"+section+"</h2>");
			var keys = [];
			for (var key in stat[section]) {
				keys.push(key);
			}
			//keys.sort();
			var table = $('<table id=vmstat-table>'); 
			keys.forEach (function (key) {
				var row = "<tr>";
				row += "<th>"+key+"</th>";
				row += "<td id="+section+"_"+key+">"+stat[section][key]+"</td>";
				row +- "</tr>";
				table.append(row);
			});
			sect.append(table);
		}
		ret.append(sect);
	});
	return ret;
}

function updateMon(message) {
	//console.log(message);
	for (var section in message.data) {
		if ($.type(message.data[section]) == "object") {
			for (var key in message.data[section]) {
				$("td[id="+section+"_"+key+"]")[0].innerHTML = message.data[section][key];
			}
		}
	}
}
