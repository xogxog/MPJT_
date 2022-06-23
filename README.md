# MPJT

Notion URL : https://applause1319.notion.site/MPJT-24e2fddba80445f79fb9afa7e09e7224

Folder : root/NotionExport

# Movie Project SangJune & Taehyun

> Final Project
> 

<aside>
🫂 팀 구성원 : 김태현, 박상준

</aside>

## Design concept

> 검정
> 
- 모던함, 신비로움

> 시티팝
> 
- 도시적

<aside>
🏙️ Black이 주는 모던함과 신비로움 그리고 음악의 장르인 시티팝의 도시적 느낌을 살려 깔끔하고 보기 편한 디자인

</aside>

## Site Concept

> 은하수
> 

<aside>
💫 디자인 컨셉과 어울리는 은하수를 사이트 컨셉으로 결정. 별들이 쭉 연결되어 있는 은하수같이 사이트 내 영화 정보 및 사용자 간 데이터 모두 연결

</aside>

> 스크롤 많이 안하는 사이트
> 

<aside>
📜 디자인 컨셉에 맞춘 깔끔함과 편안한 웹서핑을 위한 최소한의 스크롤

</aside>

## 개발환경

### 1. 사용 언어

- HTML
- CSS
- JavaScript
- Python
- Django
- Vue.js

### 2. 설치

- 로컬 구동 사용 기준, 사용자의 폴더 구성에 따라 달라 질 수 있음
- Back

```
# Back 폴더 이동
cd server/

# 가상환경 설치
python -m venv venv

# 가상환경 사용
source venv/Scripts/activate

# DB 적용
python manage.py migrate

# 서버 구동
python manage.py runserver

# data 불러오기
PostMan 이용
1. 장르불러오기
Post 요청
http://127.0.0.1:8000/movie/create_genre/

2. 영화 불러오기
Post 요청
http://127.0.0.1:8000/movie/create_movie/

# admin 등록 및 주의 사항
python manage.py createsuperuser
http://127.0.0.1:8000/admin

**외 Homepage 내에서 admin page 접속을 위해 관리자 등록할때 id: admin으로 설정**
```

- Front

```
# Front 폴더 이동
cd client

# npm 환경 설치
** node.js, vue.js 미 설치 시 검색을 통해 설치 요망
npm i

# 서버 구동
npm run serve 
```

## 사용 툴

- Notion
    - 계획 및 작업일지 등 현황 공유와 정리
- Figma
    - Web Prototype 작성
- ERD Cloud
    - DB ERD 작성
- gitHub
    - 버전 관리 및 작업 Merge
- 외 Adobe XD, VSCode Live Share 등 필요 시 사용

## 추천 알고리즘

[MAIN으로 다시가기]()

- 수정 전
    - 회원 가입 시 좋아하는 장르 기반하여 가장 많은 장르를 가진 영화 20개 추천, 로그인 하지 않은 사용자는 db상 최상단 영화 20개 추천
    - 문제점 : 영화추천 리스트가 고정적임

```python
@api_view(['GET'])
@permission_classes([AllowAny])
def movie_list(request):
    # 랜덤하게 보내기 - isLogin 확인해서 값 다르게 보내기
    # print(request.GET.get('isLogin'))
    # 찜할때마다 선호하는 장르 계산하도록 설계
    if request.GET.get('isLogin') == 'true' :
        get_user_like_genre = Genre.objects.filter(user__id=request.user.id)
        # 좋아하는 장르 가장 많이 가진 영화 -> vote_average 순으로 정렬해서 20개 추천
        movies = Movie.objects.filter(
            genres__genre_id__in=get_user_like_genre
						).annotate(
                count_movies=Count('movie_id')
            ).order_by(
                '-count_movies','-vote_average'
            )[:20]
				serializers = MovieListSerializer(movies,many=True)
        return Response(serializers.data)
		else :
        movies = get_list_or_404(Movie)[:20]
        serializers = MovieListSerializer(movies,many=True)
    return Response(serializers.data)
```

- 수정 후
    - 사용자가 영화를 찜 할 때마다 사용자가 찜한 영화의 장르 갯수 카운트하여 갯수가 가장 많은 장르 3개 기반하여 영화 100개 뽑은 후, 20개 랜덤으로 추출하여 추천.
    - 로그인하지 않은 사용자는 랜덤 추출하여 보여주도록 함.

