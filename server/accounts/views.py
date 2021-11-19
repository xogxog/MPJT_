from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework import authentication
from rest_framework import permissions
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    password = request.data.get('password')
    pw_confirmation = request.get('pwConfirmation')

    if password != pw_confirmation :
        return Response({'error' : '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    
    elif User.objects.filter(nickname=request.data.get('nickname')).exists():
        return Response({'error': '이미 존재하는 닉네임입니다.'}, status=status.HTTP_403_FORBIDDEN)
    
    elif request.data.get('profile_path') == '':
        return Response({'error': '프로필사진을 지정해주세요'}, status=status.HTTP_403_FORBIDDEN)

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        user=serializer.save()
        #비밀번호 해싱
        user.get_password(request.data.get('password'))
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# def profile(request, user_pk):
#     profile = get_object_or_404()