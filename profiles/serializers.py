from rest_framework import serializers
from .models import Profile, Album, Artist, Track
from updates.serializers import UpdateSerializer

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['spot_id', 'name', 'img']

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['spot_id', 'title', 'artist', 'img']

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['spot_id', 'title', 'artist', 'img']

class ProfileSerializer(serializers.ModelSerializer):
    albums = AlbumSerializer(many=True, required=False) # DONT FORGET THE RELATED NAME IN THE MODELS.PY !! IMPORTANT !!
    artists = ArtistSerializer(many=True, required=False)
    tracks = TrackSerializer(many=True, required=False)
    updates = UpdateSerializer(many=True, required=False)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'name', 'avatar', 'bio', 'genre', 'instagram', 'twitter', 'spotify', 'albums', 'artists', 'tracks', 'updates']

