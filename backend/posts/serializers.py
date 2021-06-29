from rest_framework import serializers
from .models import Post, Comment 

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'body', 'added_by', 'date_added', 'likes']

# Needs to be edited !!
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'title', 'description', 'created_date', 'author', 'added_by']