const express = require('express');
const router = express.Router();
const AddonService = require('../models/addonService');

router.get('/:membershipId', async (req, res) => {
  try {
    const membershipId = req.params.membershipId;
    const addonServices = await AddonService.getByMembershipId(membershipId);
    res.json(addonServices);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Addon services not found' });
  }
});

router.post('/:membershipId', async (req, res) => {
  try {
    const membershipId = req.params.membershipId;
    const addonServiceData = req.body;
    const newAddonService = new AddonService({ MembershipID: membershipId, ...addonServiceData });
    const addonService = await newAddonService.create();
    res.json(addonService);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating addon service' });
  }
});

module.exports = router;
