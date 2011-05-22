var initNewsletterForm = function() {
    var $form = $('#newsletter form'),
        $submitButton = $form.find('.submit'),
        $errorMessage = $form.parent().find('.error'),
        $successMessage = $form.parent().find('.success'),
        showError = function(fieldName, msg) {
            $errorMessage.text(msg);
        },
        processResponse = function(data) {
            if (data) {
        		if(data.status === 'error') {
        			$.each(data.errors, function(fieldname, errmsg) {
            		    showError(fieldname, errmsg[0]);
        			});
        		} else if(data.status === 'success') {
        		    $form.hide();
        		    $successMessage.show();
        		}
            }
        },
        options = {
            dataType: 'json',
            success: processResponse
        };
    
    $form.ajaxForm(options);
};