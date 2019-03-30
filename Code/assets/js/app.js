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

// Define the div for the tooltip
var toolTip = d3.select("svg").append("div")	
    .attr("class", "d3-tip");

// RETRIEVE DATA FROM CSV FILE
d3.csv("assets/data/data.csv").then(function(healthData) {
    // if (error) return error;

// convert strings to ints
healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });


// CREATE PLOT
// shift everything over by the margins
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

 // draw scale for x axis
  var xScale = d3.scaleLinear()
        .domain(d3.extent(healthData, d => d.poverty))
        .range([0, chartWidth]);
        // .padding(0.1);

// draw scale for y axis
  var yScale = d3.scaleLinear()
  .domain(d3.extent(healthData, d=>d.healthcare))
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

// x axis label
chartGroup
  .append("text")
  .attr("x", chartWidth/2)
  .attr("y", chartHeight + 35)
  .text("% of Poverty");

// y axis label
chartGroup
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (chartHeight/2))
  .attr("dy", "1em")
  .text("% of Healthcare");


// append circles
chartGroup.selectAll("circle")
.data(healthData)
.enter()
.append("circle")
.attr("cx", d => xScale(d.poverty))
.attr("cy", d => yScale(d.healthcare))
.attr("r", 10)
.attr("class", "stateCircle")
.on("mouseover", function(d) {		
  toolTip.style("display", "block")
        .html(`<strong>${d.state}</strong><hr>${d.poverty}`);
      // .style("left", (d3.event.pageX) + "px")		
      // .style("top", (d3.event.pageY - 28) + "px");	
  })					
.on("mouseout", function() {		
  toolTip.style("display", "none");	
});

// append the text
chartGroup.selectAll(".text")
   .data(healthData)
   .enter()
   .append("text")
   .attr("class", "stateText")
   .text(d => d.abbr)
   .attr("x", d => xScale(d.poverty))
   .attr("y", d => yScale(d.healthcare))
   .attr("font-size", "10px")
   .attr("font-weight", "bold");

chartGroup.call(toolTip);

}); //closing for function reading csv
} // closing for function makeResponsive

makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);


