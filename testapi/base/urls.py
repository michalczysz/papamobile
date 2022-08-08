from django.urls import path
from . import views

urlpatterns = [
        path('', views.getData),
        path('add', views.addCar),
        path('filter', views.BrandSearch.as_view(), name='listcreate'),
#        path('brand_cound', views.MostCommonBrand.as_view(), name='brandcount')
        path('brand_count', views.mcBrand)
]
