from django.urls import path
from . import views


urlpatterns = [
    path('movie/',views.movie_list), # main page
    path('movie/<int:movie_pk>/', views.movie_detail),
    path('movie/<int:movie_pk>/like/', views.movie_like),
    path('movie/save_movies/', views.save_movies),
    path('movie/<int:movie_pk>/review/', views.create_review), #리뷰생성
    path('movie/review/<int:review_pk>/', views.review_detail),
    path('movie/review/<int:review_pk>/comment/', views.create_comment), # 댓글 조회, 생성
    path('movie/review/comment/<int:comment_pk>/', views.delete_comment), # 댓글 삭제
    # 데이터 들고오기
    path('create_genre/', views.genre_get),
    path('create_movie/', views.movie_get),


]


# 1. 영화 전체목록(main page) : GET
# 2. 단일 영화목록(movie datail page) : GET