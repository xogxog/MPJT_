<template>
<div>
  <v-container style="z-index: 99;">
    <v-row justify="space-around">
      <v-card width="80%" max-width="900px" style="background: rgba(255, 255, 255, 0.5);">
        <v-img
          height="150px"
          src="https://source.unsplash.com/category/nature/"
          style="overflow: visible; margin-top: 15px"
        >

          <v-avatar size="100" style="top: 60%;" rounded>
            <img
              alt="user"
              src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
            >
          </v-avatar>
        </v-img>
        <br><br>
        <v-title><h2>User Name</h2></v-title>


      </v-card>
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  name: "Profile",


}
</script>

<style>

</style>