from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    # followers = serializers.

    class Meta : 
        model = User
        fields = ('username', 'nickname','password','profile_path')
        read_only_field=('followings') 

class UserInfoSerializer(serializers.ModelSerializer):
    # 프로필 조회하면 user가 좋아하는 영화리스트 보내야함.
    class Meta :
        model = User
        fields = ('id','username','nickname','profile_path',)


