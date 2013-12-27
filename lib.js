function loadTemplates() {
    var templateList = $("[type*=x-handlebars]");
    templateList.each(function (ind, val) {
	var templateUrl = val.getAttribute('src');
	$.get(templateUrl, function (data) {
	    $(val).html(data);
	});
    });
}
