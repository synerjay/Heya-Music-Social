from django.urls import include, path
from . import views

urlpatterns = [
  path('', views.welcome),
  path('getbooks', views.get_books),
  path('addbook', views.add_book),
  path('updatebook/<int:book_id>', views.update_book),
  path('deleted/<int:book_id>', views.delete_book)
]