<template>
  <div class="img-box">
    <div class="real-box">
    <span style="--i:1"><a href=""><img :src="trend_1"></a></span>
    <span style="--i:2"><a href=""><img :src="trend_2"></a></span>
    <span style="--i:3"><a href=""><img :src="trend_3"></a></span>
    <span style="--i:4"><a href=""><img :src="trend_4"></a></span>
    <span style="--i:5"><a href=""><img :src="trend_5"></a></span>
    <span style="--i:6"><a href=""><img :src="trend_6"></a></span>
    <span style="--i:7"><a href=""><img :src="trend_7"></a></span>
    <span style="--i:8"><a href=""><img :src="trend_8"></a></span>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MovieBoxOffice',
  data : function(){
    return{
      trend_1 : null,
      trend_2 : null,
      trend_3 : null,
      trend_4 : null,
      trend_5 : null,
      trend_6 : null,
      trend_7 : null,
      trend_8 : null,
      // trend_9 : null,
      // trend_10 : null,
    }
  },
  created :function(){
    // 환경변수로 숨기기
    const API_KEY='33e4ef19e015d915281ddd6881f93178'
    axios({
      method : 'get',
      url : `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    })
      .then((res)=>{
        console.log(res.data.results)
        this.trend_1 = "https://image.tmdb.org/t/p/original"+res.data.results[0].poster_path
        this.trend_2 = "https://image.tmdb.org/t/p/original"+res.data.results[1].poster_path
        this.trend_3 = "https://image.tmdb.org/t/p/original"+res.data.results[2].poster_path
        this.trend_4 = "https://image.tmdb.org/t/p/original"+res.data.results[3].poster_path
        this.trend_5 = "https://image.tmdb.org/t/p/original"+res.data.results[4].poster_path
        this.trend_6 = "https://image.tmdb.org/t/p/original"+res.data.results[5].poster_path
        this.trend_7 = "https://image.tmdb.org/t/p/original"+res.data.results[6].poster_path
        this.trend_8 = "https://image.tmdb.org/t/p/original"+res.data.results[7].poster_path
        this.$store.dispatch('saveMovies/saveMovies',res.data.results)
      })

  }
}
</script>

<style scoped>
  img {
    /* width: 200px;
    height: 200px; */
  }
  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    /* background: #000f; */
  }
  .real-box {
    position: relative;
    width: 230px;
    height: 230px;
    transform-style: preserve-3d;
    animation: animate 30s linear infinite;
  }

  @keyframes animate
  {
    0%
    {
      transform: perspective(1000px) rotateY(0deg);
    }
    100%
    {
      transform: perspective(1000px) rotateY(360deg);
    }
  }


  .real-box span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: center;
    transform-style: preserve-3d;
    transform: rotateY(calc(var(--i) * 45deg )) translateZ(400px);
    -webkit-box-reflect: below 0px linear-gradient(transparent, transparent, #0008);
  }

  .real-box span img {
    position: absolute;
    top: 0;
    left: 0;
    widows: 100%;
    height: 100%;
    object-fit: cover;
    
  }

</style>