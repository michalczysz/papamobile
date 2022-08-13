from django.urls import path
from . import views

urlpatterns = [
        path('', views.getData),
        path('add', views.addCar),
        path('filter', views.BrandSearch.as_view(), name='listcreate'),
  #      path('brand_cound/<int:pk>', views.MostCommonBrand.as_view(), name='brandsearch'),
  #      path('brand_count', views.mcBrand),
        path('mbrand', views.MBrand.as_view(), name='brandcount'),
        path('daily_avg', views.DailyAvgPrice.as_view(), name='pricenow'),
        path('user_search', views.MedianSearch.as_view(), name='fasttt')
]
