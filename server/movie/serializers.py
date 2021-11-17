from .models import Genre, Movie, Director, Actor, Review, Comment
from rest_framework import serializers


class MovieListSerializer(serializers.ModelSerializer) :

    class Meta :
        model = Movie
        fields =('id','title','poster_path')




















