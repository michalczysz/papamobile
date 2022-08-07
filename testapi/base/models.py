from django.db import models

# Create your models here.

class cars(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    brand = models.TextField()
    model = models.TextField()
    price = models.IntegerField()

class NewCars(models.Model):
    created =models.DateTimeField(auto_now_add=True)
    added = models.DateTimeField()
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    displacment = models.IntegerField()
    fuel = models.CharField(max_length=100)
    power = models.IntegerField()
    gearbox = models.CharField(max_length=100)
    drive = models.CharField(max_length=100)
    chassis = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    import_country = models.CharField(max_length=100)


