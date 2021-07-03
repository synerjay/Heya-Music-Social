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