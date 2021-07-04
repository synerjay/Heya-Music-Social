from django.contrib import admin
from .models import Profile, Genre, Artists, Tracks

# Register your models here.
admin.site.register(Profile)
admin.site.register(Genre)
admin.site.register(Artists)
admin.site.register(Tracks)
