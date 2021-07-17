from django.shortcuts import render
from django.http import JsonResponse
#Auth dependencies
from rest_framework.decorators import api_view, permission_classes #for authenticated routes
from rest_framework.permissions import IsAuthenticated #for authenticated routes
from django.views.decorators.csrf import csrf_exempt #for authenticated routes
# API dependencies
from .serializers import UpdateSerializer, MessageSerializer
from .models import Update, Message
from rest_framework import status
import json #Useful for POST and PUT requests
from django.core.exceptions import ObjectDoesNotExist
from django.apps import apps 
Users = apps.get_model('users', 'CustomUser')
Profile = apps.get_model('profiles', 'Profile')


# Create your views here.
# // @router  GET, POST /posts 
# // @desc    Get all posts, Create a post
# // @access  Private
@api_view(["GET", "POST"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_add_updates(request):
    # if request.method == 'GET':
    #     posts = Post.objects.all() # Get all posts
    #     serializer = PostSerializer(posts, many=True)
    #     # PROCESSING DATA IN WHICH FRONTEND CAN READ # try to make the post seralizer output the avatar url s
    #     data = serializer.data
    #     for item in data:
    #         item["added_by"] = Users.objects.get(id=item["added_by"]).username
    #     return JsonResponse({'posts': data }, safe=False, status=status.HTTP_200_OK)
    # else:
    payload = json.loads(request.body)
    member = Users.objects.get(id=request.user.id)
        # try:
    profile = Profile.objects.get(user=request.user.id)
    update = Update.objects.create(body=payload["body"], added_by=member, profile=profile)
    serializer = UpdateSerializer(update, context={"request": request})
    data = serializer.data
    data["added_by"] = member.username 
    return JsonResponse({'post': data}, safe=False, status=status.HTTP_201_CREATED)
        # except ObjectDoesNotExist as e:
        #     return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
        # except Exception:
        #     return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
