from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from rest_framework import serializers, status 
from .models import Director, Genre, Movie, Actor, Review, Comment
from .serializers import ActorSerializer, Commentserializer,DirectorSerializer, MovieListSerializer,MovieSerializer,ReviewListSerializer,ReviewSerializer
import requests


# Create your views here.

#main page 전체영화 - 추천영화 알고리즘 짜기(5개만 보내기)
@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializers = MovieListSerializer(movies,many=True)
    return Response(serializers.data)

# 영화상세 가지고오기
@api_view(['GET'])
def movie_detail(request,movie_pk) :
    movie = get_object_or_404(Movie,pk=movie_pk)
    movie_serializer = MovieSerializer(movie)

    reviews = Review.objects.filter(movie=movie_pk)
    reviews_serializers = ReviewListSerializer(reviews, many=True)

    serializers = {
        'movie' : movie_serializer.data,
        'reviews' : reviews_serializers.data,
        } 

    return Response(serializers)

# 리뷰생성
@api_view(['POST'])
def create_review(request, movie_pk):
    # 리뷰생성
    if request.method =='POST' :
        movie = get_object_or_404(Movie, movie_id=movie_pk)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user,movie=movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

# 리뷰상세 - 조회, 삭제, 수정
@api_view(['GET', 'DELETE', 'PUT'])
def review_detail(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    # 리뷰 조회
    if request.method == 'GET' :
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
    # 본인만 수정 삭제
    if request.user == review.user :
        # 삭제
        if request.method == 'DELETE' :
            review.delete()
            return Response({'delete': review_pk }, status=status.HTTP_204_NO_CONTENT)
        # 수정
        elif request.method == 'PUT' :
            serializer = ReviewSerializer(review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

                return Response(serializer.data)

#댓글 조회,생성
@api_view(['GET','POST'])
def create_comment(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'GET' : 
        comments = Comment.objects.filter(review=review_pk)
        serializers = Commentserializer(comments, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    elif request.method == 'POST' :
        serializer = Commentserializer(data=request.data)
        if serializer.is_valid(raise_exception=True) :
            serializer.save( user=request.user,review=review)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

# 댓글 삭제
@api_view(['DELETE'])
def delete_comment(request, comment_pk) :
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.user == comment.user :
        if request.method == 'DELETE':        
            comment.delete()
            data={
                'delete' : '댓글이 삭제되었습니다.'
            }
            return Response(data, status=status.HTTP_204_NO_CONTENT)








################################################ 데이터 들고오기 ##########################################################
# 장르
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



# 영화데이터 api요청 - 오래걸림
@api_view(['POST'])
def movie_get(request) :
    API_KEY = '33e4ef19e015d915281ddd6881f93178' # 환경변수로 나중에 숨기기

    # popular영화 한번에 400개 받기..! - 수정 : 한번에 100개로 줄이기
    for i in range(0,20) :
        page = i+1
        movie_url = f'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&page={page}&language=ko-KR'
        
        movie_list = requests.get(movie_url).json()
        movies = movie_list.get('results')
        # 받아오는 리스트가 20개 
        for i in range(0,20):
            # 원래 있는 데이터면 패스
            if Movie.objects.filter(movie_id=movies[i].get('id')).exists():
                pass
            else :
                # 영화테이블 넣기
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
                
                # 영화 생성할 때, 배우-감독 테이블 넣기
                credit_url = f'https://api.themoviedb.org/3/movie/{movie.movie_id}/credits?api_key={API_KEY}&language=ko-KR'
                credits = requests.get(credit_url).json()
                
                cast = credits.get('cast')

                for _actor in cast[:5] :
                    # 배우리스트에 없고, 배우 dept이면
                    if not Actor.objects.filter(actor_id=_actor.get('id')).exists() and _actor.get('known_for_department') == 'Acting':
                        actor = Actor.objects.create(
                            actor_id = _actor.get('id'),
                            name = _actor.get('name'),
                            original_name = _actor.get('original_name'),
                            profile_path = 'https://image.tmdb.org/t/p/original'+ (_actor.get('profile_path') if _actor.get('profile_path') else ''),
                        )
                        actor.movie_act.add(movie)
                    # 배우리스트에 있으면 mtm 관계에만 넣어주기
                    elif Actor.objects.filter(actor_id=_actor.get('id')).exists() :
                        actor = Actor.objects.get(actor_id=_actor.get('id'))
                        actor.movie_act.add(movie)
                
                crew = credits.get('crew')

                for _director in crew :
                    if not Director.objects.filter(director_id=_director.get('id')).exists() and _director.get('job') == 'Director':
                        director = Director.objects.create(
                            director_id = _director.get('id'),
                            name = _director.get('name'),
                            original_name = _director.get('original_name'),
                            # 프로필이 없는 경우가 있다.
                            profile_path = 'https://image.tmdb.org/t/p/original'+ (_director.get('profile_path') if _director.get('profile_path') else ''),
                        )
                        director.movie_direct.add(movie)
                    # 감독 리스트에 있으면 mtm 관계에만 넣어주기
                    elif Director.objects.filter(director_id=_director.get('id')).exists() :
                        director = Director.objects.get(director_id=_director.get('id'))
                        director.movie_direct.add(movie)


    return Response({'movie' : '영화가져오기 완료 및 배우, 감독 저장 완료'})

        

