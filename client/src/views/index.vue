<template>
  <div>
    <div class="welcome">
      <p>Moive Project SangJune & TaeHyun</p>
    </div>
    <a @click="enterMain" style="z-index: 1;">
      <div class="index-img d-flex justify-center">
      <v-img
        max-width="60%" height="55%"
        src="@/assets/index_test.jpg"
        ></v-img>
    </div></a>
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
  .index-img {
    padding-top: 3%;
  }

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

</style>