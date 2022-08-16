# pyright: basic

from dataclasses import fields # type: ignore
from rest_framework import serializers
from base.models import NewCars, DailyAvg

class NewCarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewCars
        fields ='__all__'

class BrandCountSerializer(serializers.ModelSerializer):
    brand_count = serializers.SerializerMethodField()
    class Meta:
        model = NewCars
        fields = ['brand', 'brand_count']
    def get_brand_count(self, obj):
        return obj.brand.count('BMW')

class MedianSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewCars
        fields = ('price', 'color', 'fuel', 'milage', 'year', 'import_country')

class DailyAvgSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyAvg
        fields = '__all__'
