from django.urls import include, path
from . import views

urlpatterns = [
  path('', views.create_profile),
  path('me', views.get_own_profile),
]
