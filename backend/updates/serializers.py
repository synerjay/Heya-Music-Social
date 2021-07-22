from rest_framework import serializers
from .models import Update, Message


class MessageSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'added_by', 'avatar_url', 'body', 'date_added']
    
    def get_avatar_url(self, message):
        request = self.context.get('request')
        print(request)
        avatar_url = message.profile.avatar.url
        return request.build_absolute_uri(avatar_url)


class UpdateSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, required=False)
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Update
        fields = ['id', 'added_by', 'avatar_url', 'track_title', 'track_artist', 'track_img', 'body', 'likes', 'messages', 'date_added']
    
    def get_avatar_url(self, update):
        request = self.context.get('request')
        print(request)
        avatar_url = update.profile.avatar.url
        return request.build_absolute_uri(avatar_url)




# track_title = models.CharField(max_length=250, blank=True)
#     track_artist = models.CharField(max_length=200, blank=True)
#     track_img = models.URLField(max_length=200, blank=True)

# class Message(models.Model):
#     update = models.ForeignKey(Update, on_delete=models.CASCADE, related_name='messages')
#     added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None, related_name='messages')
#     body = models.TextField()
#     date_added = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return '%s - %s' % (self.body[:50], self.added_by)


# class Update(models.Model):
#     body = models.TextField()
#     added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None, related_name='updates')
#     date_added = models.DateTimeField(auto_now_add=True) # adds the date to now 
#     likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='updates', blank=True) # many 