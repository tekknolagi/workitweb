function loadTemplates() {
    var templateList = $("[type*=x-handlebars]");
    templateList.each(function (ind, val) {
	var templateUrl = val.getAttribute('src');
	console.log(templateUrl);
	$.get(templateUrl, function (data) {
	    $(val).html(data);
	});
    });
}

function compileTemplates() {
    var templateList = $("[type*=x-handlebars-template]");
    window.templateMap = {};
    templateList.each(function (ind, val) {
	var templateText = val.text;
	var templateName = val.getAttribute('id').split('-', 1);
	console.log(templateName);
	window.templateMap[templateName] = Handlebars.compile(templateText);
    });

    var partialTemplateList = $("[type*=x-handlebars-partial-template]");
    partialTemplateList.each(function (ind, val) {
	var templateText = val.text;
	var templateName = val.getAttribute('id').split('-', 1);
	console.log(templateName);
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
