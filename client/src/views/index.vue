<template>
  <div>
    <a @click="enterMain" style="z-index: 1;">
      <div class="index-img d-flex justify-center">
      <v-img 
        max-width="75%" height="70%"
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

<style>

</style>