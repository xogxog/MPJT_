from django.db.models.fields import IntegerField
from .models import Genre, Movie, Director, Actor, Review, Comment
from rest_framework import serializers
from accounts.serializers import UserInfoSerializer

# 전체 영화목록
class MovieListSerializer(serializers.ModelSerializer) :

    class Meta :
        model = Movie
        fields =('movie_id','title','poster_path',)

# 배우
class ActorSerializer(serializers.ModelSerializer):
    class Meta :
        model = Actor
        fields = ('actor_id', 'name','original_name','profile_path')

# 감독
class DirectorSerializer(serializers.ModelSerializer):
    class Meta :
        model = Director
        fields = ('director_id', 'name','original_name','profile_path')

# 영화 상세 - 리뷰 넣어야 함
class MovieSerializer(serializers.ModelSerializer) :
    
    movie_director=DirectorSerializer(many=True, read_only=True)
    movie_actor=ActorSerializer(many=True, read_only=True)
    like_users = UserInfoSerializer(many=True, read_only=True)
    like_users_count = serializers.IntegerField(
        source='like_users.count',
        read_only=True
        )

    class Meta :
        model = Movie
        fields = (
            'movie_id',
            'title',
            'overview',
            'genres',
            'poster_path',
            'release_date',
            'vote_average',
            'like_users',
            'like_users_count',
            'movie_actor',
            'movie_director',
            )


# 리뷰 - 하나 
class ReviewSerializer(serializers.ModelSerializer):
    
    user = UserInfoSerializer(read_only=True) # 작성자
    movie = MovieSerializer(read_only=True)
    like_users = UserInfoSerializer(many=True, read_only=True)
    
    class Meta :
        model = Review
        fields = ('id','title','content','rank','created_at','updated_at','movie','user','like_users')

# 리뷰 리스트
class ReviewListSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    like_users = UserInfoSerializer(many=True, read_only=True)
    like_users_count = serializers.IntegerField(
        source='like_users.count',
        read_only =True
    )
    # updated_at=serializers.DateTimeField(format=base.DATETIME_FORMAT, input_formats=None)
    class Meta :
        model = Review
        fields = ('id','title','user','updated_at','like_users', 'like_users_count') #user는 작성자


# 댓글 - 필터는 view에서 해야한다.
class Commentserializer(serializers.ModelSerializer) :
    user = UserInfoSerializer(read_only=True)
    # 생략해도 되나,,?
    review = ReviewSerializer(read_only=True)
    class Meta :
        model= Comment
        fields = ('id','user','comment','review')















