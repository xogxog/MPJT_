<template>
  <div>
    <div class="welcome">
      <p>Moive Project SangJune & TaeHyun</p>
    </div>
    <!-- <div class="">
      <a @click="enterMain" style="z-index: 1;">
        <div class="index-img justify-content-center">
          <v-img
            max-width="60%" height="55%"
            src="@/assets/index_test.jpg"
            ></v-img>
          <div class="content">
            <h2>Welcom</h2>
            <p>Enjoy with your Movie</p>
          </div>
        </div>
      </a>
    </div> -->
    <a @click="enterMain" style="z-index: 1;">
    <div class="wrapper d-flex">
      <div class="container d-flex justify-content-center">
        <div class="box">
          <div class="imgBx">
            <img src="@/assets/index_test.jpg">
          </div>
          <div class="content" style="color: white;">
            <div class="">
              <h1>Welcome! Enjoy with your Movie</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    </a>
  </div>
  

</template>

<script>
  document.title = "MPJT";

export default {

  name: "index",

  methods: {
    enterMain: function(event) {
      event.preventDefault();
      this.$router.push({ name: "Main" })
    }
  }

}
</script>

<style scoped>
  /* .index-img {
    padding-top: 3%;
  } */

  .welcome {
    z-index: 999;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .welcome p {
    position: relative;
    font-family: sans-serif;
    /* color: white; */
    text-transform: uppercase;
    font-size: 2em;
    letter-spacing: 4px;
    overflow: hidden;
    background: linear-gradient(90deg, #000, #fff, #000);
    background-repeat: no-repeat;
    background-size: 70%;
    animation: animate 4s linear infinite;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
    -webkit-background-clip: text;
  }

  @keyframes animate
  {
    0%
    {
      background-position: -400%;
    }
    100%
    {
      background-position: 300%;
    }
  }

  .wrapper {
    justify-content: center;
    align-items: center;
    height: 55vh;
  }
  /* .container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  } */
  .container .box {
    max-width: 800px;
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
    transition: 0.5s;
  }
  .container .box:hover {
    z-index: 1;
    transform: scale(1.25);
    box-shadow: 0 25px 40px rgba(0, 0, 0, 0.5);
  }
  .container .box .imgBx {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .container .box .imgBx:before {
    z-index: 1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(59, 59, 59, 0.9), rgba(155, 155, 155, 0.9));
    mix-blend-mode: multiply;
    opacity: 0;
    transition: 0.5s;
  }
  .container .box:hover .imgBx:before {
    opacity: 1;
  }
  
  .container .box .imgBx img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .container .box .content {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    padding: 20px;
    align-items: flex-end;
  }
  .container .box .content h1 {
    color: #fff;
    transition: 0.5s;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-size: 20px;
    transform: translateY(200px);
  }
  .container .box:hover .content h1 {
    transform: translateY(0);
    transition-delay: 0.6s;
  }
  .container .box .content p {
    color: #fff;
    transform: translateY(200px);
    transition: 0.5s;
    font-size: 14px;
  }
  .container .box:hover .content p {
    color: #fff;
    transform: translateY(0);
    transition: 0.7s;
  }


</style>