```python
@api_view(['GET'])
@permission_classes([AllowAny])
def movie_list(request):
    # 찜할때마다 선호하는 장르 계산하도록 설계
    if request.GET.get('isLogin') == 'true' :
        user_like_movies=Movie.objects.filter(like_users__id=request.user.id) # 유저가 좋아하는 영화
        user_like_movies_serializer=MovieSerializer(user_like_movies, many=True)
        genres_dic={
            '12':0,
            '14':0,
            '16':0,
            '18':0,
            '27':0,
            '28':0,
            '35':0,
            '36':0,
            '37':0,
            '37':0,
            '53':0,
            '80':0,
            '99':0,
            '878':0,
            '9648':0,
            '10402':0,
            '10749':0,
            '10751':0,
            '10770':0,
        }
        for movie in user_like_movies_serializer.data :
            for movie_genre in movie.get('genres') :
                genres_dic[str(movie_genre)] +=1
        sorted_genres =[]
        for genre in sorted(genres_dic.items(), key=lambda x: x[1], reverse=True)[:3] :
            sorted_genres.append(int(genre[0]))
        get_user_like_genre = Genre.objects.filter(genre_id__in=sorted_genres) # 사용자가 찜한 영화 장르 top3
        get_user_like_genre2 = Genre.objects.filter(user__id=request.user.id) # 사용자가 좋아하는 장르
        # 좋아하는 장르 가장 많이 가진 영화 100순위 중 랜덤20개
        movies = sorted(Movie.objects.filter(
            Q(genres__genre_id__in=get_user_like_genre)|Q(genres__genre_id__in=get_user_like_genre2) & ~Q(like_users__id=request.user.id)
            ).annotate(
                count_movies=Count('movie_id')
            ).order_by(
                '-count_movies','-vote_average',
            )[:100], key=lambda x: random.random())[:20]
        serializers = MovieListSerializer(movies,many=True)
        return Response(serializers.data)
    else :
        movies = sorted(Movie.objects.all(),key=lambda x: random.random())[:20]
        serializers = MovieListSerializer(movies,many=True)
    return Response(serializers.data)
```

## Prototype

### 프로젝트 시작 전

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fee1ec678-e82a-494e-9a5e-88918f8d30ce%2FUntitled.png?table=block&id=f781011d-7fae-474f-a80e-5ff485e27beb&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&width=2000&userId=&cache=v2)

### 프로젝트 시작 후 조금씩 수정

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb268712f-9ba4-4351-a5a8-796834912406%2FUntitled.png?table=block&id=4298da6b-0080-4378-b566-615e18581de8&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&width=2000&userId=&cache=v2)

## ERD

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd4d03fc3-c392-4e9c-ac83-2254e24dd4f1%2FUntitled.png?table=block&id=818a94fb-e072-4031-b3c3-c9970fa28b73&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&width=2000&userId=&cache=v2)

## 작업일지

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbf8c861c-60dd-4f82-b8db-bec18cd4a0b1%2FUntitled.png?table=block&id=0e73e213-a8f1-474e-baa9-519542899bf2&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&width=2000&userId=&cache=v2)

