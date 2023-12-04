let kappa = {
    codaPoint: 0,
    level: {curent: 0, damage: {
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
    scoreUp: function () {
        this.codaPoint += this.weapon.damage;
    },
    dead: function () {
        this.codaPoint = 0;
        this.level.curent = 0;
        this.weapon.damage = 100;
        opponent.setOpponent();
    },
    returnCodaPoint: function () {
        return this.codaPoint;
    }
}

let opponent = {
    isSet: "",
    image: "",
    setOpponent: function () {
        this.image = "./img/kappa_level" + kappa.level.curent + ".png";
        switch (kappa.level.curent) {
            case 0:
                this.isSet = "HTML";
                break;
            case 1:
                this.isSet = "CSS";
                break;
            case 2:
                this.isSet = "JavaScript";
                break;
            case 3:
                this.isSet = "Python";
                break;
            case 4:
                this.isSet = "PHP";
                break;
            case 5:
                this.isSet = "C";
                break;
            case 6:
                this.isSet = "Assembleur";
                break;
            case 7:
                this.isSet = "Diplôme";
                break;
            default:
                break;
        }
    }
}