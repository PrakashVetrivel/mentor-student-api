const express = require('express');
const router = express.Router();

const mentorController = require('../controllers/mentorController');
const studentController = require('../controllers/studentController');

// Mentor Routes
router.post('/mentors', mentorController.createMentor);
router.post('/mentors/assign-students', mentorController.assignStudentsToMentor);
router.get('/mentors/:id/students', mentorController.getStudentsByMentor);

// Student Routes
router.post('/students', studentController.createStudent);
router.post('/students/assign-mentor', studentController.assignMentorToStudent);
router.get('/students/:id/previous-mentors', studentController.getPreviousMentorsForStudent);
router.get('/students/unassigned', studentController.getUnassignedStudents);

module.exports = router;
