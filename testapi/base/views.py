#from django.shortcuts import render
from rest_framework import request
from rest_framework import response
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics, filters
from base.models import NewCars
from .serializers import BrandCountSerializer, NewCarsSerializer# Create your views here.

@api_view(['GET'])
def getData(request):
    car = NewCars.objects.all()
    serializer = NewCarsSerializer(car, many = True)
    return Response(serializer.data)

#class MostCommonBrand(request):
#    serializer_class = BrandCountSerializer
#    def get_queryset(self):
#        return NewCars.objects


@api_view(['GET'])
def mcBrand(request):
    car = NewCars.objects.all()
    serializer = BrandCountSerializer(car, many = True)
    return Response(serializer.data)

class BrandSearch(generics.ListAPIView):
    serializer_class = NewCarsSerializer
    def get_queryset(self):
        brand = self.request.query_params.get('brand', None)
        #print(brand)
        return NewCars.objects.filter(brand=brand)
    #queryset = NewCars.objects.all()
    #filter_backends = [filters.SearchFilter]
    #search_fields = ['^brand']


@api_view(['POST'])
def addCar(request):
    serializer = NewCarsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


