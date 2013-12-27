function setupRouter() {
    routie({
	'': Page(Template('home')),
	'aloha': function() {
	    $('#content').html('Welcome to Hawaii!');
	},
	'greet/:name': function(name) {
	    Page(Template('greeter'), {name: name})();
	}
    });
}
