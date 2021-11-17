from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from rest_framework import serializers, status 
from . models import Genre, Movie
from .serializers import MovieListSerializer
import requests


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


# 장르부터 들고오기............
# 영화데이터 api요청 및 db에 반영 - 영화,
@api_view(['POST'])
def movie_get(request) :
    API_KEY = '33e4ef19e015d915281ddd6881f93178' # 환경변수로 나중에 숨기기
    url = f'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&page=1&language=ko-KR' # 일단 1페이지만 들고옴
    
    movie_list = requests.get(url).json()
    movies = movie_list.get('results')
    for i in range(0,20):
        movie = Movie.objects.create(
            title = movies[i].get('title'),
            overview = movies[i].get('overview'),
            poster_path = movies[i].get('poster_path'),
            release_date = movies[i].get('release_date')
        )
        # for genre in movies[i].get("genre_ids") :
        #     genre = 
        



    return movie_list.get('results')[0].get('title')
