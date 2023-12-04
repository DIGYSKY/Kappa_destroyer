let kappa = {
    codaPoint: 0,
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

let opponent = {

}

kappa.scoreUp(45);

console.log(kappa.returnCodaPoint());

kappa.reset();

console.log(kappa.returnCodaPoint());