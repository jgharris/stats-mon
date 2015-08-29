// set global title in template
//io.socket.on('connect', function () {
//	io.socket.get('/publisher/'+title, {}, function () {
//		io.socket.on("publisher", updateMon);
//	});
//});

var sub = new Subscriber(title);

function Subscriber(name) {
	var obj = this;
	io.socket.on('connect', function() {
		io.socket.get('/publisher/' + name, {}, function() {
			io.socket.on("publisher", obj.update);
		});
	});
}

Subscriber.prototype.update = function(message) {
	message.data.forEach(
		function(data) {
			console.log(data);
			if (data) getOne(data);
		}
	);

	function getOne (data, parent) {
		console.log("getOne:", parent);
		for (var section in data) {
			if (section.match(/__/)) continue;
			var table;
			var search = section;
			if (parent) search=parent+"-"+section;
			if ($.type(data[section]) == "object") {
				table = getTable(message.id, search, parent);
				var next = getOne(data[section], search);
				if (next) {
					var row = $('<tr></tr>');
					row.append("<td colspan=2>"+next+"</td>");
					table.append(row);
				}
			} else {
				var id = message.id + "-" + search;
				if ($('#'+id).length==0) {
					table = getTable(message.id, parent);
					var row = $('<tr></tr>');
					row.append("<th>"+section+"</th><td id='"+id+"'>"+data[section]+"</td>");
					table.append(row);
				} else {
					$('#'+id)[0].innerHTML=data[section];	
				}
			
			}
		}
	}

	
//			var table = getTable(message.id, section);
//				for ( var key in data[section]) {
//					var id = message.id + "_" + section + "_" + key;
//					if ($(id).length) {
//						$("td[id=" + id + "]")[0].innerHTML = data[section][key];
//					}
//				}
//			}
	
	// get table for these stats, create if needed
	function getTable (pub, section, parent) {
		console.log("getTable:", pub, section, parent);
		var id = pub+'-'+section;
		var locate = pub;
		if (parent) locate = pub + "-" + parent;
		var table;
		if ($('#'+id).length>0) {
			table=$('#'+id+'-table');
		} else {
			var span = $('<span id="'+id+'" class="stat"><h2>'+section+'</h2></span>');
			console.log("not found pub:", pub, "section:", section);
			table = $('<table id="'+id+'-table"></table');
			span.append(table);
			if (!parent) {
				$('#'+pub).append(span);
			}
		}
		console.log(table);
		return table;
	}
}
