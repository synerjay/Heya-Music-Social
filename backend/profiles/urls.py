from django.urls import include, path
from . import views

urlpatterns = [
  path('me', views.get_own_profile),
]
