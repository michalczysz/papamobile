from dataclasses import field
from rest_framework import serializers
from base.models import cars

class carsSerializer(serializers.ModelSerializer):
    class Meta:
        model = cars
        fields = '__all__'
