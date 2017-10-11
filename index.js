/*SVG is selected, margins and width and height are defined*/

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

/*Variables for the x and y axis are created by using the created 'width' and 'height' variables. scaleBand and scaleLinear are used to
compute the position and transformation of the data points: http://d3indepth.com/scales/ */

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

/*"G" is added onto the svg, by altering 'g' you can change the behavior of the (parts of the) svg.
The margins from the 'margin' object are added onto the svg, by adding a transform to 'g'.*/

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/*d3.text is used to load in a .csv file. This is purposely done, so that some cleaning can be done. Function onload is called.*/

d3.text('data.csv').mimeType('text/plain;charset=iso88591').get(onload);


/*The .csv file is cleaned by getting rid of the header, the semicolons are replaced with commas.
The words 'number' and the actual numbers (e.g. 1.4) are effectively removed by replacing them with nothing*/

function onload(err, doc) {
  if (err) throw err;
    var header = doc.indexOf('1 Infectious and parasitic diseases')
    var end = doc.indexOf('\n', header)
    doc = doc.slice(end).trim()
    doc = doc.replace(/number/g, '')
    doc = doc.replace(/;/g, ',')
    doc = doc.replace(/\d\.\d /g, '') /*Thanks @wooorm*/

    /*The csv is parsed and stored in variable cleanedData, pulling 'cause' and 'amount' from their respective columns.
    'amount' has to be turned into a Number, as a string it can't properly be displayed on the y-axis.  */

    var cleanedData = d3.csvParseRows(doc, map)
    function map(d) {
    return {
      cause: d[1],
      amount: Number(d[7])
    }
  }

    /*To remove the footer, we grab the index of the line and splice it from the rest with var remove.
    This means that cleanedData is now ready to be mapped, which is done with .domain
    d3.max is used to get the highest amount from d.amount, and use it as the highest point on the y-axis.*/

    var cyaFooter = cleanedData.indexOf('� Statistics Netherlands, Den Haag/Heerlen 11-10-2017');
    var remove = cleanedData.splice(cyaFooter); /*Thanks @DesleyAalderink*/

    x.domain(cleanedData.map(function(d) { return d.cause; }));
    y.domain([0, d3.max(cleanedData, function(d) { return d.amount; })]);

    /*To allow for interactivity, we listen to the input (checkbox), whenever it changes the function onchange is called*/

  d3.select('input').on('change', onchange);

  function onchange() {

    /*If the checkbox is checked, function sortOnAmount is called. Otherwise, sortonCause is called.*/

    var sort = this.checked ? sortOnAmount : sortOnCause;
    var x0 = x.domain(cleanedData.sort(sort).map(cause)).copy();
    var transition = svg.transition();

    /*Bars are sorted.*/
    svg.selectAll('.bar').sort(sortBar);

    /*The transition is added to actually see the bars move.*/
    transition.selectAll('.bar')
      .delay(delay)
      .attr('x', barX0);

    /*This transition makes the labels move as well.*/
    transition.select('.axis--x')
      .call(d3.axisBottom(x))
      .selectAll('g')
      .delay(delay);

    /*This is the part that actually calculates how the bars need to be sorted, and how they should be moved.*/

    function sortBar(a, b) {
      return x0(cause(a)) - x0(cause(b));
    }

    function barX0(d) {
      return x0(cause(d));
    }

    function delay(d, i) {
      return i * 50;
    }
  }

  /*This is where the axis--x and axis--y class are created, so that they can be used for e.g. transitions
  The amount of ticks on the y-axis, and the format they should be in are also defined*/

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "s")) /*8 ticks defined on y axis.*/

  g.selectAll(".bar")
    .data(cleanedData)
    .enter().append("rect") /*For every datapoint, a new rectangle is added to the SVG.*/
      .attr("class", "bar") /*A class by the name of bar is added to each rectangle, this can be edited in the css file.*/
      .attr("x", function(d) { return x(d.cause); }) /*The x position is determined by the entry in the CSV file*/
      .attr("y", function(d) { return y(d.amount); }) /*The y position is determined by the entry in the CSV file*/
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.amount); });
};

/*These are the functions that are used by the sorting checkbox, they calculate which values should go first.
The functions amount and cause make d.amount and d.cause approachable by parts of the code that don't have the 'd' parameter
or want to pass a parameter onto d.amount and d.cause*/

function sortOnAmount(a, b) {
  return amount(b) - amount(a);
}

function sortOnCause(a, b) {
  return d3.ascending(cause(a), cause(b));
}

function amount(d) {
  return d.amount;
}

function cause(d) {
  return d.cause;
}

/* Bar Chart parts taken from: https://bl.ocks.org/mbostock/3885304
Sort functionality parts from: https://github.com/cmda-fe3/course-17-18/blob/master/site/class-4/sort/index.js
Parts of https://docs.google.com/presentation/d/1TpoPilc1qVIQU07u_IdPeNqSZcbgliPaLF0zZUWGvWE/ were used for csv editing*/
