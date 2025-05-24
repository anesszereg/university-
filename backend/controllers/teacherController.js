const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select('-password');
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single teacher
exports.getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select('-password').populate('courses');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create teacher
exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;
    
    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      specialization
    });

    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { name, email, specialization } = req.body;
    const teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    if (name) teacher.name = name;
    if (email) teacher.email = email;
    if (specialization) teacher.specialization = specialization;

    const updatedTeacher = await teacher.save();
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Add course to teacher

exports.addCourse = async (req, res) => {
    try {
       
      
      
      const teacher = await Teacher.findById(req.params.id);
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }






        const courseId = req.body.courseId;

        if (teacher.courses.includes(courseId)) {
            return res.status(400).json({ message: 'Teacher already teaches this course' });
        }

        teacher.courses.push(courseId);




        await teacher.save();


        res.status(200).json({ message: 'Course added to teacher successfully' });


        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
        