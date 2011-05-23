var Section = null;

$(document).ready(function() {
    var $body = $('body');
    
    Section = Class.extend({
        init: function(name, transEndTrigger, firstPage) {
            this.name = name;
            this.transEndTrigger = transEndTrigger;
            this.firstPage = firstPage;
            this.currentPage = null;
            this.isChangingPage = false;
            this.onHideCallback = null;
            this.onShowCallback = null;
        },
        
        hide: function(callback) {
            $body.removeClass(this.name);
            if(this.currentPage) {
                $body.removeClass(this.currentPage);
                this.currentPage = null;
            }
            onTransitionEndOnce($(this.transEndTrigger), callback);
            
            if(this.onHideCallback) {
                this.onHideCallback();
            }
        },
        
        show: function() {
            var self = this;
            this.isChangingPage = false;
            this.currentPage = null;
            $body.addClass(this.name);
            if(this.firstPage) {
                onTransitionEndOnce($(this.transEndTrigger), function() {
                    self.changePage(self.firstPage);
                });
            }
            if(this.onShowCallback) {
                this.onShowCallback();
            }
        },
        
        changePage: function(pageName) {
            var self = this,
                doChangePage = function() {
                    $body.addClass(pageName);
                    publish("pagechange", [pageName]);
                    self.isChangingPage = false;
                };
            
            if(pageName !== this.currentPage && !this.isChangingPage) {
                this.isChangingPage = true;
                if(this.currentPage) {
                    $body.removeClass(this.currentPage);
                    onTransitionEndOnce($('#'+this.currentPage), doChangePage);
                } else {
                    doChangePage();
                }
                this.currentPage = pageName;
            }
        },
        
        
        onHide: function(callback) {
            this.onHideCallback = callback;
        },
        
        onShow: function(callback) {
            this.onShowCallback = callback;
        }
    });
});