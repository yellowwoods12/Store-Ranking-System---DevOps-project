from django.db import models

# Create your models here.
#making 1st model
class Lead(models.Model):
    addressfield =  models.CharField(max_length=100, blank=True ,null=True)
    zipfield = models.CharField(max_length=100, blank=True, null=True)
    landmarksfield =  models.CharField(max_length=100, blank=True, null=True)
    lockerfield= models.CharField(max_length=100 ,blank=True ,null=True)
    query= models.CharField(max_length=100 ,blank=True, null=True)
    lattitude=models.CharField(max_length=100, blank=True ,null=True)
    longitude=models.CharField(max_length=100, blank=True ,null=True)