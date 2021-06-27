from django.db import models
from django.conf import settings
from django.utils import timezone


# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=200)
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=300)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books') #Book model needs an Author
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


# The related_name attribute allows us to name the attribute that we use for the relation from the related object back to this one.
# After defining this, we can retrieve the post of a comment object using comment.post and retrieve all comments of a post using post.comments.all() .