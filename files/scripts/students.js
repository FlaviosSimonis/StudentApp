$(document).ready(function() {
  getData();

  $('.row').on('click','.btnSubmit', function(){
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();

    const checkType = $('.btnSubmit').val().split("-")[0];
    const id = $('.btnSubmit').val().split("-")[1];

    let item = {
      'id':id,
      'firstname': firstname,
      'lastname': lastname
    };

    console.log(item);

    if (checkType === 'modify'){
      $.ajax({
        url:'https://progectstudentapp.herokuapp.com/student/update',
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
        url:'https://progectstudentapp.herokuapp.com/student/create',
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
    let id = $(this).val();

    $.ajax({
      url:'https://progectstudentapp.herokuapp.com/student/delete'+'?'+$.param({"id":id}),
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
    let id = $(this).val();

    $.ajax({
      url:'https://progectstudentapp.herokuapp.com/student/findOne'+'?'+$.param({'id':id}),
      type:'get',
      dataType: 'JSON'
    }).done(function(response){
      let status = response.status;
      let data = response.data;

      if(status){
        $('#firstname').val(data.firstname);
        $('#lastname').val(data.lastname);

        let str = 'modify' + "-" + id;
        $('.btnSubmit').val(str);
      }else{
        alert(false, "Πρόβλημα στην αναζήτηση του μαθητή (" + data.message + ")");
      }
    });
  });

  $('.row').on('click', '.btnReset', function () { 
    resetForm();
  });
});

function getData(){
  $.ajax({
    url:'https://progectstudentapp.herokuapp.com/student/findAll', 
    type: 'get',
    dataType: 'JSON'
  }).done(function(response){
    let status = response.status;
    let data = response.data;

    if(status){
      createTbody(data);
    }else{
      alert(false, "Πρόβλημα στην αναζήτηση των μαθητών (" + data,message + ") ");
    }
  });
}

function createTbody(data){
  $('#studentTable > tbody').empty();

  let len = data.length;

  for(let i = 0; i < len; i++){
    let firstname = data[i].firstname;
    let lastname = data[i].lastname;
    let id = data[i]._id;

    let tr_str = "<tr>" +
                 "<td>" + firstname + "</td>" +
                 "<td>" + lastname + "</td>" + 
                 "<td>" + 
                      "<button class='btnUpdate btn btn-dark' value=\'" + 
                      id + "\'>Τροποποίηση</button>" +
                      "<button class='btnDelete btn btn-dark' value=\'" + 
                      id + "\'>Διαγραφή</button>" + 
                 "</td>" +
                 "</tr>";
    $('#studentTable tbody').append(tr_str);                  
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
  $("#frmStudent")[0].reset();
  $('.btnSubmit').val('insert');
}