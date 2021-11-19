from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from movie.models import Genre

# profile -> field 다른거 줘야하나? 
class User(AbstractUser):
    nickname = models.CharField(max_length=10)
    profile_path = ProcessedImageField(
        default= 'default_profile/KakaoTalk_20210721_200742580.jpg',
        blank = True,
        upload_to = 'profiles/%Y/%m/%d/',
        processors=[ResizeToFill(100,100)],
        format='JPEG',
        options={'quality':90},
    )
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    like_genres = models.ManyToManyField(Genre)

