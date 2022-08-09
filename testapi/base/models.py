from django.db import models

# Create your models here.

class cars(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    brand = models.TextField()
    model = models.TextField()
    price = models.IntegerField()

class NewCars(models.Model):
    created =models.DateTimeField(auto_now_add=True)
    added = models.DateTimeField(default='')
    brand = models.CharField(max_length=100, default='')
    model = models.CharField(max_length=100, default='')
    price = models.IntegerField(default=0)
    year = models.IntegerField(default=0)
    displacment = models.IntegerField(default=0)
    fuel = models.CharField(max_length=100, default='')
    power = models.IntegerField(default=0)
    gearbox = models.CharField(max_length=100, default='')
    milage = models.IntegerField(default=0)
    drive = models.CharField(max_length=100, default='')
    chassis = models.CharField(max_length=100, default='')
    color = models.CharField(max_length=100, default='')
    import_country = models.CharField(max_length=100, default='')


