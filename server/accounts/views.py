from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import serializers, status
from rest_framework import authentication
from rest_framework import permissions
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer,UserInfoSerializer
from movie.models import Genre
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    print(request.data)
    password = request.data.get('password')
    pw_confirmation = request.data.get('pwConfirmation')

    if password != pw_confirmation :
        return Response({'error' : '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    
    elif not password  :
        return Response({'error' : '비밀번호를 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)

    elif User.objects.filter(nickname=request.data.get('nickname')).exists():
        return Response({'error' : '이미 존재하는 닉네임입니다.'}, status=status.HTTP_403_FORBIDDEN)
    
    elif User.objects.filter(username=request.data.get('username')).exists():
        return Response({'error': '이미 존재하는 아이디입니다.'}, status=status.HTTP_403_FORBIDDEN)

    elif User.objects.filter(username=request.data.get('username')).exists():
        return Response({'error': '이미 존재하는 아이디입니다.'}, status=status.HTTP_403_FORBIDDEN)
    
    elif not request.data.get('genres_name') :
        return Response({'error': '좋아하는 영화장르를 선택해주세요.'}, status=status.HTTP_403_FORBIDDEN)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user=serializer.save()
        #비밀번호 해싱
        user.set_password(request.data.get('password'))
        user.save()
        # 좋아하는 장르
        created_user = User.objects.get(username=request.data.get("username"))
        # postman에서는 리스트로 값을 못넣어줌
        for genre_name in request.data.get("genres_name"):
            genre = Genre.objects.get(genre_name=genre_name)
            created_user.like_genres.add(genre)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({'error': '문자+숫자로 아이디를 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)

# 나의 유저정보 보내주는것..함수명 바꿔야함........
@api_view(['GET'])
def login(request):
    user = get_object_or_404(User, username=request.GET.get('username'))
    serializer= UserInfoSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def otherProfile(request, user_pk):
    user = get_object_or_404(User, pk=user_pk)
    serializer= UserInfoSerializer(user)
    return Response(serializer.data)

# 프로필사진 수정
@api_view(['POST'])
def editProfileImage(request,user_pk):
    user = get_object_or_404(User, pk=user_pk)
    user.profile_path = request.FILES.get('file')
    if request.user.id==user_pk :
        user.save()
        return Response(status=status.HTTP_201_CREATED)

#팔로우기능
@api_view(['POST'])
def follow(request, user_pk):
    you = get_object_or_404(User, pk=user_pk)
    me = get_object_or_404(User, pk=request.user.id) 
    if me != you :
        if you.followers.filter(pk=me.pk).exists():
            you.followers.remove(me)
        else :
            you.followers.add(me)   
        return Response(status=status.HTTP_201_CREATED)