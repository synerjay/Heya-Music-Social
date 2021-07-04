from django.urls import include, path
from . import views

urlpatterns = [
  path('', views.create_delete_profile),
  path('members', views.get_all_profiles),
  path('member/<int:user_id>', views.get_one_profile),
  path('me', views.get_own_profile),
  path('genre', views.add_genre),
  path('artist', views.add_artist),
  path('track', views.add_track),
]
