import jingo

from django.conf import settings
from django.utils.http import urlquote

from commons.decorators import post_required, ajax_required, json_view
from commons.urlresolvers import reverse

from responsys import responsys

from .forms import NewsletterForm
from .utils import TWITTER, FACEBOOK

def home(request):
    data = {
        'spark_url': 'https://spark.mozilla.org',
        'twitter_msg': urlquote(unicode(TWITTER)),
        'facebook_msg': unicode(FACEBOOK)
    }
    return jingo.render(request, 'eol/desktop/home.html', data)


@post_required
@ajax_required
@json_view
def newsletter(request):
    form = NewsletterForm(request.POST)
    valid = form.is_valid()
    if valid:
        # Register for newletter
        data = form.cleaned_data
        responsys.subscribe(settings.MOBILE_NEWSLETTER,
                            data['email'],
                            'html',
                            responsys.make_source_url(request),
                            request.locale)
        return {'status': 'success'}
    else:
        return {'status': 'error',
                'errors': dict(form.errors.iteritems())}
                

def home_mobile(request):
    data = {'page': 'home'}
    return jingo.render(request, 'eol/mobile/home.html', data)


def spark_sharing(request):
    data = {'page': 'sharing',
            'prev': reverse('eol.home_mobile'),
            'next': reverse('eol.around')}
    return jingo.render(request, 'eol/mobile/sharing.html', data)


def spark_around(request):
    data = {'page': 'around',
            'prev': reverse('eol.sharing'),
            'next': reverse('eol.hall')}
    return jingo.render(request, 'eol/mobile/around.html', data)


def spark_hall(request):
    data = {'page': 'hall',
            'prev': reverse('eol.around')}
    return jingo.render(request, 'eol/mobile/hall.html', data)
