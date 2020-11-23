from django.contrib import admin

# Register your models here.
from .models import Onboard
from .models import Rating
from .models import Throughput
from .models import Availability
from .models import Occupancy
from .models import Rankinglist

admin.site.register(Onboard)
admin.site.register(Rating)
admin.site.register(Throughput)
admin.site.register(Availability)
admin.site.register(Occupancy)
admin.site.register(Rankinglist)