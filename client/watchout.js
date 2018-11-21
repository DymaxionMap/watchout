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

  // const checkCollision = function (d) {
  //   const {x: enemyX, y: enemyY} = d;
  //   const player = g.selectAll('.player');
  //   const playerX = player.attr('cx');
  //   const playerY = player.attr('cy');

  //   const distance = Math.sqrt((enemyX - playerX) ** 2 + (enemyY - playerY) ** 2);
  //   if (distance < 2 * radius) {
  //     console.log('oh noes!');
  //     console.log('player x, y: ', [playerX, playerY]);
  //     console.log('enemy x, y: ', [enemyX, enemyY]);
  //     console.log('distance, 2*radius', [distance, 2 * radius]);
  //   }
  // };

  const collided = function (playerX, playerY, enemyX, enemyY) {
    return Math.sqrt(Math.pow(enemyX - playerX, 2) + Math.pow(enemyY - playerY, 2)) < 2 * radius;
  };

  const checkCollision = function (d) {
    const {x: playerX, y: playerY} = d;
    const enemies = g.selectAll('.enemy');
    // const playerX = player.attr('cx');
    // const playerY = player.attr('cy');

    enemies.each(function (enemyD) {
      const {x: enemyX, y: enemyY} = enemyD;
      if (collided(playerX, playerY, enemyX, enemyY)) {
        console.log('oh noes!');
        console.log('player x, y: ', [playerX, playerY]);
        console.log('enemy x, y: ', [enemyX, enemyY]);
      }
    });

  };

  // Drag event handlers
  const dragStart = function () {
    d3.select(this).classed('active', true);
    d3.select(this).style('fill', 'yellow');
  };

  const dragging = function (d) {
    d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
    checkCollision(d);
  };

  const dragEnd = function () {
    d3.select(this).classed('active', false);
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
      .classed('player', true)
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

    // enemies.each(checkCollision);
  };


  const numEnemies = 10;
  updateEnemies(getPositions(numEnemies));
  setInterval(function () {
    updateEnemies(getPositions(numEnemies));
    // checkCollision();
  }, 1000);
})();
