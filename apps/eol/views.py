import jingo


def home(request):
    return jingo.render(request, 'eol/desktop/home.html')


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