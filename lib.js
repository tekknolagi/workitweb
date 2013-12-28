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

function Template (name) {
    return window.templateMap[name];
}

function Page (page, data) {
    data = data || {};
    return function() { $('#content').html(page(data)) };
}
