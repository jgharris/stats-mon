
module.exports = SarDCollector

function SarDCollector() {
	this.path = "collector";
	this.object = {
		name : "sar-d",
		exec : "sar",
		params : "-d 3",
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
			disk : {
					tps: 0,
					rds: 0,
					wrs: 0,
					rqs: 0,
					qus: 0,
					await: 0,
					svc: 0,
					util: 0
			}
		}
	}
}
