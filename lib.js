function idToName(id) {
    return id.split('-').slice(0, -1).join('-');
}

function loadTemplates() {
    var templateList = $('[type*=x-handlebars]');
    templateList.each(function (ind, val) {
	var templateName = idToName(val.getAttribute('id'));
	var templateUrl = 'templates/'+templateName+'.html';
	console.log('loading template '+templateUrl);
	$.get(templateUrl, function (data) {
	    $(val).html(data);
	});
    });
}

function compileTemplates() {
    var templateList = $('[type=text/x-handlebars]');
    window.templateMap = {};
    templateList.each(function (ind, val) {
	var templateText = val.text;
	var templateName = idToName(val.getAttribute('id'));
	console.log('compiling template '+templateName);
	window.templateMap[templateName] = Handlebars.compile(templateText);
    });

    var partialTemplateList = $('[type=text/x-handlebars-partial]');
    partialTemplateList.each(function (ind, val) {
	var templateText = val.text;
	var templateName = idToName(val.getAttribute('id'));
	console.log('compiling partial '+templateName);
	Handlebars.registerPartial(templateName, templateText);
    });
}

window.Template = function (name) {
    return window.templateMap[name];
}

window.Page = function (page, data) {
    data = data || {};
    return function() { $('#content').html(page(data)) };
}
