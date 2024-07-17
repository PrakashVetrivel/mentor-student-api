const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

exports.createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.assignStudentsToMentor = async (req, res) => {
  try {
    const { mentorId, studentIds } = req.body;

    // Find the mentor
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

    // Add students to the mentor
    mentor.students = [...mentor.students, ...studentIds];
    await mentor.save();

    // Update students with the mentor
    await Student.updateMany(
      { _id: { $in: studentIds } },
      { mentor: mentorId },
      { multi: true }
    );

    res.status(200).json(mentor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStudentsByMentor = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const mentor = await Mentor.findById(mentorId).populate('students');
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

    res.status(200).json(mentor.students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
