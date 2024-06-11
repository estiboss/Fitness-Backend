const express = require('express');
const router = express.Router();
const membershipService = require('../services/membershipService');

router.get('/', async (req, res) => {
  try {
    const memberships = await membershipService.getAllMemberships();
    res.json(memberships);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching memberships' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const membershipId = req.params.id;
    const membership = await membershipService.getMembershipById(membershipId);
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }
    res.json(membership);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Membership not found' });
  }
});

router.post('/', async (req, res) => {
  try {
    const membershipData = req.body;
    const membership = await membershipService.createMembership(membershipData);
    res.json(membership);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating membership' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const membershipId = req.params.id;
    const membershipData = req.body;
    const updatedMembership = await membershipService.updateMembership(membershipId, membershipData);
    res.json(updatedMembership);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating membership' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const membershipId = req.params.id;
    await membershipService.deleteMembership(membershipId);
    res.json({ message: 'Membership deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting membership' });
  }
});

module.exports = router;
