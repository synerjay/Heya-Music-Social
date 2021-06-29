from django.db import models
from django.apps import apps 
User = apps.get_model('users', 'CustomUser')

# Create your models here.

class Post(models.Model):
    body = models.TextField()
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    post_date = models.DateTimeField(auto_now_add=True) # adds the date to now 
    likes = models.ManyToManyField(User, related_name='posts') # many likes to many posts

    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.body[:50] + '...' + str(self.added_by)

class Comments(models.Model):
    pass

