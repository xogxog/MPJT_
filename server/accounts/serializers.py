from django.db import models
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
from movie.models import Movie

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
    class MovieListSerializer(serializers.ModelSerializer) :
        class Meta :
            model = Movie
            fields =('movie_id','title','poster_path',)
    like_movies=MovieListSerializer(many=True, read_only=True)

    class UserSerializer(serializers.ModelSerializer):
        class Meta : 
            model = User
            fields = ('id','nickname','profile_path')
    followings=UserSerializer(many=True, read_only=True)
    followers=UserSerializer(many=True, read_only=True)

    class Meta :
        model = User
        fields = ('id','username','nickname','profile_path','followings','followers','like_genres','like_movies')


