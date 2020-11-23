from leads.models import Lead 
from .serializers import LeadSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from algorithm import algo 

class LeadList(APIView):
    #List all Leads or create a new Lead
    
    def get(self,request,format=None):
        queryset =  Lead.objects.all()
        serializer = LeadSerializer(queryset,many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        serializer = LeadSerializer(data=request.data)
        algo.algoFun(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk,format=None):
        q=self.get_object(pk)
        q.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
