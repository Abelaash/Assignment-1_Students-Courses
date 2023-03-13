var express = require('express');
var router = express.Router();


const Course = require('../modules/course.js');
const Student = require('../modules/students.js');
const OngoingCourse = require('../modules/onGoingCourse.js');
const CompletedCourse = require('../modules/completedCourse')


//Completed Courses for student 1
const completedCourses1 = [
  new CompletedCourse(101, 'Advanced Front-End Programming', 'Computer Science', 'Learn Reactjs', 100),
  new CompletedCourse(102, 'Database Concepts & Design', 'Computer Science', 'Learn how to build a database design', 86),
  new CompletedCourse(103, 'Statistical Data Analysis', 'Computer Science', 'Learn data analysis using python', 78)

];

//Completed Courses for student 2
const completedCourses2 = [
  new CompletedCourse(101, 'Motor Learning & Neuroplaticity', 'Kinesology', 'Learn about examining the movement and control the neural and experience the shape of the brain', 83),
  new CompletedCourse(102, 'Clinical Exercise Physiology', 'Kinesology', 'Learning to guide discussions and learn how to impairments with chronic conditions decision-making.', 86),
  new CompletedCourse(103, 'Introduction to Neurological Disorders', 'Kinesology', 'Learning selected neurological disorders  and the implications for physical activitys', 60)

];

//Completed Courses for student 3
const completedCourses3 = [
  new CompletedCourse(101, 'Power Electronics', 'Electrical Engineering Technology', 'Learning about powering semiconductors devices and learn other circuits.', 60),
  new CompletedCourse(102, 'Operator Interface, Design and Control', 'Electrical Engineering Technology', 'Learning about HmI (Human Machine Interface) devices and see how it works using PLCs ', 90),
  new CompletedCourse(103, 'Power Systems', 'Electrical Engineering Technology', 'Covers modelling overhead and underground concuductors and cables in the formations of transmission lines.', 60)
];

//All current classes
const ongoingCourses = [
  new OngoingCourse(300, 'Data Structures & Algorithms', 'Computer Science', 'Introduction to Advanced Java', 10),
  new OngoingCourse(301, 'Modern Web Technologies', 'Computer Science', 'Learn MERN Stack Development', 3),
  new OngoingCourse(302, 'High-Level Programming Language', 'Computer Science', 'Learn about Python', 5),
  new OngoingCourse(303, 'Systems Design', 'Computer Science', 'Learn Project Management', 7),
  new OngoingCourse(304, 'Cross-Platform Mobile Development', 'Computer Science', 'Learn about React-Native', 5),
  new OngoingCourse(305, 'Technical Project 2 ', 'Electrical Engineering Technology', 'Working in teams for the capstone project', 0),
  new OngoingCourse(306, 'Control Applications Using PLCs', 'Electrical Engineering Technology', 'Practical Programming logic controllers assignment process machine applications.', 5),
  new OngoingCourse(307, 'Power Distribution Protection & Control', 'Electrical Engineering Technology', 'Learning techniques of the principles of protective devices such as relays, CTs, PTs.', 10),
  new OngoingCourse(308, 'Variable Frequency Drives and Motor Controls', 'Electrical Engineering Technology', 'Teaches the principles of operations of three phases and their control using Pulse Width Modulation.', 0),
  new OngoingCourse(309, 'Advanced Biomechanies of Human Movement', 'Kinesology', 'The course is structured to introduce measurement, analytical, and computation techniques involving multi-segmental, dynamic analysis of human activity.', 5),
  new OngoingCourse(310, 'Fundamentals of Neuroscience', 'Kinesology', 'This laboratory course provides students with practical tools to assess the nervous system control of movement, cognition, and learning.', 0),
  new OngoingCourse(311, 'Human Anatomy of the Central Nervous System', 'Kinesology', 'Functionally-oriented anatomy of the brain, spinal cord, cranial nerves, and the tissues they innervate using pre-dissected cadavers. ', 12),
  
];

//Students 
const students = [
  new Student(1, 'Abelaash Giritharan', 'Computer Science', 'Winter', [ongoingCourses[0], ongoingCourses[1], ongoingCourses[2]], completedCourses1),
  new Student(2, 'Tanishq Sharma', 'Kinesology', 'Fall', [ongoingCourses[9], ongoingCourses[10], ongoingCourses[11]], completedCourses2),
  new Student(3, 'Satyam-Sharma Singh', 'Electrical Engineering Technology', 'Fall', [ongoingCourses[5], ongoingCourses[6], ongoingCourses[7]], completedCourses3)
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Modern Web Technologies - Assignment 1'
  });
});


router.get('/students', function (req, res, next) {
  res.render('students', {
    students: students
  })
});


router.get('/ongoing-course', function (req, res, next) {
  res.render('ongoing-course', {
    modules: ongoingCourses
  })
})


router.get('/average/:id', function (req, res, next) {
  let id = students.find(student => student.id === parseInt(req.params.id))
  let total = 0; // initialize as number, not string
  for (var i = 0; i < id.coursesCompleted.length; i++) {
    total += parseInt(id.coursesCompleted[i].gradeAchieved);
  }
  let gradeAverage = Math.round(total / id.coursesCompleted.length);
  res.render('totalAverage', {
    students: id,
    grade: gradeAverage
  })
})

router.get('/course/filter', function (req, res, next) {
  res.render('filterCourse')
})


/*Takes data from the filter courses and filters the data to only render
matching information */
router.post('/course/filter', function (req, res, next) {
  let courses = ongoingCourses;
  let id = req.body.id ? req.body.id : false;
  let name = req.body.name ? req.body.name : false;
  let section = req.body.section ? req.body.section : false;
  let is_open = req.body.checkbox ? true : false;

  if (id) {
    courses = (courses.filter(c => c.id === parseInt(id)));
  }
  if (name) {
    courses = (courses.filter(c => c.name === name));
  }
  if (section) {
    courses = (courses.filter(c => c.department === section));
  }
  if (is_open) {
    courses = (courses.filter(c => c.seats > 0 === is_open));
  }
  res.render('courses-filter', {
    course: courses
  });
});

router.get('/student/filter', function (req, res, next) {
  res.render('filterStudent')
})

router.post('/student/filter', function (req, res, next) {
  let student = students;
  let id = req.body.id ? req.body.id : false;
  let name = req.body.name ? req.body.name : false;
  let section = req.body.section ? req.body.section : false;
  let enroll = req.body.enroll ? req.body.enroll : false;
  let complete = req.body.complete ? req.body.complete : false

  if (id) {
    student = (student.filter(s => s.id === parseInt(id)));
  }
  if (name) {
    student = (student.filter(s => s.name === name));
  }
  if (section) {
    student = (student.filter(s => s.department === section));
  }
  if (enroll) {
    students = students.filter(s => {
      for (var i = 0; i > s.coursesEnrolled.length; i++) {
        if (s.coursesEnrolled[i].name === enroll) {
          return true;
        } else {
          return false;
        }
      }
    })
  }
  
  if (complete) {
    students = students.filter(s => {
      for (var i = 0; i < s.coursesCompleted.length; i++) {
        if (s.coursesCompleted[i].name === complete) {
          return true;
        } else {
          return false;
        }
      }
      
    });
  }

  res.render('student-filter', {
    stu: student
  });
});

module.exports = router;