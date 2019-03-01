const express = require('express');
const router = express.Router();
const { Location } = require('../../models/Location');
const { isEmpty } = require('../../validation/isEmpty');
const mongoose = require('mongoose')

/**
 * @route get /api/locations
 * @desc get all locations
 * @access public
 */
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    if (!locations) {
      return res.status(404).json({ error: "No locations found" });
    }
    return res.json(locations);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * @route get /api/locations/:id
 * @desc get one locations
 * @access public
 */
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    return res.json(location);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route post /api/locations
 * @desc create a location
 * @access public
 */
router.post('/', (req, res) => {
  const { name } = req.body;
  if (isEmpty(name)) {
    return res.status(400).json({ error: "Name cannot be blank" });
  }
  const newLocation = {
    _id: mongoose.Types.ObjectId,
    name
  }
  // dont actually save to db, just return new obj
  return res.json(newLocation);
});

/**
 * @route patch /api/locations/:id
 * @desc update a location
 * @access public
 */
router.patch('/:id', async (req, res) => {
  const { name } = req.body;
  if (isEmpty(name)) {
    return res.status(400).json({ error: "Name cannot be blank" });
  }
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    const newLocation = {
      _id: location._id,
      name
    }
    // dont actually save to db, just return new obj
    return res.json(newLocation);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route delete /api/locations
 * @desc delete a location
 * @access public
 */
router.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    // dont actually delete from db, just return 
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;