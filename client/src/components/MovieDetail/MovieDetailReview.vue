<template>
  <v-dialog v-model="show" width="50%">
    <v-card class="container">

      <v-card-title class="">
        <span class="text-h5">리뷰 title</span>
      </v-card-title>
      <v-card-subtitle class="float-left">
        (영화 제목)
      </v-card-subtitle>
      <v-divider></v-divider>
      <div class="container d-flex justify-content-between">
        <div class="grey--text">글쓴이 : 내다</div>
        <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
      </div>
      <v-divider></v-divider>
      <v-card-text>
        review content 123123
      </v-card-text>
      <v-divider></v-divider>

      <v-form ref="form" class="container align-self-end">
        <div class="d-flex">
        <v-text-field label="comment"></v-text-field>
            <v-btn
      class="mx-1"
      fab
      dark
      color="indigo"
      small
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
    </div>
      </v-form>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                NickName
              </th>
              <th class="text-left">
                content
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-card-actions>
        <div class="d-flex">
          <v-btn flat text @click.stop="show=false">Close</v-btn>
          <v-btn flat text>Edit</v-btn>
          <v-btn flat text>Delete</v-btn>
        </div>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      value: Boolean
    },
    computed: {
      show: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>