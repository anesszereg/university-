const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Get all students
router.get('/', studentController.getAllStudents);

// Get single student
router.get('/:id', studentController.getStudent);

// Create new student
router.post('/', studentController.createStudent);

// Update student
router.put('/:id', studentController.updateStudent);

// Delete student
router.delete('/:id', studentController.deleteStudent);

// Enroll in course
router.post('/:id/enroll', studentController.enrollCourse);

module.exports = router;
