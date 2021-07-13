from rest_framework import serializers
from .models import Profile, Album, Artist, Track

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name', 'img']

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['id', 'title', 'artist', 'img']

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'title', 'artist', 'img']

class ProfileSerializer(serializers.ModelSerializer):
    # albums = AlbumSerializer(many=True, required=False)
    albums= AlbumSerializer(many=True, required=False)
    artists = ArtistSerializer(many=True, required=False)
    tracks = TrackSerializer(many=True, required=False)
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'name', 'avatar_url', 'bio', 'instagram', 'twitter', 'spotify', 'albums', 'artists', 'tracks']

    def get_avatar_url(self, profile):
        request = self.context.get('request')
        print(request)
        avatar_url = profile.avatar.url
        return request.build_absolute_uri(avatar_url)
