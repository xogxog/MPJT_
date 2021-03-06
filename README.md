# MPJT

Notion URL : https://applause1319.notion.site/MPJT-24e2fddba80445f79fb9afa7e09e7224

Folder : root/NotionExport

# Movie Project SangJune & Taehyun

> Final Project
> 

<aside>
π« ν κ΅¬μ±μ : κΉνν, λ°μμ€

</aside>

## Design concept

> κ²μ 
> 
- λͺ¨λν¨, μ λΉλ‘μ

> μν°ν
> 
- λμμ 

<aside>
ποΈ Blackμ΄ μ£Όλ λͺ¨λν¨κ³Ό μ λΉλ‘μ κ·Έλ¦¬κ³  μμμ μ₯λ₯΄μΈ μν°νμ λμμ  λλμ μ΄λ € κΉλνκ³  λ³΄κΈ° νΈν λμμΈ

</aside>

## Site Concept

> μνμ
> 

<aside>
π« λμμΈ μ»¨μκ³Ό μ΄μΈλ¦¬λ μνμλ₯Ό μ¬μ΄νΈ μ»¨μμΌλ‘ κ²°μ . λ³λ€μ΄ μ­ μ°κ²°λμ΄ μλ μνμκ°μ΄ μ¬μ΄νΈ λ΄ μν μ λ³΄ λ° μ¬μ©μ κ° λ°μ΄ν° λͺ¨λ μ°κ²°

</aside>

> μ€ν¬λ‘€ λ§μ΄ μνλ μ¬μ΄νΈ
> 

<aside>
π λμμΈ μ»¨μμ λ§μΆ κΉλν¨κ³Ό νΈμν μΉμνμ μν μ΅μνμ μ€ν¬λ‘€

</aside>

## κ°λ°νκ²½

### 1. μ¬μ© μΈμ΄

- HTML
- CSS
- JavaScript
- Python
- Django
- Vue.js

### 2. μ€μΉ

- λ‘μ»¬ κ΅¬λ μ¬μ© κΈ°μ€, μ¬μ©μμ ν΄λ κ΅¬μ±μ λ°λΌ λ¬λΌ μ§ μ μμ
- Back

```
# Back ν΄λ μ΄λ
cd server/

# κ°μνκ²½ μ€μΉ
python -m venv venv

# κ°μνκ²½ μ¬μ©
source venv/Scripts/activate

# DB μ μ©
python manage.py migrate

# μλ² κ΅¬λ
python manage.py runserver

# data λΆλ¬μ€κΈ°
PostMan μ΄μ©
1. μ₯λ₯΄λΆλ¬μ€κΈ°
Post μμ²­
http://127.0.0.1:8000/movie/create_genre/

2. μν λΆλ¬μ€κΈ°
Post μμ²­
http://127.0.0.1:8000/movie/create_movie/

# admin λ±λ‘ λ° μ£Όμ μ¬ν­
python manage.py createsuperuser
http://127.0.0.1:8000/admin

**μΈ Homepage λ΄μμ admin page μ μμ μν΄ κ΄λ¦¬μ λ±λ‘ν λ id: adminμΌλ‘ μ€μ **
```

- Front

```
# Front ν΄λ μ΄λ
cd client

# npm νκ²½ μ€μΉ
** node.js, vue.js λ―Έ μ€μΉ μ κ²μμ ν΅ν΄ μ€μΉ μλ§
npm i

# μλ² κ΅¬λ
npm run serve 
```

## μ¬μ© ν΄

- Notion
    - κ³ν λ° μμμΌμ§ λ± νν© κ³΅μ μ μ λ¦¬
- Figma
    - Web Prototype μμ±
- ERD Cloud
    - DB ERD μμ±
- gitHub
    - λ²μ  κ΄λ¦¬ λ° μμ Merge
- μΈ Adobe XD, VSCode Live Share λ± νμ μ μ¬μ©

## μΆμ² μκ³ λ¦¬μ¦

[MAINμΌλ‘ λ€μκ°κΈ°]()

- μμ  μ 
    - νμ κ°μ μ μ’μνλ μ₯λ₯΄ κΈ°λ°νμ¬ κ°μ₯ λ§μ μ₯λ₯΄λ₯Ό κ°μ§ μν 20κ° μΆμ², λ‘κ·ΈμΈ νμ§ μμ μ¬μ©μλ dbμ μ΅μλ¨ μν 20κ° μΆμ²
    - λ¬Έμ μ  : μνμΆμ² λ¦¬μ€νΈκ° κ³ μ μ μ

