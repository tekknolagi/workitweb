$(document).ready(function() {
    $.ajaxSetup({async: false});
    loadTemplates();
    setupRouter();
});
