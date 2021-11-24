from django.urls import path
from . import views

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.login),
    path('profile/<int:user_pk>/', views.otherProfile), # 다른사람 프로필
    # path('profile/<int:user_pk>',views.profile),
    path('api-token-auth/', obtain_jwt_token),
]
