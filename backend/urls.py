"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
#Image Upload Capability Dependencies
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
    path('updates/', include('updates.urls')),
    path('profile/', include('profiles.urls')),
    path('test/', include('api.urls')), # point to the URL test/
    re_path(r'^robots\.txt$', TemplateView.as_view(template_name="robots.txt", content_type='text/plain')),
    re_path(r'^manifest\.json$', TemplateView.as_view(template_name="manifest.json", content_type='application/json')),
    re_path('.*', TemplateView.as_view(template_name='index.html', content_type='text/html'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
