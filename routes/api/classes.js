const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Klass } = require('../../models/Klass');
const { isEmpty } = require('../../validation/isEmpty');

/**
 * @route GET /api/classes/
 * @desc get all classes
 * @access public
 */
router.get('/', async (req, res) => {
  try {
    const classes = await Klass.find();
    if (!classes) {
      return res.status(404).json({ error: "No classes found" });
    }
    return res.json(classes);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route GET /api/classes/:id
 * @desc get class by id
 * @access public
 */
router.get('/:id', async (req, res) => {
  try {
    const klass = await Klass.findById(req.params.id);
    if (!klass) {
      return res.status(404).json({ error: "Class not found" });
    }
    return res.json(klass);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route POST /api/classes/
 * @desc create a new classe
 * @access public
 */
router.post('/', (req, res) => {
  try {
    const { name } = req.body;
    if (isEmpty(name)) {
      return res.status(400).json({ error: "Name cannot be empty" });
    }
    const newKlass = {
      _id: mongoose.Types.ObjectId,
      name
    }
    // dont actually save the record to db, just return it as if it did
    return res.json(newKlass);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route PATCH /api/classes/:id
 * @desc update a class
 * @access public
 */
router.patch('/:id', async (req, res) => {
  const { name } = req.body;
  if (isEmpty(name)) {
    return res.status(400).json({ error: "Name cannot be empty" });
  }
  try {
    const klass = await Klass.findById(req.params.id);
    if (!klass) {
      return res.status(404).json({ error: "Class not found" });
    }
    const updatedClass = {
      _id: klass._id,
      name
    }
    // dont actually save, just return updated class like it did
    return res.json(updatedClass);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route DELETE /api/classes/:id
 * @desc delete a class
 * @access public
 */
router.delete('/:id', async (req, res) => {
  try {
    const klass = await Klass.findById(req.params.id);
    if (!klass) {
      return res.status(404).json({ error: "Class not found" });
    }
    // dont actually delete, just return as if it did
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;