from django.conf.urls import url
from . import views

app_name = 'dashboard'
urlpatterns = [
    # url(r'^$', views.IndexView.as_view(), name='index')
    url(r'^data$', views.data, name='data'),
    url(r'^mapdata$', views.mapdata, name='mapdata'),
    url(r'^$', views.index, name='index')
]
