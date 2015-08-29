
var sails = require("sails");
console.log("loading");
sails.load(function() {
  console.log("loaded");
  Collector.find({name: "vmstat-d"}).exec(function (err, col) {
			console.log(err, col);
  });
//  Collector.destroy({name: "vmstat"}).exec(function (err) {
//			console.log("called back:", err);
//   process.exit();
//  });
});

