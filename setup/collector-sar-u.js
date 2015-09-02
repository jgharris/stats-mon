
module.exports = SarUCollector

function SarUCollector() {
	this.path = "collector";
	this.object = {
		name : "sar-u",
		exec : "sar",
		params : "-u -P ALL 1",
		action : "spawn",
		handler : {
			name: "singleStatRow",
			startcol: 1,
			keycol: 1,
   header: 1,
   hunkHeader: 2,
		},
		running : false,
		started : "",
		stopped : "",
		stats : {
			cpu : {
					us: 0,
					ni: 0,
					sy: 0,
					io: 0,
					st: 0,
					id: 0
			}
		}
	}
}
