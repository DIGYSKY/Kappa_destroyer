const playerKappa = document.getElementById("kappa");

let player = {
    codaPoint: 0,
    level: {current: 0, damage: {
        1: 250, 2: 400, 3: 500,
        4: 500, 5: 500, 6: 500,
        7: null
    }},
    weapon: {
        damage: 100,
    },
    levelUp: function () {
        this.level.current += 1;
        this.weapon.damage = this.level.damage[this.level.current];
    },
    scoreUp: function () {
        this.codaPoint += this.weapon.damage;
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
	}
};

player.setKappa(playerKappa);

let opponent = {
    isSet: "",
    src: "",
    setOpponent: function () {
        this.src = "./img/kappa_level" + kappa.level.current + ".png";
    },
    getSrc: function () {
        return this.src;
    }
};

document.getElementById("score").innerHTML = player.getCodaPoint();

const kappa = document.getElementById("kappa");
const myBg = document.getElementById("myBg");
const boss1 = document.getElementById("boss1");

let speed = 7;
let positionX = 5;
let positionY = 5;
let direction = 1;
let isMoving = false;
let animationId;
let spaceKeyPressed = false;

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

}

function checkCollision() {
	// Calculate the position and size of the kappa and the obstacle
	const kappaRect = kappa.getBoundingClientRect();
	const boss1Rect = boss1.getBoundingClientRect();

	if (
		(kappaRect.left < boss1Rect.right &&
			kappaRect.right > boss1Rect.left &&
			kappaRect.top < boss1Rect.bottom &&
			kappaRect.bottom > boss1Rect.top)
	) {
		// Collision detected
		resetValue();
		
		direction = 0;
		alert("You died ! Click OK to restart !");
		window.location.href='index.html'
	} 
}


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
	positionX -= direction * speed;
	kappa.style.left = positionX + "px";
	checkCollision(); // Check for collision with the obstacle
	checkHorizontal();
	animationId = requestAnimationFrame(animateKappaLeft);
}
function animateKappaRight() {
	positionX += direction * speed;
	kappa.style.left = positionX + "px";
	checkCollision(); // Check for collision with the obstacle
	checkHorizontal();
	animationId = requestAnimationFrame(animateKappaRight);
}
function animateKappaTop() {
	positionY -= direction * speed;
	kappa.style.top = positionY + "px";
	checkCollision(); // Check for collision with the obstacle
	checkVertical();
	animationId = requestAnimationFrame(animateKappaTop);
}
function animateKappaBottom() {
	positionY += direction * speed;
	kappa.style.top = positionY + "px";
	checkCollision(); // Check for collision with the obstacle
	checkVertical();
	animationId = requestAnimationFrame(animateKappaBottom);
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
	const bullet = document.createElement('div');
	bullet.className = 'bullet';
	const kappa = document.getElementById('kappa');
	const kappaRect = kappa.getBoundingClientRect();

	bullet.style.left = kappaRect.right + 'px';
	bullet.style.top = kappaRect.top + kappaRect.height / 2 + 'px';

	document.body.appendChild(bullet);
	setTimeout(() => {
		bullet.remove();
	}, 1500);
	checkCollision();


}

document.addEventListener('keydown', (event) => {
	if (event.code === 'Space') {
		if (!spaceKeyPressed) {
			spaceKeyPressed = true;
			shootBullet();
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
 directionX = 1; 
 directionY = 1; 
 vitesse = 5; 

function Randomspeed1() {
  const positionXActuelle = parseInt(level0.style.right) || 0;
  const positionYActuelle = parseInt(level0.style.top) || 0;

  if (positionXActuelle + vitesse > window.innerWidth - level0.offsetWidth || positionXActuelle + vitesse < 0) {
    directionX /= -1;
  }

  if (positionYActuelle + vitesse > window.innerHeight - level0.offsetHeight || positionYActuelle + vitesse < 0) {
    directionY /= -1;
  }

  level0.style.right = positionXActuelle + vitesse * directionX + 'px';
  level0.style.top = positionYActuelle + vitesse * directionY + 'px';

  requestAnimationFrame(Randomspeed1);
}

Randomspeed1();

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