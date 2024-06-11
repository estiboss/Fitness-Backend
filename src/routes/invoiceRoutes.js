const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

router.get('/:membershipId', async (req, res) => {
  try {
    const membershipId = req.params.membershipId;
    const invoices = await Invoice.getByMembershipId(membershipId);
    res.json(invoices);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Invoices not found' });
  }
});

router.post('/:membershipId', async (req, res) => {
  try {
    const membershipId = req.params.membershipId;
    const invoiceData = req.body;
    const newInvoice = new Invoice({ MembershipID: membershipId, ...invoiceData });
    const invoice = await newInvoice.create();
    res.json(invoice);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating invoice' });
  }
});

module.exports = router;
