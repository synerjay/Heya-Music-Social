from django.urls import include, path

urlpatterns = [
path('auth/', include('rest_auth.urls')),    
path('auth/register/', include('rest_auth.registration.urls'))
]


# Next, we'll add the URLs from the rest_auth package to the project's urls.py file. This gives us access to a host of auth functionalities.

  # User Registration - registration/
  # User Login - login/
  # User Logout - logout/
  # User Details - user/
  # Change Password - password/change/
  # Password Reset - password/reset/
  # Confirm Password Reset - password/reset/confirm/