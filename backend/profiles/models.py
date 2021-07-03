from django.db import models
from django.conf import settings # you can use this for models instead of CustomUser
# assign User model as settings.AUTH_USER_MODEL

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE) 
    bio = models.TextField()

    def __str__(self):
        return str(self.user)

# difference between ForeignKey and OneToOne field is that Foreign key is many-to-one relationships like Comment-Post
  #OneToOneField will return to ONLY one instance of QuerySet like Profile-RegisteredUser
