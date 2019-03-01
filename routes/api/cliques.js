const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isEmpty } = require('../../validation/isEmpty');
const { Clique } = require('../../models/Clique');

/**
 * @route GET /api/cliques
 * @desc get all cliques
 * @access public
 */
router.get('/', async (req, res) => {
  try {
    const cliques = await Clique.find();
    if (!cliques) {
      return res.status(404).json({ error: "No cliques found" });
    }
    return res.json(cliques);
  } catch (err) {
    return res.status(400).json(err);
  }
});

 /**
 * @route GET /api/cliques/:id
 * @desc get single cliques
 * @access public
 */
router.get('/:id', async (req, res) => {
  try {
    const clique = await Clique.findById(req.params.id);
    if (!clique) {
      return res.status(404).json({ error: "Clique not found" });
    }
    return res.json(clique);
  } catch (err) {
    return res.status(400).json(err);
  }
});

 /**
 * @route POST /api/cliques
 * @desc create a clique
 * @access public
 */
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (isEmpty(name)) {
    return res.status(400).json({ error: "Name cannot be empty" });
  }
  const newClique = {
    _id: mongoose.Types.ObjectId,
    name
  }
  // dont save to db, just return
  return res.json(newClique);
});

 /**
 * @route PATCH /api/cliques/:id
 * @desc update a clique
 * @access public
 */
router.patch('/:id', async (req, res) => {
  const { name } = req.body;
  if (isEmpty(name)) {
    return res.status(400).json({ error: "Name cannot be empty" });
  }
  try {
    const clique = await Clique.findById(req.params.id);
    if (!clique) {
      return res.status(404).json({ error: "Clique not found" });
    }
    const updatedClique = {
      _id: clique._id,
      name
    }
    // dont save to db, just return
    return res.json(updatedClique);
  } catch (err) {
    return res.status(400).json(err);
  }
});

 /**
 * @route DELETE /api/cliques/:id
 * @desc delete a clique
 * @access public
 */
router.delete('/:id', async (req, res) => {
  try {
    const clique = await Clique.findById(req.params.id);
    if (!clique) {
      return res.status(404).json({ error: "Clique not found" });
    }
    // dont actually delete from db, just return 
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json(err);
  }
});

 /**
 * @route POST /api/cliques/:id/students
 * @desc add a student
 * @access public
 */
router.post('/:id/students', async (req, res) => {
  const { name } = req.body;
  if (isEmpty(name)) {
    return res.status(400).json({ error: "Name cannot be empty" });
  }
  try {
    const clique = await Clique.findById(req.params.id);
    if (!clique) {
      return res.status(404).json({ error: "Clique not found" });
    }
    const student = {
      name
    };
    const newStudent = clique.students.unshift(student);
    // dont add to db, just return
    return res.json(newStudent);
  } catch (err) {
    return res.status(400).json(err);
  }
});

 /**
 * @route DELETE /api/cliques/:id/student/:id
 * @desc delete a student
 * @access public
 */
router.delete('/:id/students/:studentId', async (req, res) => {
  try {
    const clique = await Clique.findById(req.params.id);
    if (!clique) {
      return res.status(404).json({ error: "Clique not found" });
    }
    const studentToDelete = clique.students.find((student) => student._id === req.params.studentId);
    if (clique.students.filter((student) => student._id === req.params.studentId).length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    const index = clique.students.indexOf(studentToDelete);
    // dont actually remove, just return clique obj
    const newCliqueStudents = clique.students.splice(index, 1);
    return res.json(newCliqueStudents);
  } catch (err) {
    return res.status(400).json(err);
  }
});

 /**
 * @route GET /api/cliques/students
 * @desc get all students
 * @access public
 */
router.get('/students', async (req, res) => {
  try {
    const cliques = await Clique.find();
    let allStudents = [];
    cliques.forEach(clique => {
      allStudents.push(clique.students);
    });
    return res.json(allStudents);
  } catch (err) {
    return res.status(400).json(err);
  }
});