// display graphs of data for each CPU from sar-u collector
function SarUWidget(widget) {
	this.widget = widget;
	subscribe(widget.name);
	this.charts = [];
}

SarUWidget.prototype.charts;
SarUWidget.prototype.widget;

// put all the right data in all the right places
SarUWidget.prototype.update = function(chart, item) {
	var x = (new Date()).getTime(); // current time
	chart.series[2].addPoint([ x, parseFloat(item.us) + parseFloat(item.ni) ], true, true);
	chart.series[1].addPoint([ x, parseFloat(item.sy) + parseFloat(item.st) ], true, true);
	chart.series[0].addPoint([ x, parseFloat(item.io) ], true, true);
}

// one CPU chart
SarUWidget.prototype.oneChart = function(title)
{
	var data = makeSlots(this.widget.slots);
	this.charts[title] = new Highcharts.Chart({
		chart : {
			renderTo : this.widget.id+"-"+title,
			type : 'areaspline',
			//animation: Highcharts.svg, // don't animate in old IE
			marginRight : 10
		},
		title : {
			text : ""
		},
		xAxis : {
			type : 'datetime'
			//tickPixelInterval : 100
		},
		yAxis : {
			min : 0,
			max : 100,
			title : {
				text : ''
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>'
						+ Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)
						+ '<br/>' + Highcharts.numberFormat(this.y, 2);
			}
		},
		legend : {
			enabled : false
		},
		credits : false,
		exporting : {
			enabled : false
		},
		plotOptions : {
			areaspline : {
				stacking : 'normal',
				lineColor : '#666666',
				lineWidth : 0,
				marker : {
					lineWidth : 0,
					lineColor : '#666666'
				}
			}
		},
		series : [ {
			name : 'io',
			fillColor : '#DC3912',
			data : data
		}, {
			name : 'sy',
			fillColor : '#FF9900',
			data : data
		}, {
			name : 'us',
			fillColor : '#109618',
			data : data
		} ]

	});
}

function makeSlots(slots) {
	// generate an array of random data
	var data = [], time = (new Date()).getTime(), i;

	slots = 0 - slots;
	for (i = slots; i <= 0; i += 1) {
		data.push({
			x : time + i * 1000,
			y : 0
		});
	}
	return data;
}
