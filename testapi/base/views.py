#from django.shortcuts import render
from rest_framework import request
from rest_framework import response
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from base.models import NewCars, DailyAvg
from .serializers import BrandCountSerializer, MedianSerializer, NewCarsSerializer, DailyAvgSerializer
from .__init__ import brands

# Import statistics Library
import statistics

@api_view(['GET'])
# @permission_classes((IsAuthenticatedOrReadOnly, ))
def getData(request):
    car = NewCars.objects.all()
    serializer = NewCarsSerializer(car, many = True)
    return Response(serializer.data)

class MostCommonBrand(generics.RetrieveAPIView):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = NewCars.objects.all()
    serializer_class = BrandCountSerializer

class MBrand(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, request):
        cars = NewCars.objects.all()
        cars = detail_search(self.request, cars)

        # output = []
        # for brand in brands:
        #     count = NewCars.objects.filter(brand__iexact=brand).count()
        #     if count > 0 :
        #         output.append( { 'brand': brand, 'count': count} )
        return Response(BrandCountSerializer(cars, many = True).data)

class MBrandList(viewsets.ViewSet):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset_temp = NewCars.objects.all()
    output_filter = []
    for brand in brands:
        count = queryset_temp.filter(brand__iexact=brand).count()
        if count > 0 : output_filter.append( { 'brand': brand, 'count': count} )

    def list(self, request):
        output = self.output_filter #.objects.filter(brand__iexact='bmw')
        return Response(output)
    
    def retrieve(self, request, pk=None):
        output = []
        models_in_brands = self.queryset_temp.filter(brand__iexact= pk)
        # below is written custom distinc() function which is not supported
        # in SQLite in django. It supposed to be suppresed by distinc()
        # function when database will migrate to PostgreSQL
        for car in models_in_brands:
            flag = False
            for index, model in enumerate(output):
                if model[0] == car.model:
                    output[index][1] = output[index][1] + 1
                    flag = True
                    break
            if flag == False: output.append([car.model, 1])
    
        return Response({'brand': pk, 'models': output, 'count': len(output)})

class DList(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, request):
        date = self.request.query_params.get('date', None)
        filter = NewCars.objects.filter(added=date).all()
        serializer = NewCarsSerializer(filter, many = True)
        return Response( serializer.data )

class MedianSearch(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, request):
        user_field = self.request.query_params.get('field', None)
        user_search = self.request.query_params.get('search', None)
        
        prices = []
        cars = NewCars.objects.all()

        cars = detail_search(self.request, cars)
        
        if user_field == 'color': cars = cars.filter(color__iexact=user_search)
        if user_field == 'fuel': cars = cars.filter(fuel__iexact=user_search)
        if user_field == 'milage': cars = cars.filter(milage__gte = int(user_search) * 1000, milage__lte = (int(user_search) + 10 ) * 1000 )
        if user_field == 'year': cars = cars.filter(year__iexact=user_search)
        if user_field == 'import_country': cars = cars.filter(import_country__iexact=user_search)

        serializer = MedianSerializer(cars, many=True)
        for car in serializer.data: prices.append(car['price'])
        count = len(prices)
        return Response({'median': (statistics.median(prices) if count > 0 else 0), 'count': count})#, 'debug': serializer.data})

class DailyAvgPrice(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = DailyAvgSerializer
    queryset = DailyAvg.objects.all()

class BrandSearch(generics.ListAPIView):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = NewCarsSerializer
    def get_queryset(self):
        brand = self.request.query_params.get('brand', None)
        return NewCars.objects.filter(brand=brand)

class Import_by_brand(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, request):
        brand = self.request.query_params.get('brand', None)
        import_c = self.request.query_params.get('import', None)
        cars = NewCars.objects.filter(brand__iexact = brand, import_country__iexact = import_c).count()
        # serializer = MedianSerializer(cars, many = True)
        return Response({'count': cars})

class Count_by_import(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, request):
        country = self.request.query_params.get('country', None)
        queryset = NewCars.objects.all()
        queryset = detail_search(self.request, queryset)
        count = queryset.filter(import_country__iexact = country).count()
        total = queryset.count()
        return Response({'count': count, 'total': total})

def detail_search(params, set):
    output = set

    brand = params.query_params.get('brand_d', None)
    model = params.query_params.get('model_d', None)
    year_since = params.query_params.get('year_since_d', None)
    year_till = params.query_params.get('year_till_d', None)

    print(brand, model, year_since, year_till, output.count())

    if brand != None: output = output.filter(brand__iexact = brand)
    if model != None: output = output.filter(model__iexact = model)
    if year_since != None: output = output.filter(year__gte = year_since)
    if year_till != None: output = output.filter(year__lte = year_till)

    return output
    

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def addCar(request):
    serializer = NewCarsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


