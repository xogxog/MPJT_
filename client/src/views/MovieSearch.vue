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

    
  </div>
</template>

<script>
  export default {
    name: "MovieSearch",

  }
</script>

<style>
  .v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
    transform: none;
  }
</style>