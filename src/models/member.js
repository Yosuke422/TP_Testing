class Member {
    constructor() {
      this.members = [];
    }
  
    create(member) {
      this.members.push(member);
      return member;
    }
  }
  
  module.exports = new Member();
  