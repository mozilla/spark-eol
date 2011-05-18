from django.conf.urls.defaults import patterns, url

from commons.views import redirect_to
from . import views

urlpatterns = patterns('',
    url(r'^$', redirect_to, {'url': 'eol.home'}),
    url(r'^home$', views.home, name='eol.home'),
    url(r'^spark$', views.spark, name='eol.spark'),
    url(r'^firefox$', views.firefox, name='eol.firefox'),

    url(r'^m/$', redirect_to, {'url': 'eol.home_mobile'}),
    url(r'^m/home$', views.home_mobile, name='eol.home_mobile'),
    url(r'^m/spark$', views.spark_mobile, name='eol.spark_mobile'),
    url(r'^m/firefox$', views.firefox_mobile, name='eol.firefox_mobile'),
)