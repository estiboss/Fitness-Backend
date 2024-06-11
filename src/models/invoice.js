const connection = require('../config/database');

class Invoice {
  constructor(invoice) {
    this.invoice = invoice;
  }

  create() {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO invoice SET ?', this.invoice, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM invoice', (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static getByMembershipId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM invoice WHERE MembershipID = ?', id, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM invoice WHERE InvoiceID = ?', id, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}

module.exports = Invoice;