- 작업일지 - (노션 확인요망)
    - [x]  영화 - 평점 등록,수정,삭제
    - [x]  리뷰 - 조회,생성,수정,삭제
    - [x]  댓글 - 작성,삭제
    - [x]  프로필 - 조회,수정,업데이트
    - [x]  [search api 요청] - front
    - [x]  [영화데이터 업데이트 어떤 상황에서 할 건지]
    - [x]  [추천알고리즘 짜기]
    - [x]  일간 박스오피스(한국 진흥원) - front → 포스터없어서 tmdb trend로 계획 수정
    
    [BACKEND](https://www.notion.so/6f148237c65d404188f88bbe71f48205)
    
    [FRONTEND](https://www.notion.so/0421f83c06754ac9996a7fa484821aa1)

## 리뷰

### 영화 데이터 추출

```python
# 영화데이터 api요청 - 오래걸림
@api_view(['POST'])
@permission_classes([AllowAny])
def movie_get(request) :
    API_KEY = #

    # popular영화 20페이지
    for i in range(0,20) :
        page = i+1
        movie_url = f'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&page={page}&language=ko-KR'
        movie_list = requests.get(movie_url).json()
        movies = movie_list.get('results')
        # 받아오는 리스트가 20개 
        for i in range(0,20):
            print(movies[i].get('title'), movies[i].get('release_date'))
            # 원래 있는 영화데이터 및 유효성 검사하여 db반영 하지 않도록 함.
            if Movie.objects.filter(movie_id=movies[i].get('id')).exists() or movies[i].get('release_date') == '' or movies[i].get('release_date') == None or movies[i].get('vote_average') == 0.0:
                pass
            else :
                # 영화테이블 생성
                movie = Movie.objects.create(
                    movie_id = movies[i].get('id'),
                    title = movies[i].get('title'),
                    overview = movies[i].get('overview'),
                    poster_path =('https://image.tmdb.org/t/p/original'+movies[i].get('poster_path') if movies[i].get('poster_path') else ''),
                    release_date = movies[i].get('release_date'),
                    vote_average = movies[i].get('vote_average'),
                )
                # may-to-many field 저장 방법.
                for genre_id in movies[i].get("genre_ids") :
                    genre = Genre.objects.get(genre_id=genre_id)
                    movie.genres.add(genre)
                
                # 영화 생성할 때, 배우-감독 테이블 함께 넣기
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
                            profile_path = ('https://image.tmdb.org/t/p/original'+_actor.get('profile_path') if _actor.get('profile_path') else ''),
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
                            profile_path =('https://image.tmdb.org/t/p/original'+_director.get('profile_path') if _director.get('profile_path') else ''),
                        )
                        director.movie_direct.add(movie)
                    # 감독 리스트에 있으면 mtm 관계에만 넣어주기
                    elif Director.objects.filter(director_id=_director.get('id')).exists() :
                        director = Director.objects.get(director_id=_director.get('id'))
                        director.movie_direct.add(movie)

    return Response({'movie' : '영화가져오기 완료 및 배우, 감독 저장 완료'})
```

### INDEX

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa14175f1-2710-44c7-9966-de4da753e6f4%2Findex.gif?table=block&id=9ae6cdd6-9d42-4e30-92da-463e3064b586&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- 전반적으로 Vuetify를 사용하여 레이아웃 구성
- 뒷 배경은 디자인 컨셉에 particle 효과가 어울려 vue.js 라이브러리 사용하였고, 컨셉 색상인 검정을 전부 칠하니 살짝 밋밋하여 아래쪽은 살짝 붉은 빛을 줌
- Welcome Text는 background 배경효과를 animate하고 webkit text fill로 글자에 투명효과 사용
- Vuetify togle bar 사용하여 nav bar 없는 사이트로 구성

### MAIN

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa14175f1-2710-44c7-9966-de4da753e6f4%2Findex.gif?table=block&id=9ae6cdd6-9d42-4e30-92da-463e3064b586&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- Main에 미로그인 시 영화 무작위 추천, 로그인 시 `[알고리즘]()` 이용한 사용자 취향을 반영한 영화 추천
- carousel은 Vue.js 라이브러리 이용 후 유튜브 참고하여 각 슬라이드마다 호버 시 투명 할 수 있도록 효과 삽입

### MOVIE DETAIL

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fea271fe6-5553-4089-a292-50574565612f%2Fmoviedetail.gif?table=block&id=c5904bda-8ee9-4ff0-9507-0214ce172dd9&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- TMDB API를 이용 Detail 보고 있는 영화와 관련된 추천 영화 하단에 삽입 후 각 Image는 Jquery 활용하여 마우스 효과 삽입(마우스 방향에 따른 검정 원 이동 효과)
- 영화 찜, 리뷰작성, 리뷰 수정, 리뷰 삭제, 리뷰 좋아요, 댓글 작성 및 삭제 페이지 리로드 없이 화면 상에 바로 반영 가능하도록 로직 구성, 수정사항 발생 시 db에 바로 바로 반영
- 영화디테일 창에서 리뷰도 함께 보여 줄 것이라, serializers에 `movie`와 `reviews`를 함께 보내야 함
    - `movie` 와 `review`  각각 직렬화 시킨 후, 딕셔너리 형태로 묶어서 해결

```python
# movie/views.py

@api_view(['GET'])
@permission_classes([AllowAny])
def movie_detail(request,movie_id) :
    movie = get_object_or_404(Movie,movie_id=movie_id)
    movie_serializer = MovieSerializer(movie)
    reviews = Review.objects.filter(movie=movie_id)
    reviews_serializers = ReviewListSerializer(reviews, many=True)
    serializers = {
        'movie' : movie_serializer.data,
        'reviews' : reviews_serializers.data,
        } 

    return Response(serializers)
```

- 영화 찜 아이콘 토글 위한 boolean 값 설정
    - 해당 영화를 좋아하는 사람이 아무도 없을 경우, for문이 돌지 않는 이슈 발생
        - if문으로 조건을 걸어, 해당 영화를 좋아하는 사람이 없을 경우 false값을 저장하도록 하여 해결.

```jsx
//getMovieDetail.js
movieDetail : function({rootState,commit,state}){
      // console.log(state.movieId)
      axios({
        method : 'get',
        url : `http://127.0.0.1:8000/movie/movie/${state.movieId}`,
        headers : rootState.login.token,
      })
      .then((res)=>{
        commit('MOVIE_DETAIL',res.data)
        // 좋아요 상태 바꿔주기
        if(state.movieDetail.movie.like_users.length===0){
          let likeMovie=false
            commit('MOVIE_LIKE_UNLIKE',likeMovie)
        }else{
          for(let like_user of state.movieDetail.movie.like_users){
            if(like_user.id===rootState.login.userInfo.id){
              let likeMovie=true
              commit('MOVIE_LIKE_UNLIKE',likeMovie)
              break
            }else{
              let likeMovie=false
              commit('MOVIE_LIKE_UNLIKE',likeMovie)
            }
          }
        }
      })
    }
