$(document).ready(function() {
    var $body = $('body');
    
    var home = new Section('home');
    home.transEndTrigger = '#home';

    var spark = new Section('spark');
    spark.transEndTrigger = '#spark-content';
    spark.currentPage = 'spark-1';
    
    $('#spark-button').click(function() {
        home.hide(function() {
            spark.show();
        });
    });
    
    $('#firefox-button').click(function() {
        $body.removeClass('home');
        $body.addClass('firefox');
    });
    
    $('#back-to-home').click(function() {
        spark.hide(function() {
            home.show();
        });
    });
});