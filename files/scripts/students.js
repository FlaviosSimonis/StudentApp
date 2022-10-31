$(document).ready(function() {
  getData();

  $('.row').on('click','.btnSubmit', function(){
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();

    let item = {
      'firstname': firstname,
      'lastname': lastname
    };

    console.log(item);

    const checkType = $('.btnSubmit').val();

    if (checkType === 'modify'){
      $.ajax({
        url:'http://localhost:5000/student/update',
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
        url:'http://localhost:5000/student/create',
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
      url:'http://localhost:5000/student/delete'+'?'+$.param({"lastname":lastname}),
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
    let name = $(this).val().split("-");
    let lastname = name[1];
    let firstname = name[0];

    console.log(">>>",firstname);

    $.ajax({
      url:'http://localhost:5000/student/findOne'+'?'+$.param({'lastname':lastname,'firstname':firstname}),
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
    url:'http://localhost:5000/student/findAll', 
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
    let name = firstname +"-"+lastname;
    console.log(firstname, lastname, name)

    let tr_str = "<tr>" +
                 "<td>" + firstname + "</td>" +
                 "<td>" + lastname + "</td>" + 
                 "<td>" + 
                      "<button class='btnUpdate btn btn-dark' value=\'" + 
                      name + "\'>Τροποποίηση</button>" +
                      "<button class='btnDelete btn btn-dark' value=\'" + 
                      lastname + "\'>Διαγραφή</button>" + 
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