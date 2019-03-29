// @TODO: YOUR CODE HERE!
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  };

// svg params
// var svgHeight = window.innerHeight;
// var svgWidth = window.innerWidth;

var svgHeight = 560;
var svgWidth = 960;

// margins
  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

// setting svg (the scatter plot) area
  var chartHeight = svgHeight - margin.top - margin.bottom;
  var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
  var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

console.log("Hello "); //as a check

// RETRIEVE DATA FROM CSV FILE
d3.csv("assets/data/data.csv").then(function(healthData) {
    // if (error) return error;


console.log(" World "); // as a check
console.log(healthData);
   
// convert strings to ints
healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });


console.log("Hello 1"); //as a check
console.log(healthData);
console.log(" World 1"); // as a check
// CREATE PLOT
// shift everything over by the margins
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


 // draw scale for x axis
  var xScale = d3.scaleLinear()
        .domain([d3.min(healthData, d =>d.poverty), d3.max(healthData, d => d.poverty)])
        .range([0, chartWidth]);
        // .padding(0.1);


// draw scale for y axis
  var yScale = d3.scaleLinear()
  .domain([0, d3.max(healthData, d=>d.healthcare)])
  .range([chartHeight, 0]);


// create axes
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

// set x axis to the bottom of the chart area
chartGroup
        .append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

// set the y axis
chartGroup
        .append("g")
        .call(yAxis);

// append circles
chartGroup.selectAll("circle")
.data(healthData)
.enter()
.append("circle")
.attr("cx", d => xScale(d.poverty))
.attr("cy", d => yScale(d.healthcare))
.attr("r", 10)
.attr("fill", "blue")
.attr("opacity", ".5");

});
}

makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);


