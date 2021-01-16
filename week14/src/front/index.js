const { json } = require('d3');
const d3 = require('d3');

// define the dimensions and margins of the graph
const   margin = { top: 30, right: 40, bottom: 30, left: 30},
        width = 450 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

function updateData(data) {
    const svg = d3.select("#content")

    // set margins
    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    cnt = svg.append("g")      // translate this svg element to leave some margin.
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // Create a scale: transform value in pixel
    const y = d3.scaleLinear()
        .domain([0, Math.max(...data.map(e => e.h))])           // This is the min and the max of the data
        .range([height, 0]);           // This is the corresponding value I want in Pixel
    
    const x = d3.scaleLinear()
        .domain([0, data.length])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([0, width]);

    cnt.append('g')
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    cnt.append('g')
        .attr("transform", `translate(${width},0)`)
        .call(d3.axisRight(y));


    cnt.selectAll("circles")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", (d, i) => x(i))
          .attr("cy", (d) => y(d.h))
          .attr("r", 7)
}

function getData() {
    console.log('ready to get data!')
    fetch('/data')
        .then(res => res.json())
	    .then(res => {
            updateData(res)
        })
}

// start when window loads...
d3.select(window).on("load", getData)