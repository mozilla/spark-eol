$(document).ready(function() {
    var $body = $('body'),
        home = new Section('home', '#phone-wrapper'),
        spark = new Section('spark', '#spark-content', 'spark-1'),
        firefox = new Section('firefox', '#firefox-content', 'layer-1'),
        currentSection;

    TWEEN.start();

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
            currentSection = firefox;
        });
    });
    $('#to-spark-page').click(function() {
        currentSection.hide(function() {
            spark.show();
            currentSection = spark;
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
        $('#separator .arrow').removeClass().addClass('arrow layer-1');
    });
    $('#firefox-content #phone-layer-2').click(function() {
        firefox.changePage('layer-2');
        $('#separator .arrow').removeClass().addClass('arrow layer-2');
    });
    $('#firefox-content #phone-layer-3').click(function() {
        firefox.changePage('layer-3');
        $('#separator .arrow').removeClass().addClass('arrow layer-3');
    });
    $('#firefox-content #phone-layer-4').click(function() {
        firefox.changePage('layer-4');
        $('#separator .arrow').removeClass().addClass('arrow layer-4');
    });
    
    // Prevent some elements from firing 'transitionend' events
    $('.silent').bind(TRANSITION_END, false);
    
    // Initialize CountUp widgets
    $('.countup').each(function() {
        new CountUp($(this));
    });
    
    // Initialize several chart widgets
    new PieChart('#spark-1 .block-2', 75, 75, 75, 1000, [{start: -90, end: 70, color: '#ee3939'},
                                                         {start: 70, end: 200, color: '#ec5f39'},
                                                         {start: 200, end: 270, color: '#fbad46'}]);
    
    new RingChart('#spark-3 .block-2', 63, 63, 50, 1000, 15, [{start: -90, end: 45, color: '#ee3939'},
                                                              {start: 45, end: 135, color: '#ec5f39'},
                                                              {start: 135, end: 225, color: '#fbad46'},
                                                              {start: 225, end: 270, color: '#f7e35f'}]);
    
    new LineChart('#spark-1 .block-3', 500, 120, '#4fe377', 500, [0, 70, 35, 45, 87, 56, 104, 116]);
    
    new BadgeChart('#spark-3 .block-4', 'one', 40, 40, 35, 1000, 10, [{start: -90, end: 205, color: '#fbad46'}]);
    new BadgeChart('#spark-3 .block-4', 'two', 40, 40, 35, 1000, 10, [{start: -90, end: 70, color: '#fbad46'}]);
    
    // Sharing popups
    function tweetPopup(url) {
        var h = $(window).height(),
            w = $(window).width(),
            top = (h / 2) - (450 / 2),
            left = (w / 2) - (550 / 2);

    	newwindow = window.open(url,'name','height=450,width=550,top='+top+',left='+left);
    	if (window.focus) {newwindow.focus()}
    }
    
    function fbPopup(url) {
        var h = $(window).height(),
            w = $(window).width(),
            top = (h / 2) - (400 / 2),
            left = (w / 2) - (580 / 2);

    	newwindow = window.open(url,'name','height=400,width=580,top='+top+',left='+left);
    	if (window.focus) {newwindow.focus()}
    }
    
    $('a.facebook-icon').click(function() {
         var url = $(this).attr('href');

        fbPopup(url);
        return false;
    });
    
    $('a.twitter-icon').click(function() {
         var url = $(this).attr('href');

        tweetPopup(url);
        return false;
    });
    
    $('#layer-1 .video-thumbnail').click(function() {
        showPlayer('firefox-video');
    });
    
    $('#layer-3 .video-thumbnail').click(function() {
        showPlayer('sync-video');
    });
    
    $mask.click(function() {
        hidePlayer();
    });
    
    initNewsletterForm();
});