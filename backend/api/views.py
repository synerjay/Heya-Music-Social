from django.shortcuts import render
from django.http import JsonResponse
#Auth dependencies
from rest_framework.decorators import api_view, permission_classes #for authenticated routes
from rest_framework.permissions import IsAuthenticated #for authenticated routes
from django.views.decorators.csrf import csrf_exempt #for authenticated routes
# API dependencies
from .serializers import BookSerializer
from .models import Book, Author
from rest_framework import status
import json
from django.core.exceptions import ObjectDoesNotExist
# We must add the User object from the user app for the "added_by" field to work!!
from django.apps import apps 
Users = apps.get_model('users', 'CustomUser')


# Create your views here.
@api_view(["GET"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def welcome(request):
    content = {"message": "Welcome to the Heya Music App!"}
    return JsonResponse(content)

# Users can get ALL Books added by ALL users
@api_view(["GET"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def get_books(request):
    user = request.user.id # dont need a Users model since we are only searching
    # books = Book.objects.filter(added_by=user) # get all books added by this particular user
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    print(serializer.data)
    # PROCESSING DATA IN WHICH FRONTEND CAN READ
    data = serializer.data
    for item in data:
        item["author"] = Author.objects.get(id=item["author"]).name
        item["added_by"] = Users.objects.get(id=item["added_by"]).username
    return JsonResponse({'books': data }, safe=False, status=status.HTTP_200_OK)

# Users can add a book
@api_view(["POST"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def add_book(request):
    payload = json.loads(request.body)
    user = request.user
    # user = Users.objects.get(id=request.user.id) #the user MUST come from the Object or else it will get an ERROR!!!
    # print(user.username)
    # print(payload)
    try:
        author = Author.objects.get(name=payload["author"])
        book = Book.objects.create(
            title=payload["title"],
            description=payload["description"],
            added_by=user,
            author=author
        )
        serializer = BookSerializer(book)
        # PROCESS SERIALIZER
        data = serializer.data
        data["added_by"] = user.username # change to a field that humans can READ not SQL key data!
        data["author"] = payload["author"] # change to a field that humans can READ not SQL key data!
        print(data)
        return JsonResponse({'books': data}, safe=False, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Users can update a book entry by id # USERS who created it can change the book!
@api_view(["PUT"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def update_book(request, book_id):
    user = request.user.id
    payload = json.loads(request.body)
    #PROCESS PAYLOAD TO SQL KEYS
    process_data = payload
    process_data["author"] = Author.objects.get(name=payload["author"]).id # Database can only read SQL keys so we need to change it to IDs
    try:
        book_item = Book.objects.filter(added_by=user, id=book_id)
        # returns 1 or 0
        book_item.update(**process_data)
        book = Book.objects.get(id=book_id)
        serializer = BookSerializer(book)
        
        return JsonResponse({'book': serializer.data}, safe=False, status=status.HTTP_200_OK)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Users can delete a book entry by id
@api_view(["DELETE"])
@csrf_exempt
@permission_classes([IsAuthenticated])
def delete_book(request, book_id):
    user = request.user.id
    try:
        book = Book.objects.get(added_by=user, id=book_id)
        book.delete()
        return JsonResponse({'Success': 'Book deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

