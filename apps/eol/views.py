import jingo

from django.utils.http import urlquote

from .utils import TWITTER, FACEBOOK

def home(request):
    data = {
        'spark_url': 'https://spark.mozilla.org',
        'twitter_msg': urlquote(unicode(TWITTER)),
        'facebook_msg': unicode(FACEBOOK)
    }
    return jingo.render(request, 'eol/desktop/home.html', data)


def spark(request):
    return jingo.render(request, 'eol/desktop/spark.html')
    

def firefox(request):
    return jingo.render(request, 'eol/desktop/firefox.html')


def home_mobile(request):
    return jingo.render(request, 'eol/mobile/home.html')


def spark_sharing(request):
    return jingo.render(request, 'eol/mobile/sharing.html')

def spark_around(request):
    return jingo.render(request, 'eol/mobile/around.html')

def spark_hall(request):
    return jingo.render(request, 'eol/mobile/hall.html')