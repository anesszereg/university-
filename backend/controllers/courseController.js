const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('teacher', 'name email specialization')
      .populate('students', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single course
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacher', 'name email specialization')
      .populate('students', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, teacher, capacity, startDate, endDate } = req.body;
    
    const course = new Course({
      title,
      description,
      teacher,
      capacity,
      startDate,
      endDate
    });

    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const { title, description, capacity, startDate, endDate } = req.body;
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (capacity) course.capacity = capacity;
    if (startDate) course.startDate = startDate;
    if (endDate) course.endDate = endDate;

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add student to course
exports.addStudent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const studentId = req.body.studentId;
    const Student = require('../models/Student');
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if student is already enrolled
    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student already enrolled in this course' });
    }

    // Check if course is full
    if (course.students.length >= course.capacity) {
      return res.status(400).json({ message: 'Course is full' });
    }

    // Add course to student's enrolledCourses
    const alreadyEnrolled = student.enrolledCourses.some(enrollment => 
      enrollment.course.toString() === course._id.toString()
    );

    if (!alreadyEnrolled) {
      student.enrolledCourses.push({
        course: course._id,
        enrollmentDate: new Date()
      });
      await student.save();
    }

    // Add student to course's students array
    course.students.push(studentId);
    await course.save();

    res.status(200).json({ 
      message: 'Student added to course successfully',
      course: course,
      student: student
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
