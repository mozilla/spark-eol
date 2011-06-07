import jingo

from django.conf import settings
from django.utils.http import urlquote

from commons.decorators import post_required, ajax_required, json_view, mobile_view
from commons.urlresolvers import reverse
from commons.utils import get_city_fullname, get_country_name

from responsys import responsys

from .forms import NewsletterForm
from .utils import (TWITTER, FACEBOOK, LEVEL, WEEK_NUMBER, LEADERBOARD_TOOLTIP,
                   EUROPE, NORTH_AMERICA, SOUTH_AMERICA, AFRICA, ASIA, AUSTRALIA)


share_history =  [1382, 1809, 2058, 2335, 2904, 3519, 3940, 4291]

top_players = [('Ludovic', 144, 6, 'nl', 'Den Haag'),
               ('penguinguru', 82, 6, 'us', 'Philadelphia'),
               ('chait008', 55, 20, 'in', 'Hyderabad'),
               ('Firefox_Freak', 47, 20, 'in', 'Chennai'),
               ('cooljackz', 43, 22, 'ph', 'Davao City'),
               ('PaDrO', 37, 6, 'us', 'New York'),
               ('sidstamm', 34, 3, 'us', 'Mountain View'),
               ('galaxyk', 27, 19, 'in', 'Pune'),
               ('mInAsUkA', 26, 22, 'mx', 'Mexico City'),
               ('Jsimonetti', 21, 3, 'us', 'Sugarloaf')]

continents_sparked = [(AFRICA, 2),
                      (AUSTRALIA, 3),
                      (SOUTH_AMERICA, 5),
                      (ASIA, 17),
                      (EUROPE, 25),
                      (NORTH_AMERICA, 48)]


def sharing_messages():
    return {'twitter_msg': urlquote(unicode(TWITTER)),
            'facebook_msg': unicode(FACEBOOK)}


def level_distribution():
    percentages = [45, 55, '< 1', '< 1']
    return [(unicode(LEVEL) % dict(num=i+1), p) for i, p in enumerate(percentages)]


def player_tooltips(locale):
    tooltips = {}
    for name, num_shares, num_badges, cc, city in top_players:
        tooltips[name] = unicode(LEADERBOARD_TOOLTIP) % dict(username=name,
                                                             city=city,
                                                             country=get_country_name(cc, locale),
                                                             num_shares=num_shares,
                                                             num_badges=num_badges)
    return tooltips


def most_sparked_cities(locale):
    cities = [('New York', 'US'),
              ('Atlanta', 'US'),
              ('Chicago', 'US'),
              ('Detroit', 'US'),
              ('Washington', 'US'),
              ('San Francisco', 'US')]
    return [get_city_fullname(city, cc, locale) for city, cc in cities]


def most_active_countries(locale):
    return [get_country_name(cc, locale) for cc in ['US', 'GB', 'DE']]


@mobile_view('eol.home_mobile')
def home(request):
    data = {'spark_url': 'https://spark.mozilla.org',
            'levels': level_distribution(),
            'week_number': unicode(WEEK_NUMBER) % dict(num=0),
            'share_history': share_history,
            'top_players': top_players,
            'player_tooltips': player_tooltips(request.locale),
            'cities': most_sparked_cities(request.locale),
            'countries': most_active_countries(request.locale),
            'continents': continents_sparked}
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
            'prev': reverse('eol.hall'),
            'next': reverse('eol.around'),
            'share_history': [(unicode(WEEK_NUMBER) % dict(num=i+1), v) for i, v in enumerate(share_history)]}
    data.update(sharing_messages())
    return jingo.render(request, 'eol/mobile/sharing.html', data)


def spark_around(request):
    mobile_continents = list(continents_sparked)
    mobile_continents.reverse()
    data = {'page': 'around',
            'prev': reverse('eol.sharing'),
            'cities': most_sparked_cities(request.locale),
            'countries': most_active_countries(request.locale),
            'continents': mobile_continents}
    data.update(sharing_messages())
    return jingo.render(request, 'eol/mobile/around.html', data)


def spark_hall(request):
    data = {'page': 'hall',
            'prev': reverse('eol.home_mobile'),
            'next': reverse('eol.sharing'),
            'levels': level_distribution(),
            'top_players': top_players}
    data.update(sharing_messages())
    return jingo.render(request, 'eol/mobile/hall.html', data)
