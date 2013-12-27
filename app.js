$(document).ready(function() {
    var templateList = $('.template');
    var templateMap = {};
    templateList.each(function (ind, val) {
	var templateText = val.text;
	var templateName = val.getAttribute('id').split("-")[0];
	templateMap[templateName] = Handlebars.compile(templateText);
    });

    var Template = function(name) {
	return templateMap[name];
    }

    var Page = function(page, data) {
	if (typeof(data) === 'undefined') data = {};
	return function() { $('#content').html(page(data)) };
    }

    routie({
	'/ index': Page(Template('login'));
	'register': Page(Template('register'), {name: 'Max'}),
	'aloha': function() {
	    $('#greeter').html('Welcome to Hawaii!');
	},
	'greet/:name': function(name) {
	    Page(Template('greeter'), {name: name})();
	}
	routie('/');
    });

});
