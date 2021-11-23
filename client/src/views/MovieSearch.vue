<template>
  <div class="container">
    <v-form class="container">
      <div class="d-flex">
        <v-text-field dark rounded background-color="rgba(255, 255, 255, 0.5)" filled v-model="searchString"
          label="Movie Search" clearable>
        </v-text-field>
        <v-btn class="mx-2" fab dark color="rgba(255, 255, 255, 0.5)">
          <v-icon dark>
            search
          </v-icon>
        </v-btn>
      </div>
    </v-form>

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
      <div class="card">
        <span></span>
        <div class="imgBx"><img src="@/assets/dune_poster.jpg"></div>
        <div class="content">
          <div class="content">
            <h2>Title</h2>
            <p>Overview</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

  export default {
    name: "MovieSearch",

  }

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

  // export function imgHover (x, y) {

  // }
</script>

<style>
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




  .v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
    transform: none;
  }
</style>