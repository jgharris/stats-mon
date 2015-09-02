module.exports = singleStatRow; 

function singleStatRow(collector) {
	this.keycol = collector.handler.keycol;
	this.startcol = collector.handler.startcol;
	this.header = collector.handler.header;
	this.hunkHeader = collector.handler.hunkHeader;
	this.columns = collector.stats;
	this.line = 0;
	this.hunkLine = 0;
	this.first = true;
}

singleStatRow.prototype.columns = {};
singleStatRow.prototype.keycol = {};			// col that defines the row
singleStatRow.prototype.startcol = {};			// first column we are interested in
singleStatRow.prototype.lineno = 0;				// total line number
singleStatRow.prototype.hunkLineno = 0;			// line number in this hunk
singleStatRow.prototype.header = 0;				// how many lines in initial header
singleStatRow.prototype.hunkHeader = 0;			// how many lines in each hunk of output
singleStatRow.prototype.first = true;			// so we know it is the first

singleStatRow.prototype.processHunk = function (data) {
	var newData = this.parseHunk(data);
	return newData;
}

singleStatRow.prototype.parseHunk = function (data) {
	var lines = data.toString().split(/\n/);
	var newData = [];
	var vals = [];
	this.hunkLine = 0;
	lines.forEach(function (line) {
		this.lineno++;
		this.hunkLine++;
		if (this.first) {
			if (this.lineno <= this.header) {return;}
			if (this.hunkLine <= this.hunkHeader+this.header) { return; }
		} else {
			if (this.hunkLine <= this.hunkHeader) { return; }
		}
		if (line == "") return;
		vals = line.split(/  */);
		count = this.startcol;
		var ret = getObject(this.columns, this.keycol);
		newData.push(ret);
	}, this);
	
	this.first = false;

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

