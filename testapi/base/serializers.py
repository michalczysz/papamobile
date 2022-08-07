# pyright: basic

from dataclasses import fields # type: ignore
from rest_framework import serializers
from base.models import cars
from base.models import NewCars

class carsSerializer(serializers.ModelSerializer):
    class Meta:
        model = cars
        fields = '__all__'

class NewCarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewCars
        fields ='__all__'
