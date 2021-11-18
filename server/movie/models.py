from django.db import models
from django.conf import settings
from django.db.models.base import Model

# Create your models here.

class Genre(models.Model): 
    genre_id = models.IntegerField(primary_key=True)
    genre_name = models.CharField(max_length=50)
    

    def __str__(self):
        return f'{self.genre_id}, {self.genre_name}'

class Movie(models.Model):
    movie_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    overview = models.TextField()
    poster_path = models.CharField(max_length=500)
    release_date = models.DateField()
    vote_average = models.FloatField()
    genres = models.ManyToManyField(Genre)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_movies')

    def __str__(self):
        return f'{self.title}'



class Director(models.Model):
    director_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    original_name = models.CharField(max_length=50)
    profile_path = models.CharField(max_length=500)
    movie_direct = models.ManyToManyField(Movie,related_name='movie_director')

    def __str__(self) -> str:
        return f'{self.director_id},{self.name}'


class Actor(models.Model):
    actor_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    original_name = models.CharField(max_length=50)
    profile_path = models.CharField(max_length=500)
    movie_act = models.ManyToManyField(Movie, related_name='moive_actor')

    def __str__(self) -> str:
        return f'{self.actor_id},{self.name}'


class Review(models.Model) :
    RANKS = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    ]
    title = models.CharField(max_length=100)
    content = models.TextField()
    rank = models.PositiveIntegerField(choices=RANKS,default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    movie = models.ForeignKey(Movie,on_delete=models.CASCADE) # 어떤 영화?
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # 리뷰 쓴 작성자
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_reviews') # 리뷰 좋아요

    def __str__(self) -> str:
        return f'{self.title}'


class Comment(models.Model) :
    comment = models.CharField(max_length=200)
    review = models.ForeignKey(Review, on_delete=models.CASCADE) # 어떤 리뷰?
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # 댓글 작성자

    def __str__(self) -> str:
        return f'{self.comment}'