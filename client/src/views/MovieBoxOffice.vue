<template>
  <!-- <div class="img-box">
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
  </div> -->
  <div class="img-box">
    <div class="real-box">
      <span style="--i:1">
        <figure class="hover-effect">
          <img :src="trend_1">
            <figcaption>
              <h3>Title</h3>
              <h5>OverView</h5>
            </figcaption>
          <a href="#"></a>
        </figure>
      </span>
      <span style="--i:2">
        <figure class="hover-effect">
          <img :src="trend_2">
            <figcaption>
              <h3>Title</h3>
              <h5>OverView</h5>
            </figcaption>
          <a href="#"></a>
        </figure>
      </span>
      <span style="--i:3">
        <figure class="hover-effect">
          <img :src="trend_3">
            <figcaption>
              <h3>Title</h3>
              <h5>OverView</h5>
            </figcaption>
          <a href="#"></a>
        </figure>
      </span>
      <span style="--i:4">
        <figure class="hover-effect">
          <img :src="trend_4">
            <figcaption>
              <h3>Title</h3>
              <h5>OverView</h5>
            </figcaption>
          <a href="#"></a>
        </figure>
      </span>
      <span style="--i:5">
        <figure class="hover-effect">
          <img :src="trend_5">
            <figcaption>
              <h3>Title</h3>
              <h5>OverView</h5>
            </figcaption>
          <a href="#"></a>
        </figure>
      </span>
      <span style="--i:6">
        <figure class="hover-effect">
          <img :src="trend_6">
            <figcaption>
              <h3>Title</h3>
              <h5>OverView</h5>
            </figcaption>
          <a href="#"></a>
        </figure>
      </span>
      <span style="--i:7">
        <figure class="hover-effect">
          <img :src="trend_7">
            <figcaption>
              <h3>Title</h3>
              <h5>OverView</h5>
            </figcaption>
          <a href="#"></a>
        </figure>
      </span>
      <span style="--i:8">
        <figure class="hover-effect">
          <img :src="trend_8">
            <figcaption>
              <h3>Title</h3>
              <h5>OverView</h5>
            </figcaption>
          <a href="#"></a>
        </figure>
      </span>
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
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro);
.hover-effect {
  font-family: 'Source Sans Pro', sans-serif;
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 160px;
  max-width: 100px;
  width: 100%;
  color: #000000;
  text-align: left;
  font-size: 16px;
  background-color: #fff;
}

.hover-effect * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.45s ease;
  transition: all 0.45s ease;
}

.hover-effect img {
  vertical-align: top;
  max-width: 100%;
  backface-visibility: hidden;
}

.hover-effect figcaption {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hover-effect h3,
.hover-effect h5 {
  margin: 0;
  opacity: 0;
  letter-spacing: 1px;
}

.hover-effect h3 {
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
  text-transform: uppercase;
  font-weight: 400;
}

.hover-effect h5 {
  font-weight: normal;
  font-style: italic;
  color: #888;
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
}

.hover-effect a {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.hover-effect:hover > img,
.hover-effect.hover > img {
  opacity: 0.1;
}

.hover-effect:hover h3,
.hover-effect.hover h3,
.hover-effect:hover h5,
.hover-effect.hover h5 {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}

  img {
    /* width: 200px;
    height: 200px; */
  }
  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
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
    position: relative;
    top: 0;
    left: 0;
    widows: 100%;
    height: 100%;
    object-fit: cover;
    
  }

</style>