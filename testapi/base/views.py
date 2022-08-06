#from django.shortcuts import render
from rest_framework import request
from rest_framework import response
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

@api_view(['POST'])
def addCar(request):
    serializer = carsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
