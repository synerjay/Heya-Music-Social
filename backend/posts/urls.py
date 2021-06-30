from django.urls import include, path
from . import views

urlpatterns = [
  path('', views.get_add_posts),
  path('<int:post_id>', views.get_one_post),
]