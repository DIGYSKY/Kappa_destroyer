const playerKappa = document.getElementById("kappa");
const boss1Img = document.getElementById("boss1");

let player = {
	speed: 7,
    codaPoint: 0,
    level: {current: 0, damage: {
        1: 250, 2: 400, 3: 500,
        4: 500, 5: 500, 6: 500,
        7: null
    }, heightScore: {
		0: 1000, 1: 5000, 2: 15000, 
		3: 30000, 4: 50000, 5: 75000, 
		6: 1000000
	}
	},
    weapon: {
        damage: 100,
    },
    levelUp: function () {
        this.level.current += 1;
        this.weapon.damage = this.level.damage[this.level.current];
		document.getElementById("level").innerHTML = player.getLevel();
    },
    scoreUp: function () {
        this.codaPoint += this.weapon.damage;
		document.getElementById("score").innerHTML = player.getCodaPoint();
    },
    dead: function () {
        this.codaPoint = 0;
        this.level.current = 0;
        this.weapon.damage = 100;
        opponent.setOpponent();
    },
    getCodaPoint: function () {
        return this.codaPoint;
    },
	setKappa: function (playerKappa) {
        this.src = `./img/kappa_level${this.level.current}.png`;
		playerKappa.removeAttribute("src");
		playerKappa.setAttribute("src", this.src);
	},
	setSpeed: function () {
		this.speed += 1;
	},
	getLevel: function () {
		return this.level.current;
	}
};

player.setKappa(playerKappa);

let opponent = {
    vitesse: 5,
    src: "",
    setOpponent: function () {
        this.src = `./img/code_level${player.level.current}.png`;
		boss1Img.removeAttribute("src");
		boss1Img.setAttribute("src", this.src);
    },
    getSrc: function () {
        return this.src;
    },
	setVitesse: function () {
		this.vitesse +=1;
	}
};

opponent.setOpponent();

document.getElementById("score").innerHTML = player.getCodaPoint();
document.getElementById("level").innerHTML = player.getLevel();

const kappa = document.getElementById("kappa");
const myBg = document.getElementById("myBg");
const boss1 = document.getElementById("boss1");

let speed = player.speed;
let positionX = 5;
let positionY = 5;
let direction = 1;
let isMoving = false;
let animationId;
let spaceKeyPressed = false;
let isGameActive = true;


function resetValue() {
	cancelAnimationFrame(animationId);
	isAnimationRunning = false;
	isMoving = false;
	speed = 7;
	direction = 1;
	positionX = 5;
	positionY = 5;
	kappa.style.left = positionX + "px";
	kappa.style.top = positionY + "px";
	boss1Img.style.right = "0px";
    boss1Img.style.top = "0px";
}

let bossHitAnimationId; // Identifiant de l'animation de clignotement
let bossHitDuration = 500; // Durée du clignotement en millisecondes

function bossHitEffect() {
    let startTime = null;

    function blinkBoss(timestamp) {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;

        if (elapsed < bossHitDuration) {
            boss1Img.style.opacity = (elapsed % 100 < 50) ? 0 : 1; // Change l'opacité pour créer l'effet de clignotement
            bossHitAnimationId = requestAnimationFrame(blinkBoss);
        } else {
            boss1Img.style.opacity = 1; // Rétablit l'opacité à sa valeur normale
        }
    }

    cancelAnimationFrame(bossHitAnimationId); // Annule toute animation existante
    bossHitAnimationId = requestAnimationFrame(blinkBoss); // Démarre l'animation de clignotement
}

function resetBossHitEffect() {
    cancelAnimationFrame(bossHitAnimationId); // Annule l'animation de clignotement actuelle
    boss1Img.style.opacity = 1; // Rétablit l'opacité à sa valeur normale
}

function resetBullet(bullet) {
    bullet.remove();
    cancelAnimationFrame(bullet.animationId);
}

function checkCollision() {
	if (isGameActive) {

    // Calculate the position and size of the kappa and the boss
    const kappaRect = kappa.getBoundingClientRect();
    const boss1Rect = boss1.getBoundingClientRect();

    if (
        (kappaRect.left < boss1Rect.right &&
            kappaRect.right > boss1Rect.left &&
            kappaRect.top < boss1Rect.bottom &&
            kappaRect.bottom > boss1Rect.top)
    ) {
        // Collision detected
		isGameActive = false;
        resetValue();

        direction = 0;

        const deathSound = document.getElementById('deathSound');
        deathSound.currentTime = 0; // Reset the sound to the beginning in case it's already playing
        deathSound.play();

		const deathModal = document.getElementById('deathModal');
		deathModal.style.display = 'block';

		const restartButton = document.getElementById('restartButton');
      	restartButton.addEventListener('click', function () {
    	window.location.reload();
    });
}

    // Check for collision with the boss and trigger hit effect
    const bullets = document.getElementsByClassName('bullet');
    for (let bullet of bullets) {
        const bulletRect = bullet.getBoundingClientRect();

        if (
            	bulletRect.left < boss1Rect.right &&
                bulletRect.right > boss1Rect.left &&
                bulletRect.top < boss1Rect.bottom &&
                bulletRect.bottom > boss1Rect.top
        ) {
            // Boss hit by a bullet
            bossHitEffect();
            player.scoreUp(); // Increase the player's score
			resetBullet(bullet);
        }
    }
}
}
function startCollisionDetection() {
	checkCollision();
	requestAnimationFrame(startCollisionDetection);
}

