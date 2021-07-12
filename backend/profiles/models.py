from django.db import models
from django.conf import settings # you can use this for models instead of CustomUser
# assign User model as settings.AUTH_USER_MODEL

def upload_path(instance, filename):
      return '/'.join(['avatars', str(instance.user.username), filename])

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE, related_name='profile') # null = True means that the CustomUser doesnt need to have a Profile model
    name = models.CharField(max_length=150, blank=True, null=True)
    avatar = models.ImageField(blank=True, null=True, upload_to=upload_path)
    bio = models.TextField()
    instagram = models.CharField(max_length=100, blank=True, null=True)
    twitter = models.CharField(max_length=100, blank=True, null=True)
    spotify = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return str(self.user)

# difference between ForeignKey and OneToOne field is that Foreign key is many-to-one relationships like Comment-Post
  #OneToOneField will return to ONLY one instance of QuerySet like Profile-RegisteredUser

class Album(models.Model):
    profile = models.ForeignKey(Profile, null=True, on_delete=models.CASCADE, related_name='album')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='album') 
    title = models.CharField(max_length=200, blank=True)
    artist = models.CharField(max_length=200, blank=True)
    img = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return '%s likes %s' % (self.user, self.title)

class Artist(models.Model):
    profile = models.ForeignKey(Profile, null=True, on_delete=models.CASCADE, related_name='artists')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='artists') 
    name = models.CharField(max_length=200, blank=True)
    img = models.URLField(max_length=200, blank=True)
    # might add ImageField

    def __str__(self):
        return '%s likes %s' % (self.user, self.name)

class Track(models.Model):
    profile = models.ForeignKey(Profile, null=True, on_delete=models.CASCADE, related_name='tracks')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tracks') 
    title = models.CharField(max_length=250, blank=True)
    artist = models.CharField(max_length=200, blank=True)
    img = models.URLField(max_length=200, blank=True)

    # might add ImageField

    def __str__(self):
        return '%s likes %s' % (self.user, self.title)

