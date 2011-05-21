var $mask = $('#mask'),
    currentVideo;

var showPlayer = function(popupId) {
    var $popup = $('#' + popupId + '-popup'),
        video = document.getElementById(popupId);
    
    currentVideo = video;
    $mask.show();
    $popup.show();
    video.play();
};

var hidePlayer = function() {
    $mask.hide();
    $('.popup').hide(); 
    currentVideo.pause();
};