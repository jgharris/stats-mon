module.exports = VmstatCollector;

function VmstatCollector() {
	this.path = "collector";
	this.object = {
		name : "vmstat",
		exec : "vmstat",
		params : "-n 1",
		action : "spawn",
		handler : {
			name: "singleStatRow",
			startcol: 1,
			keycol: -1,
   header: 2,
   hunkHeader: 0
		},
		running : false,
		started : "",
		stopped : "",
		stats : {
			procs : {
				r : 0,
				b : 0
			},
			memory : {
				swpd : 0,
				free : 0,
				buff : 0,
				cache : 0
			},
			swap : {
				si : 0,
				so : 0
			},
			io : {
				bi : 0,
				bo : 0
			},
			system : {
				int : 0,
				cs : 0
			},
			cpu : {
				us : 0,
				sy : 0,
				id : 0,
				wa : 0,
				st : 0
			}
		}
	}
}
