from rest_framework import serializers
from .models import Post, Comment 

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'body', 'date_added']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, required=False) 
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'body', 'user', 'avatar_url', 'date_added', 'likes', 'comments']

    def get_avatar_url(self, post):
        request = self.context.get('request')
        print(request)
        avatar_url = post.profile.avatar.url
        return request.build_absolute_uri(avatar_url)




# class ProfileSerializer(serializers.ModelSerializer):
#     albums = AlbumSerializer(many=True, required=False) # DONT FORGET THE RELATED NAME IN THE MODELS.PY !! IMPORTANT !!
#     artists = ArtistSerializer(many=True, required=False)
#     tracks = TrackSerializer(many=True, required=False)
#     avatar_url = serializers.SerializerMethodField()

#     class Meta:
#         model = Profile
#         fields = ['id', 'user', 'name', 'avatar_url', 'bio', 'instagram', 'twitter', 'spotify', 'albums', 'artists', 'tracks']

#     def get_avatar_url(self, profile):
#         request = self.context.get('request')
#         print(request)
#         avatar_url = profile.avatar.url
#         return request.build_absolute_uri(avatar_url)
