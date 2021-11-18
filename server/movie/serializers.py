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

# 댓글 - 필터는 view에서 해야한다.
class Commentserializer(serializers.ModelSerializer) :
    user = UserInfoSerializer(read_only=True)
    class Meta :
        model= Comment
        fields = ('id','user','comment')



# 리뷰 - 영화상세 에서 보여줌
class ReviewListSerializer(serializers.ModelSerializer):
    
    like_users = UserInfoSerializer(read_only=True)

    class Meta :
        model = Review
        fields = ('id','title','user','updated_at','like_users') #user는 작성자

# 리뷰상세 - 리뷰 프로필(유저serializer에서 프로필정보 들고오기)
class ReviewDetailSerializer(serializers.ModelSerializer):
    # 안가져와질 수도 있음..!
    user = UserInfoSerializer(read_only=True) # 작성자

    class Meta :
        model = Review
        fields = ('id','user','title','content','like_users')


# 영화 상세 - 리뷰 넣어야 함
class MovieSerializer(serializers.ModelSerializer) :
    
    movie_director=DirectorSerializer(many=True, read_only=True)
    movie_actor=ActorSerializer(many=True, read_only=True)


    class Meta :
        model = Movie
        fields = (
            'movie_id',
            'title',
            'overview',
            'poster_path',
            'release_date',
            'vote_average',
            'like_users',
            'movie_actor',
            'movie_director',
            )





















