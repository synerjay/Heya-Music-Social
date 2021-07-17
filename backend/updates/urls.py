from django.urls import include, path
from . import views

urlpatterns = [
  path('', views.get_add_updates),
  # path('like/<int:update_id>', views.put_like),
  # path('message/<int:update_id>', views.get_update_message),
  # path('message/<int:update_id>/<int:message_id>', views.delete_message),
  # path('<int:update_id>', views.get_put_delete_update),
]
