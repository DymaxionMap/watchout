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
      .attr('cy', d => d.y);

    // EXIT
    // tbd
  };

  const numEnemies = 10;
  // set interval to invoke update function 
  setInterval(() => update(getPositions(numEnemies)), 1000);
})();
