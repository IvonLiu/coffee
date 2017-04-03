$(document).ready(function(){

  firebase.initializeApp(config);

  $('#form').submit(function(event) {

  	event.preventDefault();

  	name = $('#name-input').val();
  	email = $('#email-input').val();
  	existing = $('input[name="existing-input"]:checked').val();

  	if (!(name && email && existing)) {
  		alert('You must fill out all fields!');
  		return false;
  	}

  	addNewUser(name, email, existing);

  	$('#submit-btn').blur();
  	document.getElementById('form').reset();

  });

});

function addNewUser(name, email, existing) {

}