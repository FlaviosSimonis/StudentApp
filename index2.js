var express = require('express');

var app = express();

var Student = require('./model/Student.js');
var Teacher = require('./model/Teacher.js');
var Courses = require('./model/Courses.js');
var CourseMembers = require('./model/CourseMembers.js');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const cors = require('cors');
app.use(cors({
  origin:'*'
}));

app.use('/', express.static('files'));


//Student
app.get('/student/findAll', (req,res)=>{
  console.log('Get all students');

  Student.find((err, allStudents)=>{
    if(err){
      console.log("Error in finding all students", err);
      res.json({'status':false, 'data':err});
    }else{
      res.json({'status':true, 'data':allStudents});
    }
  });
});

app.get('/student/findOne', (req,res)=>{
  console.log("Find a student");

  const lastname = req.query.lastname;
  console.log("Find student with lastname:", lastname);

  Student.findOne({'lastname': lastname}, (err, student)=>{
    if(err){
      console.log("Error in finding student", lastname);
      res.json({'status':false, 'data':student});
    }else{
      res.json({'status':true, 'data':student});
    }
  });
});

app.post('/student/create', (req,res)=>{
  console.log("Create student", req.body);

  const lastname = req.body.lastname;
  console.log("Create student with lastname: ", lastname);

  let newStudent = new Student({
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });

  newStudent.save((err)=>{
    if(err){
      console.log("Error in creating student", err);
      res.json({'data':err, 'status':false});
    }else{
      res.json({'data': newStudent, 'status': true});
    }
  });
});

app.delete('/student/delete', (req,res)=>{
  console.log('Delete student');

  const lastname = req.query.lastname;
  console.log("Delete student with lastname ", lastname);

  Student.findOneAndRemove({lastname:lastname}, (err, student)=>{
    if(err){
      console.log('Problem on deletion of student', err);
      res.json({'status':false, 'data':err});
    }else{
      res.json({'status':true, 'data':student});
    }
  });
});

app.post('/student/update', (req,res)=>{
  console.log('Update student');

  const lastname = req.body.lastname;
  console.log('Update student with lastname ', lastname);

  Student.findOne({'lastname':lastname}, (err, student)=>{
    if(err){
      res.json({'status':false, 'data':err});
    }else{
      student.firstname = req.body.firstname;
      student.lastname = req.body.lastname;

      student.save((err)=>{
        if(err){
          res.json({'status':false, 'data':err});
        }else{
          res.json({'status': true, 'data': student});
        }
      });
    }
  });
});

//Teacher
app.get('/teacher/findAll', (req,res)=>{
  console.log('Get all teachers');

  Teacher.find((err, allTeachers)=>{
    if(err){
      console.log("Error in finding all teachers", err);
      res.json({'status':false, 'data':err});
    }else{
      res.json({'status':true, 'data':allTeachers});
    }
  });
});

app.get('/teacher/findOne', (req,res)=>{
  console.log("Find a teacher");

  const lastname = req.query.lastname;
  console.log("Find teacher with his lastname:", lastname);

  Teacher.findOne({'lastname': lastname}, (err, teacher)=>{
    if(err){
      console.log("Error in finding teacher", lastname);
      res.json({'status':false, 'data':student});
    }else{
      res.json({'status':true, 'data':student});
    }
  });
});

app.post('/teacher/create', (req,res)=>{
  console.log("Create teacher", req.body);

  const lastname = req.body.lastname;
  console.log("Create teacher with lastname: ", lastname);

  let newTeacher = new Teacher({
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });

  newTeacher.save((err)=>{
    if(err){
      console.log("Error in creating teacher", err);
      res.json({'data':err, 'status':false});
    }else{
      res.json({'data': newTeacher, 'status': true});
    }
  });
});

app.delete('/teacher/delete', (req,res)=>{
  console.log('Delete teacher');

  const lastname = req.query.lastname;
  console.log("Delete teacher with lastname ", lastname);

  Teacher.findOneAndRemove({lastname:lastname}, (err, teacher)=>{
    if(err){
      console.log('Problem on deletion of teacher', err);
      res.json({'status':false, 'data':err});
    }else{
      res.json({'status':true, 'data':teacher});
    }
  });
});

app.post('/teacher/update', (req,res)=>{
  console.log('Update teacher');

  const lastname = req.body.lastname;
  console.log('Update teacher with lastname ', lastname);

  Teacher.findOne({'lastname':lastname}, (err, teacher)=>{
    if(err){
      res.json({'status':false, 'data':err});
    }else{
      teacher.firstname = req.body.firstname;
      teacher.lastname = req.body.lastname;

      teacher.save((err)=>{
        if(err){
          res.json({'status':false, 'data':err});
        }else{
          res.json({'status': true, 'data': teacher});
        }
      });
    }
  });
});

//Courses
app.get('/courses/findAll', (req,res)=>{
  console.log('Get all courses');

  Courses.find((err, allCourses)=>{
    if(err){
      console.log("Error in finding all courses", err);
      res.json({'status':false, 'data':err});
    }else{
      res.json({'status':true, 'data':allCourses});
    }
  });
});

app.get('/courses/findOne', (req,res)=>{
  console.log("Find a course");

  const name = req.query.name;
  console.log("Find course with name:", name);

  Courses.findOne({'name': name}, (err, courses)=>{
    if(err){
      console.log("Error in finding course", name);
      res.json({'status':false, 'data':courses});
    }else{
      res.json({'status':true, 'data':courses});
    }
  });
});

app.post('/courses/create', (req,res)=>{
  console.log("Create course", req.body);

  const name = req.body.name;
  console.log("Create course with name: ", name);

  let newCourses = new Courses({
    name: req.body.name,
    description: req.body.description
  });

  newCourses.save((err)=>{
    if(err){
      console.log("Error in creating course", err);
      res.json({'data':err, 'status':false});
    }else{
      res.json({'data': newCourses, 'status': true});
    }
  });
});

app.delete('/courses/delete', (req,res)=>{
  console.log('Delete course');

  const name = req.query.name;
  console.log("Delete course with name ", name);

  Courses.findOneAndRemove({name:name}, (err, courses)=>{
    if(err){
      console.log('Problem on deletion of course', err);
      res.json({'status':false, 'data':err});
    }else{
      res.json({'status':true, 'data':courses});
    }
  });
});

app.post('/courses/update', (req,res)=>{
  console.log('Update course');

  const name = req.body.name;
  console.log('Update course with name ', name);

  Courses.findOne({'name':name}, (err, courses)=>{
    if(err){
      res.json({'status':false, 'data':err});
    }else{
      courses.name = req.body.name;
      courses.description = req.body.description;

      courses.save((err)=>{
        if(err){
          res.json({'status':false, 'data':err});
        }else{
          res.json({'status': true, 'data': courses});
        }
      });
    }
  });
});

//Port
app.listen(process.env.PORT || 5000, ()=>{
  console.log('listening on port');
});




















