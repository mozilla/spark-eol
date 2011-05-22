import re

from django import forms
from django.conf import settings

from tower import ugettext as _, ugettext_lazy as _lazy

EMAIL_INVALID = _lazy(u'Please enter a valid email address.')
EMAIL_REQUIRED = _lazy(u'Please enter an email address.')


class NewsletterForm(forms.Form):
    email = forms.EmailField(error_messages={'required': EMAIL_REQUIRED,
                                             'invalid': EMAIL_INVALID})