$(document).ready(function() {
    var $body = $('body');
    
    $('#spark-button').click(function() {
        $body.removeClass('home');
        $body.addClass('spark');
    });
    
    $('#firefox-button').click(function() {
        $body.removeClass('home');
        $body.addClass('firefox');
    });
});