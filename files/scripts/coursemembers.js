$(document).ready(function(){
  getData();

  $('#courses').change(function(){
    let name = $(this).val();
    loadData(name);
  });

  $('.row').on('click','.btnSubmit', function(){
    let name = $('#courses option:selected').val();
    let teacher = $('#teachers option:selected').val();

    const students = [];
    $('#studentsCheckboxes input:checked').each(function(){
      students.push($(this).attr('id'));
    });

    let item = {
      'name': name,
      'teacher': teacher,
      'student': students
    };

    $.ajax({
      url:'https://projectstudentapp.herokuapp.com/courses/members/update',
      type: 'post',
      dataType: 'JSON',
      data: item
    }).done(function(response){
      let status = response.status;
      let data = response.data;

      if(status){
        $('.btnSubmit').val('modify');
        getData();
        resetForm();
        alert(true, "Επιτυχής τροποποίηση");
      }else{
        alert(false, "Παρουσιάστηκε πρόβλημα με την τροποποίηση (" + data.message + "). Προσπαθήστε ξανά"); 
      }
    });
  });
});

function getData(){
  $.ajax({
    url:'https://projectstudentapp.herokuapp.com/courses/members/findAll',
    type: 'get',
    dataType: 'JSON'
  }).done(function(response){
    let status = response.status;
    let data = response.data;
    if(status){
      createTbody(data);
    }else{
      alert(false, "Πρόβλημα στην αναζήτηση των μαθημάτων (" + data.message + ")");
    }
  });
}

// $('#tbody').on('click','.btnUpdate', function(){
//   let name = $(this).val();

//   $.ajax({
//     url:'http://localhost:5000/courses/members/findOne'+'?'+$.param({'name':name}),
//     type:'get',
//     dataType: 'JSON'
//   }).done(function(response){
//     let status = response.status;
//     let data = response.data;

//     if(status){
//       $('#name').val(data.name);
//       $('#description').val(data.description);

//       $('.btnSubmit').val('modify');
//     }else{
//       alert(false, "Πρόβλημα στην αναζήτηση (" + data.message + ")");
//     }
//   });
// });

function createTbody(data){
  $('#coursesTable > tbody').empty();

  let courses = data.courses;
  let teachers = data.teachers;
  let students = data.students;

  for (let i = 0; i<courses.length; i++){
    let courseName = courses[i].name;
    let courseDescription = courses[i].description;
    let courseTeacher = courses[i].teacher;
    let courseStudent = courses[i].student;

    let teacher = teachers.filter((x)=>{
      return x._id === courseTeacher
    });

   
    let teacherF = Object.keys(teacher).length>0 ? teacher[0].firstname:"-";

    let teacherL= Object.keys(teacher).length>0 ? teacher[0].lastname:"-"

    let student = students.filter((x)=>{
      console.log(x);
      return courseStudent.includes(x._id);
    });

    let studentL = Object.keys(student).length>0 ? student.length : '-';

    let tr_str = "<tr>" + 
                 "<td>" + courseName + "</td>" +
                 "<td>" + courseDescription + "</td>" +
                 "<td>" + teacherF + " " + teacherL + "</td>" +
                 "<td>" + studentL + "</td>" +
                 /*"<td>" + 
                      "<button class='btnUpdate btn btn-dark' value=\'" + 
                      courseName + "\'>Τροποποίηση</button>" +
                 "</td>" +*/
                 "</tr>";

    $('#coursesTable tbody').append(tr_str);
  }

 if ($('.btnSubmit').val() != "modify"){
  createSelectCourses(courses);
  createSelectTeachers(teachers);
  createCheckboxesStudents(students);
 }                
}

function createSelectCourses(courses){
  courses.forEach(function(x){
    $('#courses').append(`<option value="${x.name}">${x.name}</option>`);
  });
}

function createSelectTeachers(teachers){
  teachers.forEach(function(x){
    $('#teachers').append(`<option value="${x._id}">${x.firstname} ${x.lastname}</option>`);
  });
}

function createCheckboxesStudents(students){
  for (let value of students){
    $('#studentsCheckboxes')
    .append(`<input type="checkbox" id="${value._id}" name="students" value="${value._id}">`)
    .append(` <label for="${value._id}"> ${value.firstname} ${value.lastname}</label></div>`)
    .append(`<br>`);
  }
}

function alert(status, message){
  if(status){
    $('.alert').addClass('alert-success');
    $('.alert').removeClass('alert-danger');
  }else{
    $('.alert').removeClass('alert-success');
    $('.alert').addClass('alert-danger');
  }

  $('.alert').html(message);
}

function loadData(name){
  $.ajax({
    url:'https://projectstudentapp.herokuapp.com/courses/members/findOne'+'?'+$.param({'name':name}),
    type:'get',
    dataType:'JSON'
  })
  .done(function(response){
    let status = response.status;
    let data = response.data;

    if(status){
      let students = data.students;
      let teacher = data.teachers;
      let description = data.courses.description;

      $('#teachers > [value=' + teacher._id + "]").attr("selected", "true");

      $("input:checkbox").prop("checked", false);
      for (let value of students){
        $('#' + value._id).prop("checked", true);
      }

      $("#description").val(description);
    }else{
      alert(false, "Πρόβλημα στην αναζήτηση των μαθημάτων (" + data.message + ")");
    }
  });
}

function resetForm(){
  $("#frmCourses")[0].reset();
  $("#teachers").val("");
}