from rest_framework import serializers
from .models import Update, Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'added_by', 'body']


class UpdateSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, required=False)

    class Meta:
        model = Update
        fields = ['id', 'added_by', 'body', 'likes', 'messages']


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