from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
#Auth dependencies
from rest_framework.decorators import api_view, permission_classes #for authenticated routes
from rest_framework.permissions import IsAuthenticated #for authenticated routes
from django.views.decorators.csrf import csrf_exempt #for authenticated routes
# API dependencies
from .serializers import ProfileSerializer, GenreSerializer, ArtistsSerializer, TracksSerializer
from .models import Profile, Genre, Artists, Tracks
from rest_framework import status
import json #Useful for POST and PUT requests
from django.core.exceptions import ObjectDoesNotExist
from django.apps import apps 
Users = apps.get_model('users', 'CustomUser')


# Create your views here.

# // @route GET profile/members
# // @desc Get all profiles using
# // @access Public (No Authentication)
@api_view(["GET"])
@csrf_exempt
@permission_classes([])
def get_all_profiles(request):
    profiles = Profile.objects.all()
    print("The request is below")
    print(request)
    print(request.user.id)
    serializer = ProfileSerializer(profiles, context={"request": request}, many=True)
    return JsonResponse({'profiles': serializer.data }, safe=False, status=status.HTTP_200_OK)

# // @route GET profile/member/<int:user_id>
# // @desc Get profile by user ID using params
# // @access Public (No Authentication)
@api_view(["GET"])
@csrf_exempt
@permission_classes([])
def get_one_profile(request, user_id):
    user = Users.objects.get(id=user_id)
    try: 
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile, context={"request": request})
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
        serializer = ProfileSerializer(profile, context={"request": request})
        data = serializer.data
        data["user"] = Users.objects.get(id=user.id).username
        return JsonResponse({'profile': data }, safe=False, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return JsonResponse({'msg': 'There is no profile found.' }, safe=False, status=status.HTTP_404_NOT_FOUND)

# // @router  POST or DELETE profile/ (Indirectly also PUT method through POST method)
# // @desc    Create profile or update user profile if it already exists / Delete user account and profile
# // @access  Private access with tokens
@api_view(["POST", "DELETE"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def create_delete_profile(request):
    user = Users.objects.get(id=request.user.id) # make an instance of the User when creating a profile (Ugh...)
    print(request.user)
    print("This worked")
    print(request.data) # REQUEST DATA is already an OBJECT so no need to put it on JSON.LOADS
    #request.data also seem to parse multipart/form-data
    if request.method == 'POST':
      # payload = json.loads(request.data) json.loads are not needed for request.data!!! Only for request.body
      #json.loads take a string as input and returns a dictionary as output.
      # json.dumps take a dictionary as input and returns a string as output.
        try:
            #profile.update() will not work with .get() method!! Only .filter()!!
            # profile_item.update(bio=request.data["bio"], avatar=request.data["avatar"])
            profile = Profile.objects.get(user=user)
            profile.bio = request.data["bio"]
            profile.avatar = request.data["avatar"]
            # Later need to be added Make sure to add below fields on frontend or Django will send an error!!!
            profile.name = request.data["name"]
            profile.instagram = request.data["instagram"]
            profile.spotify = request.data["spotify"]
            profile.twitter = request.data["twitter"]
            profile.save()    
            # profile = Profile.objects.get(user=user)
            serializer = ProfileSerializer(profile, context={"request": request})
            data = serializer.data
            data["user"] = user.username
            return JsonResponse({'profile': data}, safe=False, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
              profile = Profile.objects.create(user=user, bio=request.data["bio"], avatar = request.data["avatar"]) # add more fields in the future
              serializer = ProfileSerializer(profile)
              data = serializer.data
              data["user"] = user.username
              return JsonResponse({'profile': data}, safe=False, status=status.HTTP_201_CREATED)
        except Exception:
                  return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'DELETE':
        user.delete()
        return JsonResponse({'Success': 'User account deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# // @route PUT /profile/genre
# // @desc Add profile genre
# // @access Private
@api_view(["PUT"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def add_genre(request):
    payload = json.loads(request.body)
    user = Users.objects.get(id=request.user.id)
    try:
        profile = Profile.objects.get(user=user)
        Genre.objects.create(profile=profile, user=user, genre=payload["genre"])
        serializer = ProfileSerializer(profile)
        data = serializer.data
        data["user"] = user.username
        return JsonResponse({'profile': data}, safe=False, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist:
        return JsonResponse({'msg': 'There is no profile found.' }, safe=False, status=status.HTTP_404_NOT_FOUND)

# // @route DELETE /profile/genre/<int:gen_id>
# // @desc Delete genre from profile
# // @access Private
@api_view(["DELETE"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def delete_genre(request, gen_id):
    user = Users.objects.get(id=request.user.id)
    try:
        genre = Genre.objects.get(id=gen_id, user=user)
        genre.delete()
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        data = serializer.data
        data["user"] = user.username
        return JsonResponse({'profile': data}, safe=False, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist:
        return JsonResponse({'msg': 'There is no genre found.' }, safe=False, status=status.HTTP_404_NOT_FOUND)

# // @route PUT /profile/artist
# // @desc Add profile favorite artists
# // @access Private
@api_view(["PUT"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def add_artist(request):
    payload = json.loads(request.body)
    user = Users.objects.get(id=request.user.id)
    try:
        profile = Profile.objects.get(user=user)
        Artists.objects.create(profile=profile, user=user, artist=payload["artist"])
        serializer = ProfileSerializer(profile)
        data = serializer.data
        data["user"] = user.username
        return JsonResponse({'profile': data}, safe=False, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist:
        return JsonResponse({'msg': 'There is no profile found.' }, safe=False, status=status.HTTP_404_NOT_FOUND)

# // @route DELETE /profile/artist/<int:art_id>
# // @desc Delete artists from profile
# // @access Private
@api_view(["DELETE"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def delete_artist(request, art_id):
    user = Users.objects.get(id=request.user.id)
    try:
        artist = Artists.objects.get(id=art_id, user=user)
        artist.delete()
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        data = serializer.data
        data["user"] = user.username
        return JsonResponse({'profile': data}, safe=False, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist:
        return JsonResponse({'msg': 'There is no artist found.' }, safe=False, status=status.HTTP_404_NOT_FOUND)



# // @route PUT /profile/track
# // @desc Add profile favorite tracks
# // @access Private
@api_view(["PUT"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def add_track(request):
    payload = json.loads(request.body)
    user = Users.objects.get(id=request.user.id)
    try:
        profile = Profile.objects.get(user=user)
        Tracks.objects.create(profile=profile, user=user, track=payload["track"])
        serializer = ProfileSerializer(profile)
        data = serializer.data
        data["user"] = user.username
        return JsonResponse({'profile': data}, safe=False, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist:
        return JsonResponse({'msg': 'There is no profile found.' }, safe=False, status=status.HTTP_404_NOT_FOUND)

# // @route DELETE /profile/track/<int:track_id>
# // @desc Delete tracks from profile
# // @access Private

@api_view(["DELETE"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def delete_track(request, track_id):
    user = Users.objects.get(id=request.user.id)
    try:
        track = Tracks.objects.get(id=track_id, user=user)
        track.delete()
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        data = serializer.data
        data["user"] = user.username
        return JsonResponse({'profile': data}, safe=False, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist:
        return JsonResponse({'msg': 'There is no track found.' }, safe=False, status=status.HTTP_404_NOT_FOUND)