```python
@api_view(['GET'])
@permission_classes([AllowAny])
def movie_list(request):
    # λλ€νκ² λ³΄λ΄κΈ° - isLogin νμΈν΄μ κ° λ€λ₯΄κ² λ³΄λ΄κΈ°
    # print(request.GET.get('isLogin'))
    # μ°ν λλ§λ€ μ νΈνλ μ₯λ₯΄ κ³μ°νλλ‘ μ€κ³
    if request.GET.get('isLogin') == 'true' :
        get_user_like_genre = Genre.objects.filter(user__id=request.user.id)
        # μ’μνλ μ₯λ₯΄ κ°μ₯ λ§μ΄ κ°μ§ μν -> vote_average μμΌλ‘ μ λ ¬ν΄μ 20κ° μΆμ²
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

- μμ  ν
    - μ¬μ©μκ° μνλ₯Ό μ° ν  λλ§λ€ μ¬μ©μκ° μ°ν μνμ μ₯λ₯΄ κ°―μ μΉ΄μ΄νΈνμ¬ κ°―μκ° κ°μ₯ λ§μ μ₯λ₯΄ 3κ° κΈ°λ°νμ¬ μν 100κ° λ½μ ν, 20κ° λλ€μΌλ‘ μΆμΆνμ¬ μΆμ².
    - λ‘κ·ΈμΈνμ§ μμ μ¬μ©μλ λλ€ μΆμΆνμ¬ λ³΄μ¬μ£Όλλ‘ ν¨.

```python
@api_view(['GET'])
@permission_classes([AllowAny])
def movie_list(request):
    # μ°ν λλ§λ€ μ νΈνλ μ₯λ₯΄ κ³μ°νλλ‘ μ€κ³
    if request.GET.get('isLogin') == 'true' :
        user_like_movies=Movie.objects.filter(like_users__id=request.user.id) # μ μ κ° μ’μνλ μν
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
        get_user_like_genre = Genre.objects.filter(genre_id__in=sorted_genres) # μ¬μ©μκ° μ°ν μν μ₯λ₯΄ top3
        get_user_like_genre2 = Genre.objects.filter(user__id=request.user.id) # μ¬μ©μκ° μ’μνλ μ₯λ₯΄
        # μ’μνλ μ₯λ₯΄ κ°μ₯ λ§μ΄ κ°μ§ μν 100μμ μ€ λλ€20κ°
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

### νλ‘μ νΈ μμ μ 

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fee1ec678-e82a-494e-9a5e-88918f8d30ce%2FUntitled.png?table=block&id=f781011d-7fae-474f-a80e-5ff485e27beb&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&width=2000&userId=&cache=v2)

### νλ‘μ νΈ μμ ν μ‘°κΈμ© μμ 

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb268712f-9ba4-4351-a5a8-796834912406%2FUntitled.png?table=block&id=4298da6b-0080-4378-b566-615e18581de8&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&width=2000&userId=&cache=v2)

## ERD

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd4d03fc3-c392-4e9c-ac83-2254e24dd4f1%2FUntitled.png?table=block&id=818a94fb-e072-4031-b3c3-c9970fa28b73&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&width=2000&userId=&cache=v2)

## μμμΌμ§

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbf8c861c-60dd-4f82-b8db-bec18cd4a0b1%2FUntitled.png?table=block&id=0e73e213-a8f1-474e-baa9-519542899bf2&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&width=2000&userId=&cache=v2)

