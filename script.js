let kappa = {
    codaPoint: 0,
    level: {curent: 0, scoreUpReach: {
        1: 1000, 2: 5000, 3: 15000,
        4: 30000, 5: 50000, 6: 75000, 
        7: 100000
    }, damage: {
        1: 250, 2: 400, 3: 500,
        4: 500, 5: 500, 6: 500,
        7: null
    }},
    weapon: {
        damage: 100,
    },
    levelUp: function () {
        this.level.curent += 1;
        this.weapon.damage = this.level.damage[this.level.curent];
    },
    scoreUp: function (up) {
        this.codaPoint += up;
    },
    reset: function () {
        this.codaPoint = 0;
    },
    returnCodaPoint: function () {
        return this.codaPoint;
    }
}