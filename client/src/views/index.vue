<template>
  <v-app>
    <a @click="enterMain" style="z-index: 1;">
      <div class="main-img d-flex justify-center">
      <v-img 
        max-width="75%" height="70%"
        src="@/assets/main_test.jpg"
        ></v-img>
    </div></a>
  </v-app>

</template>

<script>
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