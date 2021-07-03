from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
#Auth dependencies
from rest_framework.decorators import api_view, permission_classes #for authenticated routes
from rest_framework.permissions import IsAuthenticated #for authenticated routes
from django.views.decorators.csrf import csrf_exempt #for authenticated routes
# API dependencies
from .serializers import ProfileSerializer
from .models import Profile
from rest_framework import status
import json #Useful for POST and PUT requests
from django.core.exceptions import ObjectDoesNotExist
from django.apps import apps 
Users = apps.get_model('users', 'CustomUser')


# Create your views here.

# // @router  GET api/profile/me
# // @desc    Get current users profile
# // @access  Private access with tokens
@api_view(["GET"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_own_profile(request):
    user = request.user
    profile = Profile.objects.get(id=user.id)
    if profile == None:
        return JsonResponse({'msg': 'There is no profile found.' }, safe=False, status=status.HTTP_404_NOT_FOUND)
    else:
        serializer = ProfileSerializer(profile)
        return JsonResponse({'profile': serializer.data }, safe=False, status=status.HTTP_200_OK)


# // @router  POST api/profile
# // @desc    Create or update user profile
# // @access  Private access with tokens


# // @route GET api/profile
# // @desc Get all profiles using find() method by mongoose
# // @access Public (no auth middleware)

# // @route GET api/profile/user/:user_id
# // @desc Get profile by user ID using params
# // @access Public (no auth middleware)

# // @route DELETE api/profile
# // @desc Delete profile, user & posts
# // @access Private