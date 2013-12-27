$(document).ready(function() {
    loadTemplates();
    compileTemplates();

    var Template = function(name) {
	return window.templateMap[name];
    }

    var Page = function(page, data) {
	if (typeof(data) === 'undefined') data = {};
	return function() { $('#content').html(page(data)) };
    }
        
    routie({
	'': Page(Template('home')),
	'aloha': function() {
	    $('#content').html('Welcome to Hawaii!');
	},
	'greet/:name': function(name) {
	    Page(Template('greeter'), {name: name})();
	}
    });
});
