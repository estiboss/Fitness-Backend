const connection = require('../config/database');

class AddonService {
  constructor(addonService) {
    this.addonService = addonService;
  }

  create() {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO addon_services SET ?', this.addonService, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM addon_services', (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static getByMembershipId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM addon_services WHERE MembershipID = ?', id, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM addon_services WHERE AddOnID = ?', id, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}

module.exports = AddonService;
