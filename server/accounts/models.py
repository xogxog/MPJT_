from django.db import models
from django.contrib.auth.models import AbstractUser

from movie.models import Genre

class User(AbstractUser):
    nickname = models.CharField(max_length=10)
    profile_path = models.CharField(max_length=300)
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    like_genres = models.ManyToManyField(Genre)

