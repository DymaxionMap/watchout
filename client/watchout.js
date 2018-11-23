// start slingin' some d3 here.
(function () {
  // initialize svg and properties
  const svg = d3.select('svg');
  const height = Number(svg.attr('height'));
  const width = Number(svg.attr('width'));
  const g = svg.append('g');

  // Scorebox
  const scoreBox = d3.select('.current');
  const highScoreBox = d3.select('.highscore');
  let score = 0;
  let highScore = 0;

  // Player and enemy radius
  const radius = 20;

  // Enemy positions
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

  // Collision checking
  const collided = function (playerX, playerY, enemyX, enemyY) {
    return Math.sqrt(Math.pow(enemyX - playerX, 2) + Math.pow(enemyY - playerY, 2)) < 2 * radius;
  };

  const checkCollision = function (enemyX, enemyY) {
    const player = g.select('.player');
    const playerX = Number(player.attr('cx'));
    const playerY = Number(player.attr('cy'));

    if (collided(playerX, playerY, enemyX, enemyY)) {
      console.log('oh noes! collided!');
      score = 0;
    }
  };

  // Drag event handlers
  const dragStart = function () {
    d3.select(this).classed('active', true);
    d3.select(this).style('fill', 'yellow');
  };

  const dragging = function (d) {
    d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
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

  const moveAndCollideTween = function (d) {
    let enemy = d3.select(this);
    let startX = Number(enemy.attr('cx'));
    let startY = Number(enemy.attr('cy'));
    let endX = d.x;
    let endY = d.y;
    return (function(t) {
      let x = startX + (endX - startX) * t;
      let y = startY + (endY - startY) * t;
      checkCollision(x, y);
      enemy.attr('cx', d => x);
      enemy.attr('cy', d => y);
    });
  };

  // update enemies 
  const updateEnemies = function (data) {
    const enemies = g.selectAll('.enemy').data(data);

    // UPDATE
    enemies
      .transition()
      .duration(1000)
      .tween('moveAndCollide', moveAndCollideTween);

    // ENTER
    enemies.enter()
      .append('circle')
      .attr('r', radius)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .classed('enemy', true)
      .style('fill', 'black');

  };

  const increaseScore = function () {
    score += 10;
    scoreBox.text(`Current score: ${score}`);
    if (score > highScore) {
      highScore = score;
      highScoreBox.text(`High score: ${highScore}`);
    }
  };

  const numEnemies = 10;

  // Kick off the game
  const play = function () {
    updatePlayer(getPositions(1));
    updateEnemies(getPositions(numEnemies));
    setInterval(function () {
      updateEnemies(getPositions(numEnemies));
    }, 1000);
    setInterval(increaseScore, 200);
  };

  play();

})();
