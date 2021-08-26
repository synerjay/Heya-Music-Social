from rest_framework import serializers
from .models import Update, Message


class MessageSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(read_only=True, source="profile.avatar")

    class Meta:
        model = Message
        fields = ['id', 'avatar', 'added_by', 'body', 'date_added']
    


class UpdateSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, required=False)
    avatar = serializers.ImageField(read_only=True, source="profile.avatar")

    class Meta:
        model = Update
        fields = ['id', 'avatar', 'added_by', 'track_title', 'track_artist', 'track_img', 'body', 'likes', 'messages', 'date_added']
    


