const connection = require('../config/database');

class Membership {
  constructor(membership) {
    this.membership = membership;
  }

  create() {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO membership SET ?', this.membership, (err, res) => {
        if (err) {
          console.error('Error creating membership:', err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM membership', (err, res) => {
        if (err) {
          console.error('Error fetching all memberships:', err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM membership WHERE MembershipID = ?', [id], (err, res) => {
        if (err) {
          console.error(`Error fetching membership with ID ${id}:`, err);
          reject(err);
        } else {
          if (res && res.length > 0) {
            resolve(res[0]);
          } else {
            resolve(null); // No membership found with the given ID
          }
        }
      });
    });
  }

  static update(id, membership) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE membership SET ? WHERE MembershipID = ?', [membership, id], (err, res) => {
        if (err) {
          console.error(`Error updating membership with ID ${id}:`, err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM membership WHERE MembershipID = ?', [id], (err, res) => {
        if (err) {
          console.error(`Error deleting membership with ID ${id}:`, err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = Membership;