```

### MOVIE SEARCH

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a929665-3d7f-40e5-b86d-f2d1a871855a%2Fsearch.gif?table=block&id=aa32c26e-c0d4-498c-8cc4-563f93384e65&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- TMDB API를 활용, 영화 검색 후 DRF로 영화 데이터 저장, 이후 DRF DB와 연동하여 Detail 볼 수 있도록 함
- 상위 Detail의 Jqeury를 활용한 Image 효과 사용

### MOVIE BOX OFFICE

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F18fcf398-ef89-4aba-96ba-da8ffcfea155%2Fboxoffice.gif?table=block&id=320dbaaa-ae29-4b72-aaa5-02e6060f78cd&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- 기존 영화진흥원 API를 이용하여 한국 BOX OFFICE 순위를 가져오도록 기획하였었으나, 데이터를 연동하고보니 Poster Image가 없는 문제 발생
- 이후 계획 급 선회하여 TMDB API의 TREND에서 영화 추출
위 Search와 똑같은 방식으로 DRF DB에 저장 후 Detail 볼 수 있도록 연결

### MOVIE REVIEW

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff64b12c7-8a2d-4408-abf3-de5d79fcb423%2Fmoviereview.gif?table=block&id=eb154b2c-6bcd-4ca6-9c4b-6b2520c2d086&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- 이것저것 탈이 많았던 Review
- 해당 페이지의 경우 깔끔하게 디자인하기가 매우 힘들었고 이런저런 변경 사항이 많았다.
- 또한 이번 PROJECT에서 가장 많은 Component를 가지고있어서 Data 연동에도 많은 어려움을 겪음(Vuetify table, comment, review, edit ETC...)
- 특히, 리뷰 수정 시, 기존에 입력된 값이 제대로 들어가지 않는 이슈 발생
    - vue lifeCycle인 created를 이용하여 data에 값 넣어주기 → 실패
    - data에 `${}` 를 이용하여 바로 해결 → 의외로 간단했다.

### SIGNUP & LOGIN

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6cc9828f-89a6-41e0-931d-65f5e5e86b3f%2Fsignup.gif?table=block&id=d4b7d548-3bf0-4b2c-a0e9-da2e6108eead&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe8c7cb93-d0f2-4420-8382-da599d5313bf%2Flogin.gif?table=block&id=22bfead8-2cc9-4d7f-b888-45c9a1571d0b&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- Sign up 과 Login의 경우 프로젝트 진행 중 첫 DRF와 연동하는 작업에 익숙하지 못하여 상당한 시간을 소요함
- 특히, vuex를 사용하여 데이터 연동의 중요성(편의성)의 깨달음을 선사함. 이후 거의 모든 작업은 vuex 모듈화를 통해 data 연동 작업 진행
- 버튼 효과에 많은 투자를 하였고 결과적으로는 꽤 이쁜게 성공으로 보여진다. Anchor에 4개의 span을 두고 테두리 효과를 준 뒤 마우스 호버 시 흰색으로 변하는 효과 삽입(codepen 참고)

### PROFILE

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F88802e71-22c4-46ab-b047-d0634b4560d7%2Fprofile.gif?table=block&id=c363faf4-3f1e-422e-9655-d0142f76559a&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- 이미지 파일 수정 요청(Vue → Django)
    - 이미지 파일은 텍스트 형태가 아닌 파일 형태로 저장 요청해야 함.
        - `FormData` 선언 후, 업로드할 파일 `append` 하여 이미지파일 데이터 담기
    - 요청 시, UnAuthorization 이슈 발생
        - headers를 딕셔너리 형태로 넘겨 주는 것이기 때문에 `rootState.login.token` 안의 `Authorization` 값으로 접근하여 요청 완료

```jsx
editProfileImg : function({rootState,dispatch}, file){
      let data = new FormData()
      data.append('file', file)
      axios({
        method : 'post',
        url : `http://127.0.0.1:8000/accounts/profile/${rootState.login.userInfo.id}/editProfileImage/`,
        data : data,
        headers : {
          'content-type': 'multipart/form-data',
          'Authorization': rootState.login.token.Authorization,
        },
      })
      .then(() =>{
        dispatch('login/getUserInfo',null,{root:true})
      })
    }
