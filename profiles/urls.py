from django.urls import include, path
from . import views

urlpatterns = [
  path('', views.create_delete_profile),
  path('me', views.get_own_profile),
  path('members', views.get_all_profiles),
  path('member/<str:username>', views.get_one_profile),
  path('album', views.add_album),
  path('album/<slug:album_id>', views.delete_album),
  path('artist', views.add_artist),
  path('artist/<slug:art_id>', views.delete_artist),
  path('track', views.add_track),
  path('track/<slug:track_id>', views.delete_track),
]
