module.exports = singleStatRow; 

function singleStatRow() {
	this.columns = {
			procs: { r : 0 , b : 0 },
			memory: { swpd: 0, free: 0, buff: 0, cache: 0 },
			swap: { si : 0 , so : 0 },
			io: { bi : 0 , bo : 0 },
			system: { int : 0 , cs : 0 },
			cpu: { us : 0, sy : 0, id : 0, wa : 0, st : 0 }
	};

}

singleStatRow.prototype.processHunk = function (data) {
	var newData = this.parseHunk(this.columns, data);
	return newData;
}

singleStatRow.prototype.parseHunk = function (columns, data) {
	var vals = data.toString().split(/  */);
	var count = 1;
	var newData = { stats: {} };
	for (key in columns) {
		newData.stats[key] = {};
		for (subkey in columns[key]) {
			newData.stats[key][subkey] = vals[count];
			count++;
		}
	}
	return newData;
}
