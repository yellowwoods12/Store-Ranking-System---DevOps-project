from django.urls import path
from . import views

urlpatterns = [
    path('api/rankinglist/', views.RankingListCreate.as_view() ),
    path('api/onboard/', views.OnboardFetch.as_view() ),
]