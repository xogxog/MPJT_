from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework import authentication
from rest_framework import permissions
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from movie.models import Genre

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    print(request.data)
    password = request.data.get('password')
    pw_confirmation = request.data.get('pwConfirmation')

    if password != pw_confirmation :
        return Response({'error' : '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    
    elif User.objects.filter(nickname=request.data.get('nickname')).exists():
        return Response({'error': '이미 존재하는 닉네임입니다.'}, status=status.HTTP_403_FORBIDDEN)
    
    # elif request.data.get('profile_path') == '':
    #     return Response({'error': '프로필사진을 지정해주세요'}, status=status.HTTP_403_FORBIDDEN)

    elif request.data.get('genres_name') == None :
        return Response({'error': '좋아하는 영화장르를 선택해주세요.'}, status=status.HTTP_403_FORBIDDEN)
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
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

# def profile(request, user_pk):
#     profile = get_object_or_404()