
module.exports = TopCollector;

function TopCollector() {
	this.path = "collector";
	this.object = {
		name : "top",
		exec : "top",
		params : "-b -c -i -w 132 -d 3",
		action : "spawn",
		handler : {
			name: "refresh"
		},
		running : false,
		started : "",
		stopped : "",
  stats : {
   refresh : ""
  }
	}
}

