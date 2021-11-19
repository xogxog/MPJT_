<template>
  <article id="movie-detail-content" class="container">
    <div class="d-flex">
      <div class="">
        <v-img height="500px" contain src="@/assets/dune_poster.jpg" alt="poster"></v-img>
        <v-divider></v-divider>
        <v-card class="d-flex" style="background: rgba(255, 255, 255, 0.5); margin: 0 15%;">
          <v-card-text style="color: white;">평균 점수: 10.00</v-card-text>
          <v-card-text style="color: white;">개봉일 : 2021.11.11</v-card-text>
        </v-card>
      </div>
      <div class="title-detail container">
        <div class="content-box">
          <div class="Title">
            <v-banner class="text-white justify-center text-h5 font-weight-light"
              style="background: rgba(255, 255, 255, 0.5)" sticky>
              Title
            </v-banner>
            <v-divider></v-divider>
            <v-card style="background: rgba(255, 255, 255, 0.5);">
            </v-card>
            <v-card v-scroll.self="onScroll" class="overflow-y-auto" height="268px"
              style="background: rgba(255, 255, 255, 0.5);">

              <v-card-text>
                <div class="mb-4 text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi commodi earum tenetur. Asperiores
                  dolorem placeat ab nobis iusto culpa, autem molestias molestiae quidem pariatur. Debitis beatae
                  expedita nam facere perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
                  ducimus cupiditate rerum officiis consequuntur laborum doloremque quaerat ipsa voluptates, nobis nam
                  quis nulla ullam at corporis, similique ratione quasi illo!
                </div>
              </v-card-text>
            </v-card>
          </div>
          <v-divider></v-divider>
          <v-card class="d-flex justify-content-evenly text-white"
            style="background: rgba(255, 255, 255, 0.5); padding-bottom: 4px;">
            <div class="actor">배우
              <v-divider></v-divider>
              <p>나는 배우</p>
            </div>
            <v-divider vertical></v-divider>
            <div class="director">감독
              <v-divider></v-divider>
              <p>나는 감독</p>
            </div>
          </v-card>
          <v-divider></v-divider>
          <v-card class="d-flex" style="background: rgba(255, 255, 255, 0.5);">

          </v-card>

        </div>
      </div>
    </div>

  </article>
</template>

<script>
  export default {
    name: 'MovieDetailContent',

  }
</script>

<style scoped>
  #movie-detail-content {
    color: white;
  }

  .text-white {
    color: white;
  }

  .default-background {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .movie-poster {}

  .movie-poster img {
    width: 100%;
    height: 100%;
  }

  .title-detail {}

  .actor .director {
    width: 50%;
  }
</style>