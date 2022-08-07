from django.db import models

# Create your models here.

class Person(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=150, blank=False, default='')
    age = models.IntegerField(default=0)
    
class Meta:
    ordering = ('name')
    
