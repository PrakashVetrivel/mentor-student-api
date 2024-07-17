const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.assignMentorToStudent = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    // Find the student
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Add the current mentor to previous mentors list
    if (student.mentor) {
      student.previousMentors.push(student.mentor);
    }

    // Assign new mentor
    student.mentor = mentorId;
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPreviousMentorsForStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId).populate('previousMentors');
    if (!student) return res.status(404).json({ error: 'Student not found' });

    res.status(200).json(student.previousMentors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUnassignedStudents = async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
