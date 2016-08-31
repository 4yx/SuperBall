$(document).ready(function() {
        if (!window.localStorage) {
            alert('Your browser does not support HTML5 localStorage. Try upgrading.');
        } else {
            $("#return_form").submit(function(){
	                    setAllItems();
            });						
	}
});

var setAllItems = function(){
	var name=$("input[name='usernamesignup']").val() , pass=$("input[name='emailsignup']").val(), email=$("input[name='emailsignup']").val();
    
	

	// turn data into JSON string
	localStorage.setItem("name",name);
		localStorage.setItem("pass",pass);
	localStorage.setItem("email",email);

	};

	