- μμμΌμ§ - (λΈμ νμΈμλ§)
    - [x]  μν - νμ  λ±λ‘,μμ ,μ­μ 
    - [x]  λ¦¬λ·° - μ‘°ν,μμ±,μμ ,μ­μ 
    - [x]  λκΈ - μμ±,μ­μ 
    - [x]  νλ‘ν - μ‘°ν,μμ ,μλ°μ΄νΈ
    - [x]  [search api μμ²­] - front
    - [x]  [μνλ°μ΄ν° μλ°μ΄νΈ μ΄λ€ μν©μμ ν  κ±΄μ§]
    - [x]  [μΆμ²μκ³ λ¦¬μ¦ μ§κΈ°]
    - [x]  μΌκ° λ°μ€μ€νΌμ€(νκ΅­ μ§ν₯μ) - front β ν¬μ€ν°μμ΄μ tmdb trendλ‘ κ³ν μμ 
    
    [BACKEND](https://www.notion.so/6f148237c65d404188f88bbe71f48205)
    
    [FRONTEND](https://www.notion.so/0421f83c06754ac9996a7fa484821aa1)

## λ¦¬λ·°

### μν λ°μ΄ν° μΆμΆ

```python
# μνλ°μ΄ν° apiμμ²­ - μ€λκ±Έλ¦Ό
@api_view(['POST'])
@permission_classes([AllowAny])
def movie_get(request) :
    API_KEY = #

    # popularμν 20νμ΄μ§
    for i in range(0,20) :
        page = i+1
        movie_url = f'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&page={page}&language=ko-KR'
        movie_list = requests.get(movie_url).json()
        movies = movie_list.get('results')
        # λ°μμ€λ λ¦¬μ€νΈκ° 20κ° 
        for i in range(0,20):
            print(movies[i].get('title'), movies[i].get('release_date'))
            # μλ μλ μνλ°μ΄ν° λ° μ ν¨μ± κ²μ¬νμ¬ dbλ°μ νμ§ μλλ‘ ν¨.
            if Movie.objects.filter(movie_id=movies[i].get('id')).exists() or movies[i].get('release_date') == '' or movies[i].get('release_date') == None or movies[i].get('vote_average') == 0.0:
                pass
            else :
                # μννμ΄λΈ μμ±
                movie = Movie.objects.create(
                    movie_id = movies[i].get('id'),
                    title = movies[i].get('title'),
                    overview = movies[i].get('overview'),
                    poster_path =('https://image.tmdb.org/t/p/original'+movies[i].get('poster_path') if movies[i].get('poster_path') else ''),
                    release_date = movies[i].get('release_date'),
                    vote_average = movies[i].get('vote_average'),
                )
                # may-to-many field μ μ₯ λ°©λ².
                for genre_id in movies[i].get("genre_ids") :
                    genre = Genre.objects.get(genre_id=genre_id)
                    movie.genres.add(genre)
                
                # μν μμ±ν  λ, λ°°μ°-κ°λ νμ΄λΈ ν¨κ» λ£κΈ°
                credit_url = f'https://api.themoviedb.org/3/movie/{movie.movie_id}/credits?api_key={API_KEY}&language=ko-KR'
                credits = requests.get(credit_url).json()
                
                cast = credits.get('cast')

                for _actor in cast[:5] :
                    # λ°°μ°λ¦¬μ€νΈμ μκ³ , λ°°μ° deptμ΄λ©΄
                    if not Actor.objects.filter(actor_id=_actor.get('id')).exists() and _actor.get('known_for_department') == 'Acting':
                        actor = Actor.objects.create(
                            actor_id = _actor.get('id'),
                            name = _actor.get('name'),
                            original_name = _actor.get('original_name'),
                            profile_path = ('https://image.tmdb.org/t/p/original'+_actor.get('profile_path') if _actor.get('profile_path') else ''),
                        )
                        actor.movie_act.add(movie)
                    # λ°°μ°λ¦¬μ€νΈμ μμΌλ©΄ mtm κ΄κ³μλ§ λ£μ΄μ£ΌκΈ°
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
                            # νλ‘νμ΄ μλ κ²½μ°κ° μλ€.
                            profile_path =('https://image.tmdb.org/t/p/original'+_director.get('profile_path') if _director.get('profile_path') else ''),
                        )
                        director.movie_direct.add(movie)
                    # κ°λ λ¦¬μ€νΈμ μμΌλ©΄ mtm κ΄κ³μλ§ λ£μ΄μ£ΌκΈ°
                    elif Director.objects.filter(director_id=_director.get('id')).exists() :
                        director = Director.objects.get(director_id=_director.get('id'))
                        director.movie_direct.add(movie)

    return Response({'movie' : 'μνκ°μ Έμ€κΈ° μλ£ λ° λ°°μ°, κ°λ μ μ₯ μλ£'})
```

### INDEX

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa14175f1-2710-44c7-9966-de4da753e6f4%2Findex.gif?table=block&id=9ae6cdd6-9d42-4e30-92da-463e3064b586&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- μ λ°μ μΌλ‘ Vuetifyλ₯Ό μ¬μ©νμ¬ λ μ΄μμ κ΅¬μ±
- λ· λ°°κ²½μ λμμΈ μ»¨μμ particle ν¨κ³Όκ° μ΄μΈλ € vue.js λΌμ΄λΈλ¬λ¦¬ μ¬μ©νμκ³ , μ»¨μ μμμΈ κ²μ μ μ λΆ μΉ νλ μ΄μ§ λ°λ°νμ¬ μλμͺ½μ μ΄μ§ λΆμ λΉμ μ€
- Welcome Textλ background λ°°κ²½ν¨κ³Όλ₯Ό animateνκ³  webkit text fillλ‘ κΈμμ ν¬λͺν¨κ³Ό μ¬μ©
- Vuetify togle bar μ¬μ©νμ¬ nav bar μλ μ¬μ΄νΈλ‘ κ΅¬μ±

### MAIN

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa14175f1-2710-44c7-9966-de4da753e6f4%2Findex.gif?table=block&id=9ae6cdd6-9d42-4e30-92da-463e3064b586&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- Mainμ λ―Έλ‘κ·ΈμΈ μ μν λ¬΄μμ μΆμ², λ‘κ·ΈμΈ μ `[μκ³ λ¦¬μ¦]()` μ΄μ©ν μ¬μ©μ μ·¨ν₯μ λ°μν μν μΆμ²
- carouselμ Vue.js λΌμ΄λΈλ¬λ¦¬ μ΄μ© ν μ νλΈ μ°Έκ³ νμ¬ κ° μ¬λΌμ΄λλ§λ€ νΈλ² μ ν¬λͺ ν  μ μλλ‘ ν¨κ³Ό μ½μ

### MOVIE DETAIL

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fea271fe6-5553-4089-a292-50574565612f%2Fmoviedetail.gif?table=block&id=c5904bda-8ee9-4ff0-9507-0214ce172dd9&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- TMDB APIλ₯Ό μ΄μ© Detail λ³΄κ³  μλ μνμ κ΄λ ¨λ μΆμ² μν νλ¨μ μ½μ ν κ° Imageλ Jquery νμ©νμ¬ λ§μ°μ€ ν¨κ³Ό μ½μ(λ§μ°μ€ λ°©ν₯μ λ°λ₯Έ κ²μ  μ μ΄λ ν¨κ³Ό)
- μν μ°, λ¦¬λ·°μμ±, λ¦¬λ·° μμ , λ¦¬λ·° μ­μ , λ¦¬λ·° μ’μμ, λκΈ μμ± λ° μ­μ  νμ΄μ§ λ¦¬λ‘λ μμ΄ νλ©΄ μμ λ°λ‘ λ°μ κ°λ₯νλλ‘ λ‘μ§ κ΅¬μ±, μμ μ¬ν­ λ°μ μ dbμ λ°λ‘ λ°λ‘ λ°μ
- μνλνμΌ μ°½μμ λ¦¬λ·°λ ν¨κ» λ³΄μ¬ μ€ κ²μ΄λΌ, serializersμ `movie`μ `reviews`λ₯Ό ν¨κ» λ³΄λ΄μΌ ν¨
    - `movie` μ `review`  κ°κ° μ§λ ¬ν μν¨ ν, λμλλ¦¬ ννλ‘ λ¬Άμ΄μ ν΄κ²°

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

- μν μ° μμ΄μ½ ν κΈ μν boolean κ° μ€μ 
    - ν΄λΉ μνλ₯Ό μ’μνλ μ¬λμ΄ μλ¬΄λ μμ κ²½μ°, forλ¬Έμ΄ λμ§ μλ μ΄μ λ°μ
        - ifλ¬ΈμΌλ‘ μ‘°κ±΄μ κ±Έμ΄, ν΄λΉ μνλ₯Ό μ’μνλ μ¬λμ΄ μμ κ²½μ° falseκ°μ μ μ₯νλλ‘ νμ¬ ν΄κ²°.

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
        // μ’μμ μν λ°κΏμ£ΌκΈ°
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

- TMDB APIλ₯Ό νμ©, μν κ²μ ν DRFλ‘ μν λ°μ΄ν° μ μ₯, μ΄ν DRF DBμ μ°λνμ¬ Detail λ³Ό μ μλλ‘ ν¨
- μμ Detailμ Jqeuryλ₯Ό νμ©ν Image ν¨κ³Ό μ¬μ©

### MOVIE BOX OFFICE

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F18fcf398-ef89-4aba-96ba-da8ffcfea155%2Fboxoffice.gif?table=block&id=320dbaaa-ae29-4b72-aaa5-02e6060f78cd&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- κΈ°μ‘΄ μνμ§ν₯μ APIλ₯Ό μ΄μ©νμ¬ νκ΅­ BOX OFFICE μμλ₯Ό κ°μ Έμ€λλ‘ κΈ°ννμμμΌλ, λ°μ΄ν°λ₯Ό μ°λνκ³ λ³΄λ Poster Imageκ° μλ λ¬Έμ  λ°μ
- μ΄ν κ³ν κΈ μ ννμ¬ TMDB APIμ TRENDμμ μν μΆμΆ
μ Searchμ λκ°μ λ°©μμΌλ‘ DRF DBμ μ μ₯ ν Detail λ³Ό μ μλλ‘ μ°κ²°

### MOVIE REVIEW

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff64b12c7-8a2d-4408-abf3-de5d79fcb423%2Fmoviereview.gif?table=block&id=eb154b2c-6bcd-4ca6-9c4b-6b2520c2d086&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- μ΄κ²μ κ² νμ΄ λ§μλ Review
- ν΄λΉ νμ΄μ§μ κ²½μ° κΉλνκ² λμμΈνκΈ°κ° λ§€μ° νλ€μκ³  μ΄λ°μ λ° λ³κ²½ μ¬ν­μ΄ λ§μλ€.
- λν μ΄λ² PROJECTμμ κ°μ₯ λ§μ Componentλ₯Ό κ°μ§κ³ μμ΄μ Data μ°λμλ λ§μ μ΄λ €μμ κ²ͺμ(Vuetify table, comment, review, edit ETC...)
- νΉν, λ¦¬λ·° μμ  μ, κΈ°μ‘΄μ μλ ₯λ κ°μ΄ μ λλ‘ λ€μ΄κ°μ§ μλ μ΄μ λ°μ
    - vue lifeCycleμΈ createdλ₯Ό μ΄μ©νμ¬ dataμ κ° λ£μ΄μ£ΌκΈ° β μ€ν¨
    - dataμ `${}` λ₯Ό μ΄μ©νμ¬ λ°λ‘ ν΄κ²° β μμΈλ‘ κ°λ¨νλ€.

### SIGNUP & LOGIN

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6cc9828f-89a6-41e0-931d-65f5e5e86b3f%2Fsignup.gif?table=block&id=d4b7d548-3bf0-4b2c-a0e9-da2e6108eead&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe8c7cb93-d0f2-4420-8382-da599d5313bf%2Flogin.gif?table=block&id=22bfead8-2cc9-4d7f-b888-45c9a1571d0b&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- Sign up κ³Ό Loginμ κ²½μ° νλ‘μ νΈ μ§ν μ€ μ²« DRFμ μ°λνλ μμμ μ΅μνμ§ λͺ»νμ¬ μλΉν μκ°μ μμν¨
- νΉν, vuexλ₯Ό μ¬μ©νμ¬ λ°μ΄ν° μ°λμ μ€μμ±(νΈμμ±)μ κΉ¨λ¬μμ μ μ¬ν¨. μ΄ν κ±°μ λͺ¨λ  μμμ vuex λͺ¨λνλ₯Ό ν΅ν΄ data μ°λ μμ μ§ν
- λ²νΌ ν¨κ³Όμ λ§μ ν¬μλ₯Ό νμκ³  κ²°κ³Όμ μΌλ‘λ κ½€ μ΄μκ² μ±κ³΅μΌλ‘ λ³΄μ¬μ§λ€. Anchorμ 4κ°μ spanμ λκ³  νλλ¦¬ ν¨κ³Όλ₯Ό μ€ λ€ λ§μ°μ€ νΈλ² μ ν°μμΌλ‘ λ³νλ ν¨κ³Ό μ½μ(codepen μ°Έκ³ )

### PROFILE

![img](https://applause1319.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F88802e71-22c4-46ab-b047-d0634b4560d7%2Fprofile.gif?table=block&id=c363faf4-3f1e-422e-9655-d0142f76559a&spaceId=4c17e30c-1886-4b94-b732-43a91268cc27&userId=&cache=v2)

- μ΄λ―Έμ§ νμΌ μμ  μμ²­(Vue β Django)
    - μ΄λ―Έμ§ νμΌμ νμ€νΈ ννκ° μλ νμΌ ννλ‘ μ μ₯ μμ²­ν΄μΌ ν¨.
        - `FormData` μ μΈ ν, μλ‘λν  νμΌ `append` νμ¬ μ΄λ―Έμ§νμΌ λ°μ΄ν° λ΄κΈ°
    - μμ²­ μ, UnAuthorization μ΄μ λ°μ
        - headersλ₯Ό λμλλ¦¬ ννλ‘ λκ²¨ μ£Όλ κ²μ΄κΈ° λλ¬Έμ `rootState.login.token` μμ `Authorization` κ°μΌλ‘ μ κ·Όνμ¬ μμ²­ μλ£

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

- μ΄λ―Έμ§ νμΌ Vueλ‘ λΆν° λ°κΈ°(Django)
    - νλ‘ν μ¬μ§ μμ μ΄λΌ, putμμ²­μΌλ‘ λ°μλλ°, `request.FILES.get('file')`μμ FILES μμ±μ΄ μλ λ¬Έμ  λ°μ
        - put β post λ‘ μμ νμ¬ ν΄κ²°
    - λ°μμ¨ νμΌμ request.data.getμ΄ μλ request.files.getμΌλ‘ λ°μμΌ ν¨.

```python
@api_view(['POST'])
def editProfileImage(request,user_pk):
    user = get_object_or_404(User, pk=user_pk)
    user.profile_path = request.FILES.get('file')
    if request.user.id==user_pk :
        user.save()
        return Response(status=status.HTTP_201_CREATED)
```

## νκΈ°

> **κΉνν**
> 
- μΆμ² μκ³ λ¦¬μ¦ κ΅¬ν μ, django orm λ¬Έλ²μ΄ μ΅μμΉ μμμ μ΄κΈ° μκ³ λ¦¬μ¦μ μ§λλ° νλ£¨κ° κ±Έλ Έλ€. μΆν dbλ°μ΄ν°λ₯Ό serializer νΌμΌλ‘ λ§λ€μ΄μ λ°μ΄ν°λ₯Ό μ‘°μν  μ μκ² λ€λ μκ°μ΄ λ€μκ³ , μΆμ² μκ³ λ¦¬μ¦μ μκ°λΆν° κ΅¬νκΉμ§ 2μκ° λ§μ λ§λ€μλ€. λ μ’ μ±μ₯ νλ?
- λ°μ΄ν°λ₯Ό λ°μμ€λ μμ²­μ΄ κ½€ μμ΄μ, κ·Έλλ§λ€ λ°μ΄ν°λ₯Ό dbμ μ μ₯μ λ°λ‘ μν€κ³ , vueμμλ λ°λ‘ μ¬μ© ν  μ μλλ‘ λΆλ¬λ΄λ μμμ΄ λ§μλ€. μ°κ²° μν¬ λ λ§λ€ μ΄λ€ λ°μ΄ν°λ₯Ό vueμ μλ°μ΄νΈ λ° μ μ₯ μν¬μ§ ν­μ κ³ λ―Όν΄μΌ νλ μμμ΄ μλΉν κ³ λλ€...ππ
- νλ‘μ νΈ μ€κ°μ serializerλ₯Ό μμ νλ μΌμ΄ λͺ λ² μμλλ° λ°μ΄ν° κ΅¬μ‘°κ° λ¬λΌμ Έμ vueμμ λ°μ΄ν°λ₯Ό μΈ λ, μμ ν΄μΌνλ μν©....λλ¬΄ μ«μ΄μ...γ λ€ κ³ μ³€λ€κ³  μκ°νμ§λ§ μλμΉ μμ κ³³μμ μλ¬κ° μκΎΈ λμ κ³ μνλ€...π€·ββοΈ
- νλ‘μ νΈ μμ μ§μ μ vueλ₯Ό λ°°μμ μ΅μμΉ μμκ³  μ₯κ³ λ..λ°°μ΄μ§ μ€λλΌμ(γ) μ΄λ»κ² ν΄μΌνλ μ‘°κΈ λ§λ§νλ€. κ·Έλλ νλ£¨νλ£¨. νλ¦¬μ§ μμ κ² κ°λ κ²λ€μ **κΉλΆ μμ€μμ€μ**κ³Ό κ΅¬κΈκ³Ό κ³΅μλ¬Έμλ₯Ό ν΅ν΄ ν΄κ²°ν΄λκ°λ€.
- μμ¬μ΄ μ 
    - μ ν¨μ± κ²μ¦μμ μν©μ μΈλΆν μμΌ κ²μ¦ν΄μΌνλλ° , κ·Έ λΆλΆμ μμ΄μλ μμ§ λ―Έν‘ν λ― νλ€.
    - νκ²½λ³μ μ€μ  λͺ»ν¨. μμ€ν κ°μΈμ λ³΄ μ§μΌμΌν©λλ€. μ΄ λΆλΆμ  νλ‘μ νΈ λλκ³  λ°λ‘ κ΅¬νν  μμ μ΄λ€.

> **λ°μμ€**πΆ
> 
- μμ£Ό λ§€μ° νλ  μ¬μ μ΄μλ€.
- μ²« μμ μ  μΌλ € λ° κΈ°λ λ°μΌλ‘ μμν μ²« νλ‘μ νΈλ₯Ό μκ°λ³΄λ€(λ΄ κΈ°μ€-*μ λ λ§μ‘±μ€λ¬μ΄λ°μ?(νν)*) κ΄μ°?κ² μμ±νλ―νμ¬ κΈ°λΆμ΄ μ’λ€
- μ΄λ² κ²½νμ ν΅ν΄ λ§μ μκ°μ νκ²λμλ€.
    - κΈ°ν
        - ννμ΄μ κΈ°νμ κ½€ λ§μ μκ°μ ν¬μνμλ€. μ΄λ‘ μΈν΄ λ¬΄μΈκ° λ¬Έμ κ° μκ²ΌλλΌλ μμ λ§λ€μλ κΈ°νλ€(ERD, Prototype λ±)μ λ€μ μ κ²νκ³  μμ νλ©΄μ λ§μ μκ° λ¨μΆνμλ€.
    - μν΅
        - νλ£¨μ μ²«κ³Ό λμ ν­μ μ΄μΌκΈ° λλκ³  μλ‘ νΌλλ°±νλ μκ°μ κ°μ§μΌλ‘ μ€κ°μ μμ¬ μν΅μ΄ μμ΄ κΌ¬μ΄λ κ²½μ°κ° λ§μ΄ μμλ€.
    - ν΄
        - νλ‘μ νΈ μμ μ  ν΄λ€μ λν΄ λ§μ΄ κ³΅λΆνμκ³  JIRAλ₯Ό μ¬μ©νκ³  μΆμμΌλ μκ°λ³΄λ€ μ¬μ©νκΈ° νλ€μ΄μ μ μΈμμΌ°λ€. μΆν JIRAλ₯Ό κ³΅λΆνμ¬ νλ‘μ νΈ μ μ¬μ©ν΄λ³΄κ³ μΆλ€.
    - κ³΅μλ¬Έμ
        - κ³΅μλ¬Έμμ μ λ§ λ§μ λΆλΆμ΄ μλ€. λͺ¨λ₯΄λ©΄ μΌλ¨ κ³΅μλ¬Έμ νμΈκ³Ό StackOverFlow μ¬μ΄νΈλ₯Ό μ κ·Ή νμ©νμ.
- μμ¬μ΄ μ 
    - λλ Front μμ£Όλ‘ μ§ννμλλ° μκ°λ³΄λ€ μ‘°κΈ λ§νλ λΆλΆλ λ§μκΈ°μ μΆν JSλ₯Ό λΉλ‘― κ³΅λΆκ° μκΈνλ€.
    - κ·Όλ° Front λΏλ§ μλλΌ Back λΆλΆ λν λ§μ°¬κ°μ§λ€. μλ‘ λΆμνμ¬ μ§ννλ©΄μ Back λΆλΆμ λ§μ΄ λΆμ‘±ν¨μ λκΌκ³  μ²μλΆν° μ°¨κ·Όν μ΄ν΄λ΄μΌκ² λ€.