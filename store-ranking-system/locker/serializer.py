from rest_framework import serializers
from .models import Rankinglist

class RankingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rankinglist
        fields = '__all__'


class OnboardSerializer(serializers.Serializer):
    address = serializers.CharField(max_length=200)
    zipcode = serializers.CharField(max_length=200)
    lockername = serializers.CharField(max_length=200)
    num_of_locker = serializers.CharField(max_length=200)
    start_time = serializers.CharField(max_length=200)
    end_time = serializers.CharField(max_length=200)
    daystring = serializers.CharField(max_length=200)
    lattitude = serializers.FloatField(max_value=None, min_value=None)
    longitude = serializers.FloatField(max_value=None, min_value=None)
