$(document).ready(function() {
    $.ajaxSetup({async: false});
    loadTemplates();
    setupRouter();

    var loginForm = $('form[name=login]');
    loginForm.submit(function () {
	makeRequest('/v1/get_auth_token', loginForm.serialize(), function (data) {
	    $('#content').text(data);
	});
	return false;
    });
});
