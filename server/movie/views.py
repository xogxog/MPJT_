from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from rest_framework import serializers, status 
from . models import Movie
from .serializers import MovieListSerializer


# Create your views here.

#main page 전체영화 - 추천영화 알고리즘 짜기
@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializers = MovieListSerializer(movies,many=True)
    return Response(serializers.data)

# 영화상세 가지고오기
# @api_view(['GET'])
# def movie_detail(request,movie_pk) :
#     movie = get_object_or_404(Movie,pk=movie_pk)


# 영화데이터 api요청 및 db에 반영 - 영화,
# @api_view(['GET'])
# def movie_get(request) :

