module.exports = singleStatRow; 

function singleStatRow(collector) {
	this.keycol = collector.handler.keycol;
	this.startcol = collector.handler.startcol;
	this.columns = collector.stats;
}

singleStatRow.prototype.columns = {};
singleStatRow.prototype.keycol = {};
singleStatRow.prototype.startcol = {};

singleStatRow.prototype.processHunk = function (data) {
	var newData = this.parseHunk(data);
	return newData;
}

singleStatRow.prototype.parseHunk = function (data) {
	var lines = data.toString().split(/\n/);
	var newData = [];
	var vals = [];
	var start = this.startcol;
	var keycol = this.keycol;
	var cols = this.columns;
	lines.forEach(function (line) {
		if (line == "") return;
		vals = line.split(/  */);
		count = start;
		var ret = getObject(cols, keycol);
		newData.push(ret);
	});

	return newData;
	
	function getObject(column, keyid) {
		var ret = {};
		for (key in column) {
			if (typeof(column[key]) == "object") {
				var k = key;
				if (count==keyid) {
					k = vals[count];
					count++;
				}
				ret[k] = getObject(column[key], 0);
			} else {
				ret[key] = vals[count];
				count++;
			}
		}
		return ret;
	}
	
}
