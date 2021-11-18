import requests

def getMovie() :
    API_KEY = '33e4ef19e015d915281ddd6881f93178'
    url = f'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&page=1&language=ko-KR' #영화


    
    movie_list = requests.get(url).json()
    movies = movie_list.get('results')
    for i in range(0,20):
        movie_id = movies[i].get('id')
        title = movies[i].get('title')
        overview = movies[i].get('overview')
        poster_path = movies[i].get('poster_path')
        release_date = movies[i].get('release_date')
        genre_id = movies[i].get('genre_ids')
        print(movie_id, title, genre_id)

    # return movie_list.get('results')[0].get('title')

print(getMovie())


# def getGenre() :
#     API_KEY = '33e4ef19e015d915281ddd6881f93178'

#     url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={API_KEY}&language=ko-KR' #장르

#     genre_list = requests.get(url).json()
#     genres = genre_list.get('genres')
#     for i in range(0,19) :
#         id = genres[i].get('id')
#         name = genres[i].get('name')
#         print(id, name)


#     return id, name