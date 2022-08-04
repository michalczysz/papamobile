#from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import cars
from .serializers import carsSerializer

# Create your views here.

@api_view(['GET'])
def getData(request):
    car = cars.objects.all()
    serializer = carsSerializer(car, many = True)
    return Response(serializer.data)