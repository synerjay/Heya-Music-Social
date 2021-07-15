from rest_framework import serializers
from .models import Post, Comment 

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'body', 'date_added']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, required=False) 

    class Meta:
        model = Post
        fields = ['id', 'body', 'user', 'date_added', 'likes', 'comments']


