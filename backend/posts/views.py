from django.shortcuts import render, get_object_or_404
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

# // @router  GET, POST /posts 
# // @desc    Get all posts, Create a post
# // @access  Private
@api_view(["GET", "POST"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_add_posts(request):
    if request.method == 'GET':
        posts = Post.objects.all() # Get all posts
        serializer = PostSerializer(posts, many=True)
        # PROCESSING DATA IN WHICH FRONTEND CAN READ
        data = serializer.data
        for item in data:
            item["added_by"] = Users.objects.get(id=item["added_by"]).username
        return JsonResponse({'posts': data }, safe=False, status=status.HTTP_200_OK)
    else:
        payload = json.loads(request.body)
        user = request.user
        try:
            post = Post.objects.create(body=payload["body"], added_by=user)
            serializer = PostSerializer(post)
            data = serializer.data
            data["added_by"] = user.username 
            return JsonResponse({'post': data}, safe=False, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist as e:
            return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# // @router  GET one post, PUT, DELETE /posts/:id
# // @desc    Get one post by ID, Update Post, Delete Post
# // @access  Private
@api_view(["GET", "DELETE", "PUT"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_put_delete_post(request, post_id):
    if request.method == 'GET':
        try:
            user = request.user
            post = Post.objects.get(id=post_id)
            serializer = PostSerializer(post)
            data = serializer.data
            data["added_by"] = Users.objects.get(id=data["added_by"]).username
            return JsonResponse({'posts': data }, safe=False, status=status.HTTP_200_OK)
        except ObjectDoesNotExist as e:
            return JsonResponse({'error': "Sorry, this post doesn't exist. "}, safe=False, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'DELETE':
        try:
            user = request.user.id
            post = Post.objects.get(added_by=user, id=post_id)
            post.delete()
            return JsonResponse({'Success': 'Post deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist as e:
            return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# // @router  PUT /posts/like/:id
# // @desc    Like and Unlike a post
# // @access  Private
@api_view(["PUT"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def put_like(request, post_id):
    user = request.user
    post = get_object_or_404(Post, id=post_id)
    if post.likes.filter(id=request.user.id).exists(): # user already exists in the like list
        post.likes.remove(user)
    else:
        post.likes.add(user) # add the like to the like array in the post object
    total_likes = post.total_likes()
    serializer = PostSerializer(post)
    data = serializer.data
    data["added_by"] = user.username 
    print(data["likes"])
    like_list = data["likes"]
    for i, item in enumerate(like_list):
        like_list[i] = Users.objects.get(id=item).username # always put the username!!
    return JsonResponse({'likes': like_list, 'total_likes': total_likes }, safe=False, status=status.HTTP_200_OK)
    # Might change above for changes in the frontend REACT later

# // @router  GET and POST comments /posts/comment/:post_id
# // @desc    Get a list of Comments and Comment on a post
# // @access  Private
@api_view(["GET", "POST"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_post_comment(request, post_id):
    if request.method == 'GET':
        # comments = Comment.objects.filter(post=post_id) # objects with one or more queries, it needs to be a FILTER and not a GET method
        post = Post.objects.get(id=post_id)
        # serializer = CommentSerializer(comments, many=True)
        # serializer = CommentSerializer(post.comments.get(id=1))
        serializer = CommentSerializer(post.comments.all(), many=True) # you can just use post.comments.all() get to all comments from that particular post
        # PROCESSING DATA IN WHICH FRONTEND CAN READ
        data = serializer.data
        for item in data:
            item["added_by"] = Users.objects.get(id=item["added_by"]).username
        return JsonResponse({'comments': data }, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        payload = json.loads(request.body)
        user = Users.objects.get(id=request.user.id)
        post = Post.objects.get(id=post_id)
        try:
            # In the Comment object, for some weird effin reason Django needs to get the specific INSTANCE of the object NOT the Key like the Post object. WEIRDO DJANGO UGH
            Comment.objects.create(post=post, added_by=user, body=payload["body"])
            comments = Comment.objects.filter(post=post_id)
            serializer = CommentSerializer(comments, many=True)
            data = serializer.data
            for item in data:
               item["added_by"] = Users.objects.get(id=item["added_by"]).username
            return JsonResponse({'comment': data}, safe=False, status=status.HTTP_201_CREATED)
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
def delete_comment(request, post_id, comment_id):
    post = Post.objects.get(id=post_id)
    comment = post.comments.get(id=comment_id)
    comment.delete()
    serializer = CommentSerializer(post.comments.all(), many=True)
    data = serializer.data
    for item in data:
               item["added_by"] = Users.objects.get(id=item["added_by"]).username
    return JsonResponse({'message': 'Comment deleted successfully', 'comment': data}, safe=False, status=status.HTTP_201_CREATED)

