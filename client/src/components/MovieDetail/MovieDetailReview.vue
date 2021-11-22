<template>
  <v-dialog v-model="show" width="50%">
    <v-card class="container">

      <v-card-title class="">
        <span class="text-h5">{{reviewDetail.title}} <br></span>
      </v-card-title>
      <v-card-subtitle class="float-left">
        {{reviewDetail.movie.title}}
      </v-card-subtitle>
      <v-divider></v-divider>
      <div class="container d-flex justify-content-between">
        <div class="grey--text">글쓴이 : {{reviewDetail.user.nickname}}</div>
        <v-rating :value="reviewDetail.rank" color="amber" dense half-increments readonly size="14"></v-rating>
      </div>
      <!-- 오른쪽으로 보내줘요............................ -->
      <div class="container align-self-end">
        <div class="d-flex grey--text">{{reviewDetail.updated_at}}</div>
      </div>
      <v-divider></v-divider>
      <v-card-text>
        {{reviewDetail.content}}
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
            <!-- 이거뭐야,,,,? -->
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
          <div v-if="reviewDetail.user.nickname==nickname">
            <v-btn flat text @click.stop="reviewEditOpen=true">Edit</v-btn>
            <v-btn flat text>Delete</v-btn>
          </div>
        </div>
      </v-card-actions>

    </v-card>
    <MovieReviewEdit
      v-model="reviewEditOpen"
    ></MovieReviewEdit>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'
import MovieReviewEdit from './MovieReviewEdit.vue'
  export default {
  name: 'MovieDetailReview',
  data : function(){
    return{
      reviewEditOpen:false,
    }
  },
  components: { 
    MovieReviewEdit 
  },
  props: {
    value: Boolean,
  },
  computed: {
    ...mapState('review', ['reviewDetail']),
    ...mapState('login', ['nickname']),
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