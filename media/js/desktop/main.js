$(document).ready(function() {
    var $body = $('body'),
        home = new Section('home', '#phone-wrapper'),
        spark = new Section('spark', '#spark-content', 'spark-1'),
        firefox = new Section('firefox', '#firefox-content', 'layer-1'),
        currentSection;

    // Homepage buttons
    $('#spark-button').click(function() {
        home.hide(function() {
            spark.show();
            currentSection = spark;
        });
    });
    $('#firefox-button').click(function() {
        home.hide(function() {
            firefox.show();
            currentSection = firefox;
        });
    });
    
    // Top navigation
    $('#back-to-home').click(function() {
        currentSection.hide(function() {
            home.show();
        });
    });
    $('#to-firefox-page').click(function() {
        currentSection.hide(function() {
            firefox.show();
        });
    });
    $('#to-spark-page').click(function() {
        currentSection.hide(function() {
            spark.show();
        });
    });
    
    // Spark menu
    $('#spark-content nav li:eq(0)').click(function() {
        spark.changePage('spark-1');
    });
    $('#spark-content nav li:eq(1)').click(function() {
        spark.changePage('spark-2');
    });
    $('#spark-content nav li:eq(2)').click(function() {
        spark.changePage('spark-3');
    });
    
    // Firefox menu
    $('#firefox-content #phone-layer-1').click(function() {
        firefox.changePage('layer-1');
    });
    $('#firefox-content #phone-layer-2').click(function() {
        firefox.changePage('layer-2');
    });
    $('#firefox-content #phone-layer-3').click(function() {
        firefox.changePage('layer-3');
    });
    $('#firefox-content #phone-layer-4').click(function() {
        firefox.changePage('layer-4');
    });
    
    // Initialize CountUp widgets
    $('.countup').each(function() {
        new CountUp($(this));
    })
});