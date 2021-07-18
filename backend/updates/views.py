from django.shortcuts import render, get_object_or_404
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
# // @router  GET, POST /updates
# // @desc    Get all posts, Create a post
# // @access  Private
@api_view(["GET", "POST"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_add_updates(request):
    if request.method == 'GET':
        updates = Update.objects.all() # Get all posts
        serializer = UpdateSerializer(updates, many=True, context={"request": request})
        # PROCESSING DATA IN WHICH FRONTEND CAN READ # try to make the post seralizer output the avatar url s
        data = serializer.data
        for item in data:
            item["added_by"] = Users.objects.get(id=item["added_by"]).username
            if len(item["likes"]) != 0:
                for i, like in enumerate(item["likes"]):
                    item["likes"][i] = Users.objects.get(id=like).username
            if len(item["messages"]) != 0:
                for message in item["messages"]:
                    message["added_by"] = Users.objects.get(id=message["added_by"]).username
        return JsonResponse({ 'posts': data }, safe=False, status=status.HTTP_200_OK)
    else:
        payload = json.loads(request.body)
        member = Users.objects.get(id=request.user.id)
        try:
              profile = Profile.objects.get(user=request.user.id)
              update = Update.objects.create(body=payload["body"], added_by=member, profile=profile)
              serializer = UpdateSerializer(update, context={"request": request})
              data = serializer.data
              data["added_by"] = member.username 
              return JsonResponse({'post': data}, safe=False, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist as e:
            return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# // @router  GET one post, PUT, DELETE /updates/:id
# // @desc    Get one post by ID, Update Post, Delete Post
# // @access  Private
@api_view(["GET", "DELETE", "PUT"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_put_delete_update(request, update_id):
    if request.method == 'GET':
        try:
            # user = request.user
            update = Update.objects.get(id=update_id)
            serializer = UpdateSerializer(update, context={"request": request})
            data = serializer.data
            data["added_by"] = Users.objects.get(id=data["added_by"]).username
            for i, like in enumerate(data["likes"]):
                    data["likes"][i] = Users.objects.get(id=like).username
            for message in data["messages"]:
                    message["added_by"] = Users.objects.get(id=message["added_by"]).username
            return JsonResponse({'posts': data }, safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist as e:
            return JsonResponse({'error': "Sorry, this post doesn't exist. "}, safe=False, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'DELETE':
        try:
            user = request.user.id
            update = Update.objects.get(user=user, id=update_id)
            update.delete()
            return JsonResponse({'Success': 'Post deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist as e:
            return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# // @router  PUT /updates/like/:update_id
# // @desc    Like and Unlike a post
# // @access  Private
@api_view(["PUT"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def put_like(request, update_id):
    user = request.user
    update = get_object_or_404(Update, id=update_id)
    if update.likes.filter(id=request.user.id).exists(): # user already exists in the like list
        update.likes.remove(user)
    else:
        update.likes.add(user) # add the like to the like array in the update object
    serializer = UpdateSerializer(update, context={"request": request})
    data = serializer.data
    data["added_by"] = Users.objects.get(id=data["added_by"]).username
    data["total_likes"] = update.total_likes()
    print(data["likes"])
    # like_list = data["likes"]
    for i, item in enumerate(data["likes"]):
        data["likes"][i] = Users.objects.get(id=item).username # always put the username!!
    for item in data["messages"]:
        item["added_by"] = Users.objects.get(id=item["added_by"]).username
    return JsonResponse({'post': data }, safe=False, status=status.HTTP_200_OK)
    # Might change above for changes in the frontend REACT later

# // @router  POST messages on an update  /updates/message/<int:update_id>
# // @desc    POST messages on an update
# // @access  Private
@api_view(["GET", "POST"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def create_message(request, update_id):
    payload = json.loads(request.body)
    user = Users.objects.get(id=request.user.id)
    update = Update.objects.get(id=update_id)
    try:
        # In the Comment object, for some weird effin reason Django needs to get the specific INSTANCE of the object NOT the Key like the update object. WEIRDO DJANGO UGH
        profile = Profile.objects.get(user=user.id)
        Message.objects.create(update=update, added_by=user, body=payload["body"], profile=profile)
        serializer = UpdateSerializer(update, context={"request": request})
        data = serializer.data
        for item in data["messages"]:
            item["added_by"] = Users.objects.get(id=item["added_by"]).username
        return JsonResponse({'post': data}, safe=False, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# // @router  DELETE /posts/comment/<int:post_id>/<int:comment_id>
# // @desc    Delete a comment on a post
# // @access  Private
@api_view(["DELETE"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def delete_message(request, update_id, message_id):
    user = request.user
    update = Update.objects.get(id=update_id)
    try:
        message = update.messages.get(id=message_id, added_by=user)
        message.delete()
        serializer = UpdateSerializer(update, context={"request": request})
        data = serializer.data
        data["added_by"] = Users.objects.get(id=data["added_by"]).username
        for i, like in enumerate(data["likes"]):
            data["likes"][i] = Users.objects.get(id=like).username
        for message in data["messages"]:
            message["added_by"] = Users.objects.get(id=message["added_by"]).username
        return JsonResponse({'Success': 'message deleted successfully', 'post': data}, safe=False, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
