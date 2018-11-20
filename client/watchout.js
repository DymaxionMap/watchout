// start slingin' some d3 here.
(function () {
  // initialize svg and properties
  const svg = d3.select('svg');
  const height = Number(svg.attr('height'));
  const width = Number(svg.attr('width'));
  const g = svg.append('g');

  // initialize radius of circles
  const radius = 20;
  // create random array of enemy positions
  const randomCoordinate = (xmax, xmin) => Math.round(xmin + Math.random() * (xmax - 2 * xmin));
  const getPositions = function (num) {
    const positions = [];
    for (let i = 0; i < num; i++) {
      let x = randomCoordinate(width, radius);
      let y = randomCoordinate(height, radius);
      positions.push({x, y});
    }

    return positions;
  };

  // Drag event handlers
  const dragStart = function () {
    // d3.select(this).classed('active', true);
    d3.select(this).style('fill', 'red');
  };

  const dragging = function (d) {
    d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
  };

  const dragEnd = function () {
    // d3.select(this).classed('active', false);
    d3.select(this).style('fill', 'black');
  };

  // update DOM using data join
  const update = function (data) {
    const circles = g.selectAll('circle').data(data);

    // UPDATE
    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    // ENTER
    circles.enter()
      .append('circle')
      .attr('r', radius)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .call(d3.behavior.drag()
        .on('dragstart', dragStart)
        .on('drag', dragging)
        .on('dragend', dragEnd)
      );

    // EXIT
    // tbd
  };

  const numEnemies = 10;
  // set interval to invoke update function 
  setInterval(() => update(getPositions(numEnemies)), 1000);
})();
