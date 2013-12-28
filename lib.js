window.JOBSPOT_VERSION = 'v1';

window.flashMessageKeys = {
    login_success: 'You have successfully logged in.',
    login_failure: 'Something went wrong with your login.',
    register_success: 'You have successfully registered.',
    register_failure: 'Something went wrong with your registration.',
    me_failure: "You don't have permission to access that.",
};

$.cookie.json = true;

window.pageJavascript = {
    home: function () {
	loadPage('home')();
	$('form[name=login] input[name=username]').focus();

	var loginForm = $('form[name=login]');
	loginForm.submit(function () {
	    makeRequest(JOBSPOT_VERSION, 'get_auth_token', loginForm.serialize(), function (data) {
		if (data.success) {
		    $.cookie('jobspot_user', {
			username: data.comment,
			auth_token: data.response
		    });
		    flashMessage('login_success');
		    routie('dash');
		}
		else flashMessage('login_failure', data.comment);
	    });
	    return false;
	});

	var registerForm = $('form[name=register]');
	registerForm.submit(function () {
	    makeRequest(JOBSPOT_VERSION, 'register', registerForm.serialize(), function (data) {
		if (data.success) {
		    $.cookie('jobspot_user', {
			username: data.comment,
			auth_token: data.response
		    });
		    flashMessage('register_success');
		}
		else flashMessage('register_failure', data.comment);
	    });
	});
    },
    dash: function () {
	var userObject = $.cookie('jobspot_user');
	if (userObject == undefined || userObject.auth_token == undefined) routie('');

	makeRequest(JOBSPOT_VERSION, 'user/me', userObject, function (data) {
	    if (data.success) {
		$.cookie('jobspot_userdata', data.response);
	    }
	    else flashMessage('me_failure');
	});
						 
	loadPage('dash', {
	    auth_token: $.cookie('jobspot_auth_token'),
	    user_data: $.cookie('jobspot_userdata')
	})();
    },
    logout: function () {
	var cookies = $.cookie();
	for (var cookie in cookies) {
	    $.removeCookie(cookie);
	}
	routie('');
    }
}

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
}

function idToName (id) {
    return id.split('-').slice(0, -1).join('-');
}

function compileTemplate (templateName, templateText) {
    window.templateMap[templateName] = Handlebars.compile(templateText);
}

function compilePartialTemplate (templateName, templateText) {
    Handlebars.registerPartial(templateName, templateText);
}

function loadTemplates () {
    var templateList = $('[type*=x-handlebars]');
    window.templateMap = {};
    templateList.each(function (ind, val) {
	var templateName = idToName(val.getAttribute('id'));
	var templateUrl = 'templates/'+templateName+'.html';
	$.get(templateUrl, function (data) {
	    var templateText = data;

	    if (templateName.endsWith('partial')) {	
		console.log('compiling partial '+templateName);
		compilePartialTemplate(templateName, templateText);
	    }
	    else {
		console.log('compiling template '+templateName);
		compileTemplate(templateName, templateText);
	    }
	});
    });
}

function makeRequest (version, url, data, callback) {
    callback = callback || function () {};
    data = data || {};
    $.post('http://jobspot.net/'+version+'/'+url, data).done(callback);
}

function flashMessage (key, extra) {
    extra = extra || "";
    flash = $('#flash');
    flash.html(flashMessageKeys[key]+" "+extra);
    flash.fadeIn(400).delay(5000).fadeOut(400);
}

function Page (name, page, data) {
    return function () {
	$('#content').html(page(data));
    };
}

function loadPage (name, data) {
    data = data || {};
    return Page(name, templateMap[name], data);
}
