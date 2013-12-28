function setupRouter() {
    routie({
	'': pageJavascript.home,
	'dash': pageJavascript.dash,
	'logout': pageJavascript.logout
    });
}
