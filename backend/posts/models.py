from django.db import models
from django.apps import apps 
User = apps.get_model('users', 'CustomUser')

# Create your models here.

class Post(models.Model):
    body = models.TextField()
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    post_date = models.DateTimeField(auto_now_add=True) # adds the date to now 
    likes = models.ManyToManyField(User, related_name='posts') # many likes to many posts field makes numerous relations to SQL server

    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.body[:50] + '...' + str(self.added_by)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s - %s' % (self.post.body[:50], self.added_by)

