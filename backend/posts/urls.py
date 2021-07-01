from django.urls import include, path
from . import views

urlpatterns = [
  path('', views.get_add_posts),
  path('like/<int:post_id>', views.put_like),
  path('<int:post_id>', views.get_put_delete_post),
]