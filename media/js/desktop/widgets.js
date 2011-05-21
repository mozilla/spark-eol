var Widget = Class.extend({
    init: function($element) {
        var self = this,
            $previousSibling;
            
        this.$el = $element;
        this.pageName = $element.parent().attr('id');
        $previousSibling = this.$el.prev();
        
        if($previousSibling.length > 0) {
            onTransitionEnd($previousSibling, function() {
                self.animate();
            });
        } else {
            subscribe("pagechange",  function(pageName) {
                if(self.pageName === pageName) {
                    self.animate();
                }
            });
        }
    },
    
    animate: function() {}
});

var CountUp = Widget.extend({
    init: function($element) {
        var numberStr, regexp;
        
        this._super($element);
        this.duration = 350;
        this.$number = this.$el.find('.number');
        numberStr = this.$number.text();
        this.thousandsSeparator = numberStr.indexOf(',') >= 0 ? ',': ' ';
        regexp = this.thousandsSeparator === ',' ? /,+/g : /\s+/g;
        this.maxValue = parseInt(numberStr.replace(regexp, ''));
    },
    
    animate: function() {
        var self = this,
            counter = {value: 0},
            update = function() {
                self.$number.text(addThousandsSeparator(Math.round(counter.value), self.thousandsSeparator));
            };
        
        tween = new TWEEN.Tween(counter).to({value: this.maxValue}, this.duration).onUpdate(update).start();
    }
});