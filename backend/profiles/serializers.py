from rest_framework import serializers
from .models import Profile, Genre, Artists, Tracks

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'profile', 'user', 'genre']

class ArtistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = ['id', 'profile', 'user', 'artist']

class TracksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracks
        fields = ['id', 'profile', 'user', 'track']

class ProfileSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(many=True, required=False)
    artists = ArtistsSerializer(many=True, required=False)
    tracks = TracksSerializer(many=True, required=False)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'name', 'bio', 'instagram', 'twitter', 'spotify', 'genre', 'artists', 'tracks']