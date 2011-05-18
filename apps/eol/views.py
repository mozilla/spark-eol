import jingo


def home(request):
    return jingo.render(request, 'eol/desktop/home.html')


def spark(request):
    return jingo.render(request, 'eol/desktop/spark.html')
    

def firefox(request):
    return jingo.render(request, 'eol/desktop/firefox.html')


def home_mobile(request):
    return jingo.render(request, 'eol/mobile/home.html')


def spark_mobile(request):
    return jingo.render(request, 'eol/mobile/spark.html')


def firefox_mobile(request):
    return jingo.render(request, 'eol/mobile/firefox.html')