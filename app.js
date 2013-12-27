$(document).ready(function() {
    loadTemplates();

    var templateList = $("[type*=x-handlebars-template]");
    var templateMap = {};
    templateList.each(function (ind, val) {
	var templateText = val.text;
	var templateName = val.getAttribute('id').split('-', 1);
	templateMap[templateName] = Handlebars.compile(templateText);
    });

    var partialTemplateList = $("[type*=x-handlebars-partial-template]");
    partialTemplateList.each(function (ind, val) {
	var templateText = val.text;
	var templateName = val.getAttribute('id').split('-', 1);
	Handlebars.registerPartial(templateName, templateText);
    });

    var Template = function(name) {
	return templateMap[name];
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
