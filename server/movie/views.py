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

################################################ 데이터 들고오기 ##########################################################
# 장르
# 장르 특정한 사람만 가지고 올 수 있도록 장치할 것
@api_view(['POST'])
def genre_get(request) :
    API_KEY = '33e4ef19e015d915281ddd6881f93178'
    url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={API_KEY}&language=ko-KR' #장르

    genre_list = requests.get(url).json()
    genres = genre_list.get('genres')
    for i in range(0,19) :
        genre = Genre.objects.create(
            genre_id = genres[i].get('id'),
            genre_name = genres[i].get('name')
        )
        
        # print(id, name)
    return Response({ 'genre' : '장르가져오기 완료'})

    # return id, name


# 영화데이터 api요청 및 db에 반영 - 영화,
@api_view(['POST'])
def movie_get(request) :
    API_KEY = '33e4ef19e015d915281ddd6881f93178' # 환경변수로 나중에 숨기기
    url = f'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&page=1&language=ko-KR' # 일단 1페이지만 들고옴
    
    movie_list = requests.get(url).json()
    movies = movie_list.get('results')
    for i in range(0,20):
        movie = Movie.objects.create(
            movie_id = movies[i].get('id'),
            title = movies[i].get('title'),
            overview = movies[i].get('overview'),
            poster_path = 'https://image.tmdb.org/t/p/original'+ movies[i].get('poster_path'),
            release_date = movies[i].get('release_date'),
            vote_average = movies[i].get('vote_average'),
        )
        # may-to-many field 저장 add 해야함.
        for genre_id in movies[i].get("genre_ids") :
            genre = Genre.objects.get(genre_id=genre_id)
            movie.genres.add(genre)
        

    return Response({'movie' : '영화가져오기 완료'})
