<template>
  <div>
    <div class="d-flex flex-end">
      <v-btn
      class="mx-2"
      fab
      dark
      @click.stop="drawer = !drawer">
      <v-icon dark>
        mdi-format-list-bulleted-square
      </v-icon>
    </v-btn>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      right
      absolute
      temporary
      dark
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Sang June</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-autocomplete
          label="Search"
          dense
          filled
          rounded
        ></v-autocomplete>
      </v-list-item>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'NavToggle',
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },
        ],
      }
    },
  }
</script>

<style>

</style>