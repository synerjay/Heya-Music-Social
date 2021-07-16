from django.db import models
from django.conf import settings
from profiles.models import Profile

# Create your models here.

class Update(models.Model):
    body = models.TextField()
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None, related_name='updates')
    date_added = models.DateTimeField(auto_now_add=True) # adds the date to now 
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='updates', blank=True) # many 

    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.body[:50] + '...' + str(self.added_by)

class Message(models.Model):
    update = models.ForeignKey(Update, on_delete=models.CASCADE, related_name='messages')
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None, related_name='messages')
    body = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s - %s' % (self.body[:50], self.added_by)