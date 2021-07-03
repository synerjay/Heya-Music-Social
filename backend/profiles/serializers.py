from rest_framework import serializers
from .models import Profile

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'bio']