```

- 이미지 파일 Vue로 부터 받기(Django)
    - 프로필 사진 수정이라, put요청으로 받았는데, `request.FILES.get('file')`에서 FILES 속성이 없는 문제 발생
        - put → post 로 수정하여 해결
    - 받아온 파일은 request.data.get이 아닌 request.files.get으로 받아야 함.

```python
@api_view(['POST'])
def editProfileImage(request,user_pk):
    user = get_object_or_404(User, pk=user_pk)
    user.profile_path = request.FILES.get('file')
    if request.user.id==user_pk :
        user.save()
        return Response(status=status.HTTP_201_CREATED)
```

## 후기

> **김태현**
> 
- 추천 알고리즘 구현 시, django orm 문법이 익숙치 않아서 초기 알고리즘을 짜는데 하루가 걸렸다. 추후 db데이터를 serializer 폼으로 만들어서 데이터를 조작할 수 있겠다는 생각이 들었고, 추천 알고리즘은 생각부터 구현까지 2시간 만에 만들었다. 나 좀 성장 했나?
- 데이터를 받아오는 요청이 꽤 있어서, 그때마다 데이터를 db에 저장을 따로 시키고, vue에서도 바로 사용 할 수 있도록 불러내는 작업이 많았다. 연결 시킬 때 마다 어떤 데이터를 vue에 업데이트 및 저장 시킬지 항상 고민해야 하는 작업이 상당히 고됐다...😂😂
- 프로젝트 중간에 serializer를 수정하는 일이 몇 번 있었는데 데이터 구조가 달라져서 vue에서 데이터를 쓸 때, 수정해야하는 상황....너무 싫어요...ㅎ 다 고쳤다고 생각하지만 의도치 않은 곳에서 에러가 자꾸 나서 고생했다...🤷‍♀️
- 프로젝트 시작 직전에 vue를 배워서 익숙치 않았고 장고도..배운지 오래돼서(ㅎ) 어떻게 해야하나 조금 막막했다. 그래도 하루하루. 풀리지 않을 것 같던 것들을 **깐부 상준상준상**과 구글과 공식문서를 통해 해결해나갔다.
- 아쉬운 점
    - 유효성 검증에서 상황을 세분화 시켜 검증해야했는데 , 그 부분에 있어서는 아직 미흡한 듯 하다.
    - 환경변수 설정 못함. 소중한 개인정보 지켜야합니다. 이 부분은  프로젝트 끝나고 따로 구현할 예정이다.

> **박상준**👶
> 
- 아주 매우 힘든 여정이였다.
- 첫 시작 전 염려 반 기대 반으로 시작한 첫 프로젝트를 생각보다(내 기준-*저도 만족스러운데요?(태현)*) 괜찮게 완성한듯하여 기분이 좋다
- 이번 경험을 통해 많은 생각을 하게되었다.
    - 기획
        - 태현이와 기획에 꽤 많은 시간을 투자하였다. 이로 인해 무언가 문제가 생겼더라도 앞서 만들었던 기획들(ERD, Prototype 등)을 다시 점검하고 수정하면서 많은 시간 단축하였다.
    - 소통
        - 하루의 첫과 끝을 항상 이야기 나누고 서로 피드백하는 시간을 가짐으로 중간에 의사 소통이 없이 꼬이는 경우가 많이 없었다.
    - 툴
        - 프로젝트 시작 전 툴들에 대해 많이 공부하였고 JIRA를 사용하고 싶었으나 생각보다 사용하기 힘들어서 제외시켰다. 추후 JIRA를 공부하여 프로젝트 시 사용해보고싶다.
    - 공식문서
        - 공식문서에 정말 많은 부분이 있다. 모르면 일단 공식문서 확인과 StackOverFlow 사이트를 적극 활용하자.
- 아쉬운 점
    - 나는 Front 위주로 진행하였는데 생각보다 조금 막히는 부분도 많았기에 추후 JS를 비롯 공부가 시급하다.
    - 근데 Front 뿐만 아니라 Back 부분 또한 마찬가지다. 서로 분업하여 진행하면서 Back 부분은 많이 부족함을 느꼈고 처음부터 차근히 살펴봐야겠다.