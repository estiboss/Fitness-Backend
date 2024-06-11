const membershipService = require('../services/membershipService');

module.exports = {
  async checkUpcomingFees() {
    await membershipService.checkUpcomingFees();
  }
};
