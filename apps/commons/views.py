import logging
import os
import socket
import StringIO
import time


from django import http
from django.conf import settings
from django.core.cache import cache, parse_backend_uri
from django.http import (HttpResponsePermanentRedirect, HttpResponseRedirect,
                         HttpResponse)
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect

import jingo

from commons.urlresolvers import reverse
from commons.utils import is_mobile_request


def handle403(request):
    """A 403 message that looks nicer than the normal Apache forbidden page."""
    if is_mobile_request(request):
        template = 'commons/handlers/mobile/403.html'
    else:
        template = 'commons/handlers/desktop/403.html'
    return jingo.render(request, template, status=403)


def handle404(request):
    """Redirect to home"""
    if is_mobile_request(request):
        view = reverse('eol.home_mobile')
    else:
        view = reverse('eol.home')
    return HttpResponseRedirect(view)


def handle500(request):
    """A 500 message that looks nicer than the normal Apache error page."""
    if is_mobile_request(request):
        template = 'commons/handlers/mobile/500.html'
    else:
        template = 'commons/handlers/desktop/500.html'
    return jingo.render(request, template, status=500)


def redirect_to(request, url, permanent=True, **kwargs):
    """Like Django's redirect_to except that 'url' is passed to reverse."""
    dest = reverse(url, kwargs=kwargs)
    if permanent:
        return HttpResponsePermanentRedirect(dest)

    return HttpResponseRedirect(dest)


def robots(request):
    """Generate a robots.txt."""
    template = jingo.render(request, 'robots.html')
    return HttpResponse(template, mimetype='text/plain')
