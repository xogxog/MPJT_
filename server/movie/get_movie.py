import requests

def getMovie() :
    API_KEY = '33e4ef19e015d915281ddd6881f93178'
    url = f'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&page=1&language=ko-KR'
    
    movie_list = requests.get(url).json()
    movies = movie_list.get('results')
    for i in range(0,20):
        title = movies[i].get('title')
        overview = movies[i].get('overview')
        poster_path = movies[i].get('poster_path')
        release_date = movies[i].get('release_date')



    return movie_list.get('results')[0].get('title')

print(getMovie())