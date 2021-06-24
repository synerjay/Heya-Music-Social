from rest_framework.serializers import ModelSerializer
from rest_auth.serializers import TokenSerializer
from .models import CustomUser

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'last_login', 'date_joined', 'is_staff')

class CustomTokenSerializer(TokenSerializer):
    user = UserSerializer(read_only=True)

    class Meta(TokenSerializer.Meta):
        fields = ('key', 'user')


# In the settings.py
# REST_AUTH_SERIALIZERS = {
#     'TOKEN_SERIALIZER': 'path.to.custom.CustomTokenSerializer',

# }