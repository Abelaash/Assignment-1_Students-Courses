const Course = require('./course');

class OngoingCourse extends Course {
  constructor(id, name, department, description, seats) {
    super(id, name, department, description);
    this.seats = seats;
  }
}

module.exports = OngoingCourse;