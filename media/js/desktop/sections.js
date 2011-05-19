var Section = null;

$(document).ready(function() {
    var $body = $('body'),
        TRANSITION_END = 'transitionend webkitTransitionEnd oTransitionEnd';
    
    Section = Class.extend({
        init: function(name) {
            this.name = name;
            this.currentPage = null;
        },
        
        hide: function(callback) {
            $body.removeClass(this.name);
            $(this.transEndTrigger).bind(TRANSITION_END, callback);
        },
        
        show: function() {
            var self = this;
            $body.addClass(this.name);
            if(this.currentPage) {
                $(this.transEndTrigger).bind(TRANSITION_END, function() {
                    $body.addClass(self.currentPage);
                });
            }
        }
    });
});