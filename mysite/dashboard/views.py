from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse
import json

# a = {'name': 'Sarah', 'age': 24, 'isEmployed': True}
# a python dictionary
# def retjson():
# python2json = json.dumps(a)
# print python2json
# retjson()


@csrf_exempt
def data(request):
    print(request)
    a = [{"error": [0],
          "x": ["2019-02-19", "2019-02-18", "2019-02-17", "2019-02-16", "2019-02-15", "2019-02-14", "2019-02-13"],
          "y": [1.52, 3.97, 5.61, 6.8, 9.48, 11.26, 9.33]}]

    return HttpResponse(json.dumps(a))


def mapdata(request):
    m = {"type": "FeatureCollection",
         "features": [{"geometry":
                       {"type": "Point",
                        "coordinates": [-104.9998, 39.7471]},
                       "type": "Feature",
                       "properties": {"popupContent": "pop1"},
                       "id": 51},
                      {"geometry":
                       {"type": "Point",
                        "coordinates": [-104.9984, 39.7503]},
                       "type": "Feature",
                       "properties": {"popupContent": "pop2"},
                       "id": 52}]}
    return HttpResponse(json.dumps(m))


def index(request):
    # render(request, template_name, context=None,
    #        content_type=None, status=None, using=None)
    return render(request, 'dashboard/index.html')
