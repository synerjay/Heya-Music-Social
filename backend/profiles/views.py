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

# // @route GET profile/
# // @desc Get all profiles using
# // @access Public (Not Authentication)
@api_view(["GET"])
@csrf_exempt
@permission_classes([])
def get_all_profiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return JsonResponse({'books': serializer.data }, safe=False, status=status.HTTP_200_OK)

# // @route GET profile/member/:user_id
# // @desc Get profile by user ID using params
# // @access Public (No Authentication)
@api_view(["GET"])
@csrf_exempt
@permission_classes([])
def get_one_profile(request, user_id):
    user = Users.objects.get(id=user_id)
    try: 
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        return JsonResponse({ 'profile': serializer.data}, safe=False, status=status.HTTP_200_OK)
    except Profile.DoesNotExist:
        return JsonResponse({'msg': 'There is no profile found yet.' }, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
            return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# // @router  GET profile/me
# // @desc    Get current users profile
# // @access  Private access with tokens
@api_view(["GET"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_own_profile(request):
    user = request.user
    try:
        profile = Profile.objects.get(user=user.id)
        serializer = ProfileSerializer(profile)
        data = serializer.data
        data["user"] = Users.objects.get(id=user.id).username
        return JsonResponse({'profile': data }, safe=False, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return JsonResponse({'msg': 'There is no profile found.' }, safe=False, status=status.HTTP_404_NOT_FOUND)

# // @router  POST profile/
# // @desc    Create or update user profile
# // @access  Private access with tokens
@api_view(["POST"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def create_profile(request):
    payload = json.loads(request.body)
    user = Users.objects.get(id=request.user.id) # make an instance of the User when creating a profile (Ugh...)
    try:
        profile_item = Profile.objects.filter(user=user) #profile.update() will not work with .get() method!! Only .filter()!!
        profile_item.update(**payload)
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        data = serializer.data
        data["user"] = Users.objects.get(id=user.id).username
        return JsonResponse({'post': data}, safe=False, status=status.HTTP_200_OK)
    except Profile.DoesNotExist:
        profile = Profile.objects.create(user=user, bio=payload["bio"]) # add more fields in the future
        serializer = ProfileSerializer(profile)
        data = serializer.data
        data["user"] = Users.objects.get(id=user.id).username
        return JsonResponse({'post': data}, safe=False, status=status.HTTP_201_CREATED)

# // @route DELETE profile
# // @desc Delete profile, user & posts
# // @access Private