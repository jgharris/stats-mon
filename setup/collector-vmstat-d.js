module.exports = VmstatDCollector;

function VmstatDCollector() {
	this.path = "collector";
	this.object = {
		name : "vmstat-d",
		exec : "vmstat",
		params : "-dn 1",
		action : "spawn",
		handler : {
			name: "singleStatRow",
			startcol: 0,
			keycol: 0
		},
		running : false,
		started : "",
		stopped : "",
		linekey : 1,
		stats : {
			disk : {
				reads : {
					total: 0,
					merged: 0,
					sectors: 0,
					ms: 0
				},
				writes : {
					total: 0,
					merged: 0,
					sectors: 0,
					ms: 0
				},
				io : {
					cur: 0,
					sec: 0
				}
			}
		}
	}
}
