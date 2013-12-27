function loadTemplates() {
    var templateList = $('[type*=x-handlebars]');
    window.templateList.each(function (ind, val) {
	var templateName = val.getAttribute('id').split('-', 1).slice(0, -1);
	var templateUrl = 'templates/'+templateName+'.html';
	$.get(templateUrl, function (data) {
	    $('#'+val+'-template').html(data);
	});
    });
}

function compileTemplates() {
    var templateList = $('[type*=x-handlebars-template]');
    window.templateMap = {};
    templateList.each(function (ind, val) {
	var templateText = val.text;
	var templateName = val.getAttribute('id').split('-', 1);
	window.templateMap[templateName] = Handlebars.compile(templateText);
    });

    var partialTemplateList = $('[type*=x-handlebars-partial]');
    partialTemplateList.each(function (ind, val) {
	var templateText = val.text;
	var templateName = val.getAttribute('id').split('-', 1);
	Handlebars.registerPartial(templateName, templateText);
    });
}

window.Template = function (name) {
    return window.templateMap[name];
}

window.Page = function (page, data) {
    if (typeof(data) === 'undefined') data = {};
    return function() { $('#content').html(page(data)) };
}
