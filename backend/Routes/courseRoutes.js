const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Get all courses
router.get('/', courseController.getAllCourses);

// Get single course
router.get('/:id', courseController.getCourse);

// Create new course
router.post('/', courseController.createCourse);

// Update course
router.put('/:id', courseController.updateCourse);

// Delete course
router.delete('/:id', courseController.deleteCourse);

// Add student to course
router.post('/:id/students', courseController.addStudent);

module.exports = router;
