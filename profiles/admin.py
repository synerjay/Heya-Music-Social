from django.contrib import admin
from .models import Profile, Album, Artist, Track

# Register your models here.
admin.site.register(Profile)
admin.site.register(Album)
admin.site.register(Artist)
admin.site.register(Track)
