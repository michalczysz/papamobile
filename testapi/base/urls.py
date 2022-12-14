from django.urls import path
from . import views

urlpatterns = [
        path('', views.getData),
        path('add', views.addCar),
        path('filter', views.BrandSearch.as_view(), name='listcreate'),
  #      path('brand_cound/<int:pk>', views.MostCommonBrand.as_view(), name='brandsearch'),
  #      path('brand_count', views.mcBrand),
        path('daily_avg/detail', views.MBrand.as_view(), name='brandcount'),
        path('daily_avg', views.DailyAvgPrice.as_view(), name='pricenow'),
        path('user_search', views.MedianSearch.as_view(), name='fasttt'),
        path('date_list', views.DList.as_view(), name='list_by_date'),
        path('ibb', views.Import_by_brand.as_view(), name='import_by_country'),
        path('cby', views.Count_by_import.as_view(), name='count_by_import'),
        path('mbrand', views.MBrandList.as_view({'get': 'list', }), name='test'),
        path('mbrand/<str:pk>', views.MBrandList.as_view({'get': 'retrieve', }), ),

        path('user_search/plots', views.DailyPlotsUpdate.as_view(), name='update_plots')
        ]
