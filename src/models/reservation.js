class Reservation {
    constructor() {
      this.reservations = [];
    }
  
    create(reservation) {
      this.reservations.push(reservation);
      return reservation;
    }
  }
  
  module.exports = new Reservation();
  