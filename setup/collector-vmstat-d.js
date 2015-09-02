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
			keycol: 0,
   header: 2,
   hunkHeader: 0
		},
		running : false,
		started : "",
		stopped : "",
		linekey : 1,
		stats : {
			disk : {
				reads : {
					t: 0,
					m: 0,
					s: 0,
					ms: 0
				},
				writes : {
					t: 0,
					m: 0,
					s: 0,
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
