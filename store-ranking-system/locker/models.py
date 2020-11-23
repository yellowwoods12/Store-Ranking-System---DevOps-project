from django.db import models
from django.core.validators import RegexValidator
from django.core.validators import MinLengthValidator
# Create your models here.
class Onboard(models.Model):
	lockerid	=models.IntegerField(primary_key=True)
	name		=models.CharField(max_length=250)
	country		=models.CharField(max_length=100,
						validators=[RegexValidator(r'^[a-zA-Z ]+$',message='Numbers not allowed')],default="India")
	address 	=models.TextField()
	zipcode 	=models.CharField(max_length=6,
						validators=[RegexValidator(r'^\d{1,10}$',message='Only numbers are allowed'), MinLengthValidator(6)])
	total_slots =models.IntegerField()
	latitude	=models.FloatField(default="0.0000000")
	longitude	=models.FloatField(default="0.0000000")


class Rating(models.Model):
	lockerid	=models.ForeignKey(Onboard, on_delete=models.CASCADE)
	rating      =models.DecimalField(max_digits=2,decimal_places=1)

class Throughput(models.Model):
	lockerid	=models.ForeignKey(Onboard, on_delete=models.CASCADE)
	throughput  =models.FloatField()

class Availability(models.Model):
	lockerid		=models.OneToOneField(Onboard, on_delete=models.CASCADE,primary_key=True)
	non_del_days	=models.CharField('Non delivery days',max_length=7,default='0000000',
						validators=[RegexValidator(r'^\d{1,10}$',message='Letters not permissible'),MinLengthValidator(7)])
	timings_open 	=models.TimeField()
	timings_closed 	=models.TimeField()
	status			=models.BooleanField()

class Occupancy(models.Model):
	lockerid		=models.ForeignKey(Onboard, on_delete=models.CASCADE)
	date			=models.DateField()
	occupancy		=models.FloatField()	
	class Meta:
		unique_together=('lockerid','date')

class Rankinglist(models.Model):
	lockerid		=models.ForeignKey(Onboard, on_delete=models.CASCADE)
	rank 			=models.IntegerField()
	name			=models.CharField(max_length=250,
						validators=[RegexValidator(r'^[a-zA-Z ]+$',message='Numbers not allowed')])
	country			=models.CharField(max_length=100,
						validators=[RegexValidator(r'^[a-zA-Z ]+$',message='Numbers not allowed')])
	address 		=models.TextField()
	zipcode 		=models.CharField(max_length=6,
						validators=[RegexValidator(r'^\d{1,10}$',message='Only numbers are allowed'), MinLengthValidator(6)])
	non_del_days	=models.CharField('Non delivery days',max_length=7,default='0000000',
						validators=[RegexValidator(r'^\d{1,10}$',message='Letters not permissible'),MinLengthValidator(7)])
	timings_open 	=models.TimeField()
	timings_closed 	=models.TimeField()
	status			=models.BooleanField()
	dist            =models.FloatField(default=0.0)
	score           =models.FloatField(default=0.0)
	class Meta:
		unique_together=('lockerid','rank')

