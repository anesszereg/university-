const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single student
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .select('-password')
      .populate('courses');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, password , phone } = req.body;
    
    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      phone
    });

    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (name) student.name = name;
    if (email) student.email = email;

    const updatedStudent = await student.save();
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Enroll in course
exports.enrollCourse = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const courseId = req.body.courseId;
    if (student.enrolledCourses.some(enrollment => enrollment.course.toString() === courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    student.enrolledCourses.push({ course: courseId });
    await student.save();
    res.status(200).json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
