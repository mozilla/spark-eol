import jingo

from django.conf import settings
from django.utils.http import urlquote

from commons.decorators import post_required, ajax_required, json_view, mobile_view
from commons.urlresolvers import reverse

from responsys import responsys

from .forms import NewsletterForm
from .utils import TWITTER, FACEBOOK, LEVEL, WEEK_NUMBER, LEADERBOARD_TOOLTIP


share_history =  [0, 1200, 2653, 4500, 1523, 458, 987, 5968]

top_players = [('Batman', 169, 31, 'us'),
               ('Jack', 69, 27, 'es'),
               ('Michael', 43, 22, 'fr'),
               ('Leeroy', 30, 14, 'gb'),
               ('James', 28, 12, 'br'),
               ('firefoxuser', 25, 13, 'de'),
               ('Guigui', 19, 9, 'cn'),
               ('Bob', 14, 8, 'ru'),
               ('Miguel', 11, 5, 'ar'),
               ('Franck', 10, 4, 'ca')]


def sharing_messages():
    return {'twitter_msg': urlquote(unicode(TWITTER)),
            'facebook_msg': unicode(FACEBOOK)}


def level_distribution():
    percentages = [43, 25, 12, 2]
    return [(unicode(LEVEL) % dict(num=i+1), p) for i, p in enumerate(percentages)]


def player_tooltips():
    tooltips = {}
    for name, num_shares, num_badges, cc in top_players:
        tooltips[name] = unicode(LEADERBOARD_TOOLTIP) % dict(username=name, 
                                                             city='?',
                                                             country='?',
                                                             num_shares=num_shares,
                                                             num_badges=num_badges)
    return tooltips


@mobile_view('eol.home_mobile')
def home(request):
    data = {'spark_url': 'https://spark.mozilla.org',
            'levels': level_distribution(),
            'week_number': unicode(WEEK_NUMBER) % dict(num=0),
            'share_history': share_history,
            'top_players': top_players,
            'player_tooltips': player_tooltips()}
    data.update(sharing_messages())
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
    data.update(sharing_messages())
    return jingo.render(request, 'eol/mobile/home.html', data)


def spark_sharing(request):
    data = {'page': 'sharing',
            'prev': reverse('eol.home_mobile'),
            'next': reverse('eol.around'),
            'share_history': [(unicode(WEEK_NUMBER) % dict(num=i+1), v) for i, v in enumerate(share_history)]}
    data.update(sharing_messages())
    return jingo.render(request, 'eol/mobile/sharing.html', data)


def spark_around(request):
    data = {'page': 'around',
            'prev': reverse('eol.sharing'),
            'next': reverse('eol.hall')}
    data.update(sharing_messages())
    return jingo.render(request, 'eol/mobile/around.html', data)


def spark_hall(request):
    data = {'page': 'hall',
            'prev': reverse('eol.around'),
            'levels': level_distribution(),
            'top_players': top_players}
    data.update(sharing_messages())
    return jingo.render(request, 'eol/mobile/hall.html', data)
