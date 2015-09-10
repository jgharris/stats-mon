module.exports = refresh; 

function refresh(collector) {
	this.line = 0;
	this.hunkLine = 0;
	this.first = true;
	this.ref = "";
}

refresh.prototype.ref = "";				// total line number
refresh.prototype.lineno = 0;				// total line number
refresh.prototype.hunkLineno = 0;			// line number in this hunk
refresh.prototype.first = true;			// so we know it is the first

refresh.prototype.processHunk = function (data) {
	var newData = this.parseHunk(data);
	return newData;
}

refresh.prototype.parseHunk = function (data) {
	var newData = [];
	var str = data.toString();
	str = str.replace(/^\n\n*/, "");

	var ref = { code: str};
	this.first = false;
	newData.push(ref);
	return newData;
}

