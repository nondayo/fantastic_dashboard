from django.shortcuts import render
from django.http import HttpResponse
import json

# a = {'name': 'Sarah', 'age': 24, 'isEmployed': True}
# a python dictionary
# def retjson():
# python2json = json.dumps(a)
# print python2json
# retjson()


def data(request):
    print(request)
    a = {"error": [0],
         "x": ["2019-02-19", "2019-02-18", "2019-02-17", "2019-02-16", "2019-02-15", "2019-02-14", "2019-02-13"],
         "y": [1.52, 3.97, 5.61, 6.8, 9.48, 11.26, 9.33]}

    return HttpResponse(json.dumps(a))


def mapdata(request):
    m = [{"geometry": {"type": "Point", "coordinates": "[-104.9983545, 39.7502833]"}, "type": "Feature", "properties": {"popupContent": "popup 1"},
          "id": 1}, {"geometry": {"type": "Point", "coordinates": "[-104, 39.76]"}, "type": "Feature", "properties": {"popupContent": "popup 2"}, "id": 2}]
    return HttpResponse(json.dumps(m))


def index(request):
    # render(request, template_name, context=None,
    #        content_type=None, status=None, using=None)
    return render(request, 'dashboard/index.html')
