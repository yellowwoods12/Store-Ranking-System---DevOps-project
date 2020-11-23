
from django.urls import path
from . import views
urlpatterns = [
  path('', views.index),
  path('search/',views.index),
  path('search/listview/', views.index),
  path('onboard/', views.index),
  path('onboard/results/', views.index),
]