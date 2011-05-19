$(document).ready(function() {
    var $body = $('body');
    
    $('#spark-button').click(function() {
        $body.removeClass('home');
        $body.addClass('spark').addClass('spark-1');
    });
    
    $('#firefox-button').click(function() {
        $body.removeClass('home');
        $body.addClass('firefox');
    });
});