// Start the collision detection loop
startCollisionDetection();

function checkHorizontal() {
	if (positionX +speed> window.innerWidth - kappa.offsetWidth || positionX +speed < 0) {
		direction /= -1;
	}
}
function checkVertical() {
	if (positionY +speed> window.innerHeight - kappa.offsetHeight || positionY +speed < 0) {
		direction /= -1;
	}
}

function animateKappa() {
	positionX += direction * speed;
	kappa.style.left = positionX + "px";
	checkCollision(); // Check for collision with the obstacle
	checkHorizontal();
	animationId = requestAnimationFrame(animateKappa);
}

function animateKappaLeft() {
	if (isGameActive) {

	positionX -= direction * speed;
	kappa.style.left = positionX + "px";
	checkCollision(); // Check for collision with the obstacle
	checkHorizontal();
	animationId = requestAnimationFrame(animateKappaLeft);
}
}

function animateKappaRight() {
	if (isGameActive) {

	positionX += direction * speed;
	kappa.style.left = positionX + "px";
	checkCollision(); // Check for collision with the obstacle
	checkHorizontal();
	animationId = requestAnimationFrame(animateKappaRight);
}
}

function animateKappaTop() {
	if (isGameActive) {

	positionY -= direction * speed;
	kappa.style.top = positionY + "px";
	checkCollision(); // Check for collision with the obstacle
	checkVertical();
	animationId = requestAnimationFrame(animateKappaTop);
}
}

function animateKappaBottom() {
	if (isGameActive) {

	positionY += direction * speed;
	kappa.style.top = positionY + "px";
	checkCollision(); // Check for collision with the obstacle
	checkVertical();
	animationId = requestAnimationFrame(animateKappaBottom);
}
}



document.addEventListener("keydown", function (event) {
	direction = 1;
	cancelAnimationFrame(animationId);
	switch (event.key) {
		case "ArrowLeft": // Left arrow key
			animateKappaLeft();
			break;
		case "ArrowRight": // Right arrow key
			animateKappaRight();
			break;
		case "ArrowUp": // Up arrow key
			animateKappaTop();
			break;
		case "ArrowDown": // Down arrow key
			animateKappaBottom();
			break;
	}
});

function shootBullet() {
	if (isGameActive) {

	const bullet = document.createElement('div');
	bullet.className = 'bullet';
	const kappa = document.getElementById('kappa');
	const kappaRect = kappa.getBoundingClientRect();

	bullet.style.left = kappaRect.right + 'px';
	bullet.style.top = kappaRect.top + kappaRect.height / 2 + 'px';

	document.body.appendChild(bullet);

	

	function updateScore() {
		const scoreElement = document.getElementById('score');
		scoreElement.textContent = player.getCodaPoint();
	
		if (player.getCodaPoint() == player.level.heightScore[player.level.current]) {

			player.levelUp();

			// Mettez à jour l'image du boss
			opponent.setOpponent();
	
			// Mettez à jour l'image du kappa
			player.setKappa();
	
			// Mettez à jour le pattern de mouvement du boss
			directionX = 2;  // Remplacez par le nouveau pattern de mouvement en X
			directionY = 1.5;  // Remplacez par le nouveau pattern de mouvement en Y
		}
	}

	function animateBullet(bullet) {
		const bulletSpeed = 10;
		const bulletPositionX = parseInt(bullet.style.left) || 0;
		const boss1Rect = boss1.getBoundingClientRect();
		const bulletRect = bullet.getBoundingClientRect();
	
		bullet.style.left = bulletPositionX + bulletSpeed + 'px';
	
		// Vérifie la collision avec le boss
		if (
			(bulletRect.left < boss1Rect.right &&
				bulletRect.right > boss1Rect.left &&
				bulletRect.top < boss1Rect.bottom &&
				bulletRect.bottom > boss1Rect.top)
		) {
			// Boss touché par un projectile
			bossHitEffect();
	
			player.scoreUp();
			console.log(player.codaPoint); // Augmente le score du joueur
			updateScore();
		}
		if (bulletPositionX > window.innerWidth) {

		} else {
			bullet.animationId = requestAnimationFrame(() => animateBullet(bullet));
		}	
	}
	function updateScore() {
		const scoreElement = document.getElementById('score');
		scoreElement.textContent = player.getCodaPoint();
	}

	setTimeout(() => {
		bullet.remove();
		checkCollision(); // Vérifie à nouveau la collision après la suppression du projectile
	}, 1500);

	const shootSound = document.getElementById('shootSound');
	if (shootSound.paused) {
		shootSound.currentTime = 0;
		shootSound.play();
	}
}
}


