from django.shortcuts import render
from django.http import JsonResponse
#Auth dependencies
from rest_framework.decorators import api_view, permission_classes #for authenticated routes
from rest_framework.permissions import IsAuthenticated #for authenticated routes
from django.views.decorators.csrf import csrf_exempt #for authenticated routes
# API dependencies
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment
from rest_framework import status
import json #Useful for POST and PUT requests
from django.core.exceptions import ObjectDoesNotExist
from django.apps import apps 
Users = apps.get_model('users', 'CustomUser')

# Create your views here.

# GET request to view ALL posts made by all users (Feed)
@api_view(["GET"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_all_posts(request):
    posts = Post.objects.all() # Get all posts
    serializer = PostSerializer(posts, many=True)
    # PROCESSING DATA IN WHICH FRONTEND CAN READ
    data = serializer.data
    for item in data:
        item["added_by"] = Users.objects.get(id=item["added_by"]).username
    return JsonResponse({'books': data }, safe=False, status=status.HTTP_200_OK)
