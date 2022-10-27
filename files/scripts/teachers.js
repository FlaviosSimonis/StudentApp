$(document).ready(function() {
  getData();

  $('row').on('click','btnSubmit', function(){
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();

    let item = {
      'firstname': firstname,
      'lastname': lastname
    };

    const checkType = $('.btnSubmit').val();

    if (checkType === 'modify'){
      $.ajax({
        url:'http://localhost:5000/teacher/update',
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
        url:'http://localhost:5000/teacher/create',
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
    let lastname = $(this).val();

    $.ajax({
      url:'http://localhost:5000/teacher/delete'+'?'+$.param({"lastname":lastname}),
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
    let lastname = $(this).val();

    $.ajax({
      url:'http://localhost:5000/teacher/findOne'+'?'+$.param({'lastname':lastname}),
      type:'get',
      dataType: 'JSON'
    }).done(function(response){
      let status = response.status;
      let data = response.data;

      if(status){
        $('#firstname').val(data.firstname);
        $('#lastname').val(data.lastname);

        // $('#lastname').prop("disabled", true);

        $('.btnSubmit').val('modify');
      }else{
        alert(false, "Πρόβλημα στην αναζήτηση του καθηγητή (" + data.message + ")");
      }
    });
  });
});

function getData(){
  $.ajax({
    url:'http://localhost:5000/teacher/findAll', 
    type: 'get',
    dataType: 'JSON'
  }).done(function(response){
    let status = response.status;
    let data = response.data;

    if(status){
      createTbody(data);
    }else{
      alert(false, "Πρόβλημα στην αναζήτηση των καθηγητών (" + data,message + ") ");
    }
  });
}

function createTbody(data){
  $('#teacherTable > tbody').empty();

  let len = data.length;

  for(let i = 0; i < len; i++){
    let firstname = data[i].firstname;
    let lastname = data[i].lastname;

    console.log(firstname, lastname)

    let tr_str = "<tr>" +
                 "<td>" + firstname + "</td>" +
                 "<td>" + lastname + "</td>" + 
                 "<td>" + 
                      "<button class='btnUpdate btn btn-primary' value=\'" + 
                      lastname + "\'>Τροποποίηση</button>" +
                      "<button class='btnDelete btn btn-primary' value=\'" + 
                      lastname + "\'>Διαγραφή</button>" + 
                 "</td>" +
                 "</tr>";
    $('#teacherTable tbody').append(tr_str);                  
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