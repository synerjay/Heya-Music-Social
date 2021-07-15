from rest_framework import serializers
from .models import Post, Comment 

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'added_by', 'body', 'date_added']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, required=False) 

    class Meta:
        model = Post
        fields = ['id', 'body', 'added_by', 'date_added', 'likes', 'comments']


