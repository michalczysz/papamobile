#from django.shortcuts import render
from rest_framework import request
from rest_framework import response
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import generics, filters
from base.models import NewCars, DailyAvg
from .serializers import BrandCountSerializer, MedianSerializer, NewCarsSerializer, DailyAvgSerializer
from .__init__ import brands

# Import statistics Library
import statistics

@api_view(['GET'])
def getData(request):
    car = NewCars.objects.all()
    serializer = NewCarsSerializer(car, many = True)
    return Response(serializer.data)

class MostCommonBrand(generics.RetrieveAPIView):
    queryset = NewCars.objects.all()
    serializer_class = BrandCountSerializer


@api_view(['GET'])
def mcBrand(request):
    car = NewCars.objects.all()
    serializer = BrandCountSerializer(car, many = True)
    return Response(serializer.data)

class MBrand(APIView):
    def get(self, request):
        # brands = ['BMW', 'Volvo', 'Tesla', 'Honda']
        output = []
        for brand in brands:
            output.append( { 'brand': brand, 'count': NewCars.objects.filter(brand__iexact=brand).count()} )
        return Response(output)

class MedianSearch(APIView):
    #serializer_class = MedianSerializer
    def get(self, request):
        user_field = self.request.query_params.get('field', None)
        user_search = self.request.query_params.get('search', None)
        prices = []
        cars = []
        if user_field == 'color': cars = NewCars.objects.filter(color__iexact=user_search)
        if user_field == 'fuel': cars = NewCars.objects.filter(fuel__iexact=user_search)
        
        if user_field == 'milage': cars = NewCars.objects.filter(milage__gte = int(user_search) * 1000, milage__lte = (int(user_search) + 10 ) * 1000 )#, milage_lte = (user_search + 100) * 1000)#>user_search * 1000, milage < (user_search + 100) * 1000)
        if user_field == 'year': cars = NewCars.objects.filter(year__iexact=user_search)
        if user_field == 'import_country': cars = NewCars.objects.filter(import_country__iexact=user_search)

        #print ( 'cars[0]__price' )    
        serializer = MedianSerializer(cars, many=True)
        for car in serializer.data: prices.append(car['price'])
        #return({serializer.data[0]})
        return Response({'median': statistics.median(prices), 'debug': serializer.data})

class DailyAvgPrice(generics.ListCreateAPIView):
    serializer_class = DailyAvgSerializer
    queryset = DailyAvg.objects.all()

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


