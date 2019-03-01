const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Misson } = require('../../models/Mission');
const { isEmpty } = require('../../validation/isEmpty');

/**
 * @route GET /api/missions/
 * @desc get all missions
 * @access public
 */
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find();
    if (!missions) {
      return res.status(404).json({ error: "No missions found" });
    }
    return res.json(missions);
  } catch (err) {
    return res.status(400).json(err);
  }
});

 /**
 * @route GET /api/missions/:id
 * @desc GET single mission
 * @access public
*/
router.get('/:id', async (req, res) => {
  try {
    const mission = await Misson.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ error: "Could not find mission" });
    }
    return res.json(mission);
  } catch (err) {
    return res.status(400).json(err);
  }
});

 /**
 * @route POST /api/missions/
 * @desc create a mission
 * @access public
 */
router.post('/', (req, res) => {
  const { name } = req.body;
  if (isEmpty(name)) {
    return res.status(400).json({ error: "Name cannot be empty" });
  }
  const newMission = {
    _id: mongoose.Types.ObjectId,
    name
  }
  // dont save to db, just return new obj as if it did
  return res.json(newMission);
});

 /**
 * @route PATCH /api/missions/:id
 * @desc update a mission
 * @access public
 */
router.patch('/:id', async (req, res) => {
  const { name } = req.body;
  if (isEmpty(name)) {
    return res.status(400).json({ error: "Name cannot be empty" });
  }
  try {
    const mission = await Misson.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }
    const updatedMission = {
      _id: mission._id,
      name
    }
    // dont actually update, just return as if it did
    return res.json(updatedMission);
  } catch (err) {
    return res.status(400).json(err);
  }
});

 /**
 * @route DELETE /api/missions/:id
 * @desc delete a mission
 * @access public
 */
router.delete('/:id', async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;