/**
 * @description Enemies our player must avoid
 * @constructor
 * @param {number} x - Localização no eixo X
 * @param {number} y - Localização no eixo Y
 * @param {number} speed - Velocidade de movimento do inimigo
 */
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

/**
 * @description Realiza a checagem entre a posição do inimigo e a do jogador
 */
Enemy.prototype.checkCollision = function() {
  var player = window.player;
  var playerPositionRange = player.getPositionRange();
  var collisionOnX = false;
	var collisionOnY = false;

  // Verifica a posição X do inimigo em relação ao jogador
	for(var posX in playerPositionRange.x) {
		if (Math.trunc(this.x) === playerPositionRange.x[posX]) {
			collisionOnX = true;
			break;
		}
	}

  // Verifica a posição Y do inimigo em relação ao jogador
	for(var posY in playerPositionRange.y) {
		if (Math.trunc(this.y) === playerPositionRange.y[posY]) {
			collisionOnY = true;
			break;
		}
	}

  // Verifica se ambos os eixos colidiram
	if (collisionOnX && collisionOnY) {
		player.reset();
	}
}

/**
 * @description Reseta a posição do personagem quando atinge o limite da tela
 */
Enemy.prototype.reset = function() {
  if (this.x > 500) {
    this.x = -100;
  }
}

/**
 * @description Update the enemy's position, required method for game
 * @param {number} dt - a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    this.reset();
    this.checkCollision();
};

/**
 * @description Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Now write your own player class
 * This class requires an update(), render() and
 * a handleInput() method.
 * Enemies our player must avoid
 * @constructor
 */
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
};

/**
 * @description Ajusta o personagem para se mover corretamente no canvas
 * do eixo Y
 * @param {string} direction - direção (cima ou baixo) do jogador no eixo Y
 * @returns {number} direção corrigida do canvas
 */
Player.prototype.setYTrack = function(direction) {
  var ajustedYTracks = [380,300,210,130,50,-30];

  if (direction === "up") {
    for (var i = 0; i < ajustedYTracks.length; i++) {
      if (this.y > ajustedYTracks[i]) {
        this.y = ajustedYTracks[i];
        return this.y;
      }
    }
  } else if (direction === "down") {
    ajustedYTracks.reverse();
    for (var i = 0; i < ajustedYTracks.length; i++) {
       if (this.y < ajustedYTracks[i]) {
         this.y = ajustedYTracks[i];
         return this.y;
       }
    }
  }
}

/**
 * @description Recupera a posição do player com um intervalo de
 * valores para mapear a colisão com maior precisão
 * @returns {object} Range contendo arrays de coordenadas para X e Y
 */
Player.prototype.getPositionRange = function() {
  var xMargin = 80;
	var yMargin = 20;
	var xRange = [];
	var yRange = [];
	var positionRange = {
		"x": xRange,
		"y": yRange
	};

	for(var i = this.x - xMargin; i < this.x + xMargin + 1; i++) {
		xRange.push(i);
	}

	for(var i = this.y - yMargin; i < this.y + yMargin + 1; i++) {
		yRange.push(i);
	}

	return positionRange;
}

/**
 * @description Reinicia o jogador para a posição inicial
 */
Player.prototype.reset = function() {
  var thing = this;
  setTimeout(function(){
    thing.x = 200;
    thing.y = 380;
  }, 100);
}

Player.prototype.checkWinnerCondition = function() {
  if (this.y === -30) {
     this.reset();
  }
}

/**
 * @description Atualiza a movimentação do jogador
 */
Player.prototype.update = function() {
    this.checkWinnerCondition();
};

/**
 * @description  Draw the player on the screen, required method for game
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Receive user input, allowedKeys (the key which was pressed)
 * and move the player according to that input.
 * @param {key} key - tecla direcional
 */
Player.prototype.handleInput = function(key) {
  switch (key) {
    case "left":
      if (this.x > 0) {
        this.x -= 100;
      }
      break;
    case "up":
      if (this.y > 0) {
        this.setYTrack("up");
      }
      break;
    case "right":
      if (this.x < 400) {
        this.x += 100;
      }
      break;
    case "down":
      if (this.y < 400) {
        this.setYTrack("down");
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [
  new Enemy(0,55,100),
  new Enemy(0,140,200),
  new Enemy(0,220,150),
  new Enemy(0,140,50),
  new Enemy(0,55,250)
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
