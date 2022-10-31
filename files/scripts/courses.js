$(document).ready(function() {
  getData();

  $('.row').on('click','.btnSubmit', function(){
    let name = $('#name').val();
    let description = $('#description').val();

    let item = {
      'name': name,
      'description': description
    };

    const checkType = $('.btnSubmit').val();

    if (checkType === 'modify'){
      $.ajax({
        url:'https://progectstudentapp.herokuapp.com/courses/update',
        type: 'post',
        dataType:'JSON',
        data: item
      }).done(function(response){
        let status = response.status;
        let data = response.data;

        if(status){
          getData();
          resetForm();
          alert(true, 'Επιτυχής τροποποίηση')
        }else{
          alert(false,"Παρουσιάστηκε πρόβλημα στη τροποποίηση (" + data.message + ')');
        }
      });
    }else{
      $.ajax({
        url:'https://progectstudentapp.herokuapp.com/courses/create',
        type: 'post',
        dataType: 'JSON',
        data: item
      }).done(function(response){
        let status = response.status;
        let data = response.data;

        if(status){
          getData();
          resetForm();
          alert(true, "Επιτυχής καταχώρηση");
        }else{
          alert(false, "Παρουσιάστηκε πρόβλημα με την καταχώρηση (" + data.message + "). Προσπαθήστε ξανά");
        }
      });
    }
  });

  $('#tbody').on('click', '.btnDelete', function(){
    let name = $(this).val();

    $.ajax({
      url:'https://progectstudentapp.herokuapp.com/courses/delete'+'?'+$.param({"name":name}),
      type:'delete',
      dataType: 'JSON'
    }).done(function(response){
      let status = response.status;
      let data = response.data;

      if(status){
        getData();
        alert(true, "Επιτυχής διαγραφή")
      }else{
        alert(false, "Παρουσιάστηκε πρόβλημα στην διαγραφή (" + data.message + ")");
      }
    });
  });

  $('#tbody').on('click','.btnUpdate', function(){
    let name = $(this).val();

    $.ajax({
      url:'https://progectstudentapp.herokuapp.com/courses/findOne'+'?'+$.param({'name':name}),
      type:'get',
      dataType: 'JSON'
    }).done(function(response){
      let status = response.status;
      let data = response.data;

      if(status){
        $('#name').val(data.name);
        $('#description').val(data.description);

        // $('#lastname').prop("disabled", true);

        $('.btnSubmit').val('modify');
      }else{
        alert(false, "Πρόβλημα στην αναζήτηση (" + data.message + ")");
      }
    });
  });

  $('.row').on('click', '.btnReset', function () { 
    resetForm();
  });
});

function getData(){
  $.ajax({
    url:'https://progectstudentapp.herokuapp.com/courses/findAll', 
    type: 'get',
    dataType: 'JSON'
  }).done(function(response){
    let status = response.status;
    let data = response.data;

    if(status){
      createTbody(data);
    }else{
      alert(false, "Πρόβλημα στην αναζήτηση (" + data,message + ") ");
    }
  });
}

function createTbody(data){
  $('#coursesTable > tbody').empty();

  let len = data.length;

  for(let i = 0; i < len; i++){
    let name = data[i].name;
    let description = data[i].description;

    console.log(name, description)

    let tr_str = "<tr>" +
                 "<td>" + name + "</td>" +
                 "<td>" + description + "</td>" + 
                 "<td>" + 
                      "<button class='btnUpdate btn btn-dark' value=\'" + 
                      name + "\'>Τροποποίηση</button>" +
                      "<button class='btnDelete btn btn-dark' value=\'" + 
                      name + "\'>Διαγραφή</button>" + 
                 "</td>" +
                 "</tr>";
                 
    $('#coursesTable tbody').append(tr_str);                  
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

function resetForm(){
  $("#frmCourses")[0].reset();
  $('.btnSubmit').val('insert');
}