const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 150, right:150, top:50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// add frame
const FRAME = 
d3.select("#frame")
	.append("svg")
		.attr("height", FRAME_HEIGHT)
		.attr("width", FRAME_WIDTH)
		.attr("class", "frame");

const data = [55000, 48000, 27000, 66000, 90000];

// scaling
const MAX_Y = d3.max(data, (d) => {return d;});

const Y_SCALE = d3.scaleLinear()
					.domain([0, MAX_Y + 10000])
					.range([0, VIS_HEIGHT]);

FRAME.selectAll("points")
		.data(data)
		.enter()
		.append("circle")
			.attr("cx", MARGINS.left)
			.attr("cy", (d) => {return Y_SCALE(d) + MARGINS.top})
			.attr("r", 10)
			.attr("class", "point");

FRAME.append("g")
		.attr("transform", 
			"translate(" + (MARGINS.left / 2) + "," + MARGINS.top + ")")
		.call(d3.axisLeft(Y_SCALE).ticks(5))
			.attr("font-size", "15px");