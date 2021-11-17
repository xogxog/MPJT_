from django.contrib import admin
from .models import Movie, Genre,Director,Actor,Review,Comment
# Register your models here.

admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(Director)
admin.site.register(Actor)
admin.site.register(Review)
admin.site.register(Comment)