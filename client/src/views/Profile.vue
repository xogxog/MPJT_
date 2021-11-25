<template>
  <div>
    <v-row justify="space-around">
      <v-card width="80%" max-width="600px" style="background: rgba(255, 255, 255, 0.5); padding-bottom: 12px;">
        <v-img height="150px" src="https://source.unsplash.com/category/nature/900x200"
          style="overflow: visible; margin-top: 15px">
          <div v-if="userProfile.id==userInfo.id" class="d-flex justify-content-end ma-1" >
            <v-btn small @click="EditProfileOpen=true" style="background: rgba(255, 255, 255, 0.8);">Edit</v-btn>
          </div>
          <v-avatar size="100" style="top: 40%; left: 0%;" rounded>
            <img alt="user" :src="`http://127.0.0.1:8000${userProfile.profile_path}`">
          </v-avatar>
        </v-img>
        <br><br><br>
        <v-title>
          <h2>{{userProfile.nickname}}</h2>
        </v-title>
        <div class="text-center">
        <div v-if="userProfile.id!==userInfo.id">
          <v-btn rounded color="primary" dark @click="followUnFollow" v-if="user_like_unlike">
            unfollow
          </v-btn>
          <v-btn rounded color="primary" dark @click="followUnFollow" v-else>
            follow
          </v-btn>
        </div>
  </div>
        <br>
        <v-divider></v-divider>
        <div class="d-flex justify-content-around">
          <div class="flex-column tbx">
            <h4>영화</h4>
            <h5>{{userProfile.like_movies.length}}</h5>
          </div>

          <div class="flex-column tbx">
            <h4>팔로잉</h4>
            <h5>{{userProfile.followings.length}}</h5>
          </div>
          <div class="flex-column tbx">
            <h4>팔로워</h4>
            <h5>{{userProfile.followers.length}}</h5>

          </div>
        </div>
        <v-divider></v-divider>

        <br>
        <div class="warp container d-flex justify-content-around">
          <div class="card" v-for="like_movie in userProfile.like_movies" :key="like_movie.movie_id"
            @click="movieDetail(like_movie.movie_id)">
            <span></span>
            <div class="imgBx"><img :src="like_movie.poster_path"></div>
            <div class="content">
              <div class="content">
                <h4>{{like_movie.title}}</h4>
                <!-- <p>Overview</p> -->
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-row>
    <EditProfile v-model="EditProfileOpen"></EditProfile>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

import EditProfile from '@/components/EditProfile.vue'

  export default {
    name: "Profile",
    data: function () {
      return {
        EditProfileOpen: false,
      }
    },
    components: {
      EditProfile,
    },
    methods:{
      followUnFollow:function(){
        console.log(this.user_like_unlike)
        this.$store.dispatch('profile/likeUnlikeUser',this.userProfile.id)
      },
      movieDetail: function (movieid) {
        let movieId = movieid
        this.$store.dispatch('getMovieDetail/setMovieId', movieId)
        this.$router.push({
          name: 'MovieDetail'
        })
      }
    },
    computed:{
      ...mapState('login', ['userProfile','userInfo','user_like_unlike']),
    },
    created:function(){
      // console.log(this.userProfile)
      $(document).ready(function(x, y) {
      $('.card').on('mouseenter', function(e){
        x = e.pageX - $(this).offset().left,
        y = e.pageY - $(this).offset().top;
        $(this).find('span').css({top:y, left:x})
      })
      $('.card').on('mouseout', function(e){
        x = e.pageX - $(this).offset().left,
        y = e.pageY - $(this).offset().top;
        $(this).find('span').css({top:y, left:x})
      })
    })
    }

  }
</script>

<style scoped>
  .tbx {
    width: 30%;
  }

  .cnt-box {
    width: 20%;
    padding-top: 6px;
  }

  .warp {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .warp .card {
    position: relative;
    width: 200px;
    height: 300px;
    margin: 10px;
    overflow: hidden;
  }

  .warp .card span {
    position: absolute;
    display: block;
    width: 0px;
    height: 0px;
    transform: translate(-50%, -50%);
    transition: width 0.8s, height 0.8s;
    border-radius: 50%;
    z-index: 1;
    opacity: 0.95;
    background: rgba(0, 0, 0, 0.7);
  }

  .warp .card:hover span{
    width: 2000px;
    height: 2000px;
  }

  .warp .card .imgBx{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .warp .card .imgBx img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .warp .card .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* display: flex; */
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .warp .card .content div {
    padding: 40px;
    color: #fff;
    visibility: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: 0.2s;
  }
  .warp .card:hover .content div {
    visibility: visible;
    opacity: 1;
    transform: translateY(0px);
  }

</style>