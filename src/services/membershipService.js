const Membership = require('../models/membership');
const AddonService = require('../models/addonService');
const Invoice = require('../models/invoice');
const emailService = require('./emailService');

module.exports = {
  async getAllMemberships() {
    try {
      return await Membership.getAll();
    } catch (err) {
      console.error('Error fetching memberships:', err);
      throw err;
    }
  },

  async getMembershipById(id) {
    try {
      const membership = await Membership.getById(id);
      if (!membership) {
        throw new Error('Membership not found');
      }
      return membership;
    } catch (err) {
      console.error(`Error fetching membership with ID ${id}:`, err);
      throw err;
    }
  },

  async createMembership(membershipData) {
    const membership = new Membership(membershipData);
    try {
      return await membership.create();
    } catch (err) {
      console.error('Error creating membership:', err);
      throw err;
    }
  },

  async updateMembership(id, membershipData) {
    try {
      return await Membership.update(id, membershipData);
    } catch (err) {
      console.error(`Error updating membership with ID ${id}:`, err);
      throw err;
    }
  },

  async deleteMembership(id) {
    try {
      return await Membership.delete(id);
    } catch (err) {
      console.error(`Error deleting membership with ID ${id}:`, err);
      throw err;
    }
  },

  async checkUpcomingFees() {
    const memberships = await Membership.getAll();
    const today = new Date();

    memberships.forEach((membership) => {
      const dueDate = new Date(membership.DueDate);
      const reminderDate = new Date(dueDate.getTime() - 7 * 24 * 60 * 60 * 1000);

      if (today >= reminderDate) {
        if (membership.IsFirstMonth) {
          // Send combined invoice email for first month
          this.sendFirstMonthReminder(membership);
        } else {
          // Send add-on service invoice email for subsequent months
          this.sendAddOnServiceReminder(membership);
        }
      }
    });
  },

  async sendFirstMonthReminder(membership) {
    const subject = `Fitness+ Membership Reminder - ${membership.MembershipType}`;
    const body = `Dear ${membership.FirstName} ${membership.LastName},\n\n` +
      `This is a reminder that your first month's payment is due on ${membership.DueDate}.` +
      `The total amount for the combined annual fee and first month's add-on service charges is ${membership.TotalAmount}.` +
      `Please find the detailed invoice at ${membership.InvoiceUID}.\n\n` +
      `Best regards,\nFitness+ Team`;

    await emailService(membership.Email, subject, body);
  },

  async sendAddOnServiceReminder(membership) {
    const addonServices = await AddonService.getByMembershipId(membership.MembershipID);
    addonServices.forEach(async (service) => {
      const subject = `Fitness+ Add-on Service Reminder - ${service.ServiceName}`;
      const body = `Dear ${membership.FirstName} ${membership.LastName},\n\n` +
        `This is a reminder that your add-on service payment is due for the month of ${service.DueDate}.` +
        `The monthly amount for the add-on service is ${service.MonthlyAmount}.` +
        `Please find the detailed invoice at ${membership.InvoiceUID}.\n\n` +
        `Best regards,\nFitness+ Team`;

      await emailService(membership.Email, subject, body);
    });
  }
};
