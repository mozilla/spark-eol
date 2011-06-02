import re
import math



def is_mobile_request(request):
    mobile_url = re.compile(r'.+/m/.+')
    return mobile_url.match(request.path) != None
    

def get_country_name(country_code, locale):
    from geo.countries import countries
    
    cc = country_code.lower()
    if cc in countries[locale]:
        country_name = countries[locale][cc]
    else:
        country_name = '?'
    
    return country_name


def get_city_fullname(city_name, country_code, locale):
    from geo.countries import countries
    
    if locale not in countries:
        locale = 'en-US'
    
    country_name = get_country_name(country_code, locale)
    
    return (city_name, country_name)


def get_ua(request):
    return request.META.get('HTTP_USER_AGENT', '')


def is_iphone(request):
    return 'iPhone' in get_ua(request)


def is_android(request):
    ua = get_ua(request)
    if 'Android' in ua:
        return True
    return False


def is_supported_non_firefox(request):
    ua = get_ua(request)
    if ('Android' in ua or 'Maemo' in ua) and not 'Firefox' in ua:
        return True
    return False


def is_firefox_mobile(request):
    ua = get_ua(request)
    if ('Android' in ua or 'Maemo' in ua) and 'Firefox' in ua:
        return True
    return False


def is_mobile(request):
    return is_iphone(request) or is_supported_non_firefox(request) or is_firefox_mobile(request)
