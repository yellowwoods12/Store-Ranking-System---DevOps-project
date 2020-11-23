from django.shortcuts import render
from .models import Rankinglist
from .serializer import RankingListSerializer
from .serializer import OnboardSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from algorithm import onboard

class RankingListCreate(generics.ListCreateAPIView):
    queryset = Rankinglist.objects.all()
    serializer_class = RankingListSerializer

class OnboardFetch(APIView):
    def post(self,request,format=None):
        serializer = OnboardSerializer(data=request.data)
        print(request.data)
        onboard.createLocker(request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