document.addEventListener('keydown', (event) => {
	if (event.code === 'Space') {
		if (isGameActive) {
		if (!spaceKeyPressed) {
			spaceKeyPressed = true;
			shootBullet();
			shootSound.currentTime = 0;
        shootSound.play();
		}
	}
}
});

document.addEventListener('keyup', (event) => {
	if (event.code === 'Space') {
		spaceKeyPressed = false;
	}
});



// kappa = document.getElementById('level1');
// let directionX = 1.4; 
// let directionY = 1.2; 
// let vitesse = 5; 

// function Randomspeed2() {
//   const positionXActuelle = parseInt(kappa.style.right) || 0;
//   const positionYActuelle = parseInt(kappa.style.top) || 0;

//   if (positionXActuelle + vitesse > window.innerWidth - kappa.offsetWidth || positionXActuelle + vitesse < 0) {
//     directionX /= -1;
//   }

//   if (positionYActuelle + vitesse > window.innerHeight - kappa.offsetHeight || positionYActuelle + vitesse < 0) {
//     directionY /= -1;
//   }

//   kappa.style.right = positionXActuelle + vitesse * directionX + 'px';
//   kappa.style.top = positionYActuelle + vitesse * directionY + 'px';

//   requestAnimationFrame(Randomspeed2);
// }

// Randomspeed2();



// BOUGE EN RANDOM VITESSE LVL 1

const level0 = document.getElementById('level0');
 let directionX = 1; 
 let directionY = 1; 

function Randomspeed1() {
	vitesse = opponent.vitesse;
  const positionXActuelle = parseInt(level0.style.right) || 0;
  const positionYActuelle = parseInt(level0.style.top) || 0;

  if (player.level.current >= 2){
	if (positionXActuelle + vitesse > window.innerWidth - level0.offsetWidth || positionXActuelle + vitesse < 0) {
		directionX /= -1;
	}

	if (positionYActuelle + vitesse > window.innerHeight - level0.offsetHeight || positionYActuelle + vitesse < 0) {
		directionY /= -1;
	}

	level0.style.right = positionXActuelle + vitesse * directionX + 'px';
	level0.style.top = positionYActuelle + vitesse * directionY + 'px';
	} else if (player.level.current == 1) {
		if (positionXActuelle + vitesse > window.innerWidth - level0.offsetWidth || positionXActuelle + vitesse < 0) {
			directionX /= -1;
		}
		level0.style.right = positionXActuelle + vitesse * directionX + 'px';
	} else if (player.level.current == 0) {
		if (positionYActuelle + vitesse > window.innerHeight - level0.offsetHeight || positionYActuelle + vitesse < 0) {
			directionY /= -1;
		}
		level0.style.top = positionYActuelle + vitesse * directionY + 'px';
	} else if (player.codaPoint == 100000) {
		window.location.href = "win.html";
		document.addEventListener("DOMContentLoaded", function() {
			// Get the audio element
			var audio = document.getElementById("winAudio");
	
			// Play the audio
			audio.play();
		});
	}

	if (player.getCodaPoint() == player.level.heightScore[player.level.current]) {
		// Mettez à jour le pattern de mouvement du boss
		opponent.setVitesse();
		if (player.level.current > 1) {
			player.setSpeed();
		}
		cancelAnimationFrame(idAnimBoss);
		player.levelUp();

		// Mettez à jour l'image du boss
		opponent.setOpponent();

		// Mettez à jour l'image du kappa
		player.setKappa(playerKappa);
	}

  requestAnimationFrame(Randomspeed1);
}

let idAnimBoss = requestAnimationFrame(Randomspeed1);

// BOUGER DE HAUT EN BAS
// const kappa = document.getElementById('kappa');
// let direction = 1; 
// let vitesse = 5; 

// function animerKappa() {
//   const positionActuelle = parseInt(kappa.style.bottom) || 0;

//   if (positionActuelle + vitesse > window.innerHeight - kappa.offsetHeight || positionActuelle + vitesse < 0) {
//     direction /= -1;
//   }

//   kappa.style.bottom = positionActuelle + vitesse * direction + 'px';

//   requestAnimationFrame(animerKappa);
// }

// animerKappa();

// BOUGE DE DROITE A GAUCHE
// const kappa = document.getElementById('kappa');
// let direction = 1; 
// let vitesse = 5; 

// function animerKappa() {
//   const positionActuelle = parseInt(kappa.style.right) || 0;

//   if (positionActuelle + vitesse > window.innerWidth - kappa.offsetWidth || positionActuelle + vitesse < 0) {
//     direction /= -1;
//   }

//   kappa.style.right = positionActuelle + vitesse * direction + 'px';

//   requestAnimationFrame(animerKappa);
// }

// animerKappa();