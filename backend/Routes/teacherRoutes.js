const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Get all teachers
router.get('/', teacherController.getAllTeachers);

// Get single teacher
router.get('/:id', teacherController.getTeacher);

// Create new teacher
router.post('/', teacherController.createTeacher);

// Update teacher
router.put('/:id', teacherController.updateTeacher);

// Delete teacher
router.delete('/:id', teacherController.deleteTeacher);

// Add course to teacher
router.post('/:id/courses', teacherController.addCourse);

module.exports = router;
