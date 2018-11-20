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
    d3.select(this).style('fill', 'yellow');
  };

  const dragging = function (d) {
    d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
  };

  const dragEnd = function () {
    // d3.select(this).classed('active', false);
    d3.select(this).style('fill', 'orange');
  };

  // update player
  const updatePlayer = function (data) {
    const player = g.selectAll('.player').data(data);

    player.enter()
      .append('circle')
      .attr('r', radius)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .classed('.player', true)
      .style('fill', 'orange')
      .call(d3.behavior.drag()
        .on('dragstart', dragStart)
        .on('drag', dragging)
        .on('dragend', dragEnd)
      );
  };

  updatePlayer(getPositions(1));

  // update enemies 
  const updateEnemies = function (data) {
    const enemies = g.selectAll('.enemy').data(data);

    // UPDATE
    enemies
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    // ENTER
    enemies.enter()
      .append('circle')
      .attr('r', radius)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .classed('enemy', true)
      .style('fill', 'black');

    // EXIT
    // tbd
  };

  const numEnemies = 10;
  updateEnemies(getPositions(numEnemies));
  setInterval(() => updateEnemies(getPositions(numEnemies)), 1000);
})();
