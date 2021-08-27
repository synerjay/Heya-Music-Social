from django.urls import include, path

urlpatterns = [
path('auth/', include('rest_auth.urls')),    
path('auth/register/', include('rest_auth.registration.urls'))
]


# Next, we'll add the URLs from the rest_auth package to the project's urls.py file. This gives us access to a host of auth functionalities.

  # User Registration - http://127.0.0.1:8000/api/v1/users/auth/registration/
  # User Login - http://127.0.0.1:8000/api/v1/users/auth/login/
  # User Logout - http://127.0.0.1:8000/api/v1/users/auth/logout/
  # User Details - http://127.0.0.1:8000/api/v1/users/auth/user/
  # Change Password - http://127.0.0.1:8000/api/v1/users/auth/password/change/ // post request with fields "new_password1" and "new_password2"
  # Password Reset - http://127.0.0.1:8000/api/v1/users/auth/password/reset/ // post request which provide the email to request password reset
  # Confirm Password Reset - http://127.0.0.1:8000/api/v1/users/auth/password/reset/confirm/