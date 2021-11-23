<template>
  <div>
    <v-row justify="space-around">
      <v-card width="80%" max-width="900px" style="background: rgba(255, 255, 255, 0.5); padding-bottom: 12px;">
        <v-img height="150px" src="https://source.unsplash.com/category/nature/900x200"
          style="overflow: visible; margin-top: 15px">

          <v-avatar size="100" style="top: 60%;" rounded>
            <img alt="user" src="@/assets/profile_test.jpg">
          </v-avatar>
        </v-img>
        <br><br><br>
        <v-title>
          <h2>User Name</h2>
        </v-title>
        <br>
        <v-divider></v-divider>
          <div class="d-flex justify-content-around">
              <div class="flex-column">
                <h4>영화 찜</h4>
                <h5>123개</h5>
              </div>

              <div class="flex-column">
                <h4>팔로우</h4>
                <h5>123명</h5>
              </div>
              <div class="flex-column">
                <h4>팔로워</h4>
                <h5>123명</h5>
              </div>
          </div>
        <v-divider></v-divider>

        <br>
          <div class="warp container d-flex justify-content-around">
            <div class="card">
              <span></span>
              <div class="imgBx"><img src="@/assets/dune_poster.jpg"></div>
              <div class="content">
                <div class="content">
                  <h1>Title</h1>
                  <p>Overview</p>
                </div>
              </div>
            </div>

            <div class="card">
              <span></span>
              <div class="imgBx"><img src="@/assets/dune_poster.jpg"></div>
              <div class="content">
                <div class="content">
                  <h1>Title</h1>
                  <p>Overview</p>
                </div>
              </div>
            </div>
            <div class="card">
              <span></span>
              <div class="imgBx"><img src="@/assets/dune_poster.jpg"></div>
              <div class="content">
                <div class="content">
                  <h1>Title</h1>
                  <p>Overview</p>
                </div>
              </div>
            </div>
            <div class="card">
              <span></span>
              <div class="imgBx"><img src="@/assets/dune_poster.jpg"></div>
              <div class="content">
                <div class="content">
                  <h1>Title</h1>
                  <p>Overview</p>
                </div>
              </div>
            </div>
          </div>

      </v-card>
    </v-row>
  </div>
</template>

<script>
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

  export default {
    name: "Profile",
    created:function(){
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

<style>
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
    margin: 0px;
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