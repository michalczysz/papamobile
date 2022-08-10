# pyright: basic

from dataclasses import fields # type: ignore
from rest_framework import serializers
from base.models import NewCars

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
