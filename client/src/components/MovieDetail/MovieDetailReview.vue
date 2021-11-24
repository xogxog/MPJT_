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
        <div class="grey--text">글쓴이 : <a href="#" @click="openAnotherUserProfile(reviewDetail.user.id, $event)">{{reviewDetail.user.nickname}}</a></div>
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
      <!-- comment 다는 곳 -->
      <v-form ref="form" class="container align-self-end" @submit.prevent="createComment">
        <div class="d-flex">
        <v-text-field label="comment" v-model="comment"></v-text-field>
            <v-btn
              class="mx-1"
              fab
              dark
              color="indigo"
              small
              >
          <v-icon dark @click="createComment">
            mdi-plus
          </v-icon>
        </v-btn>
        </div>
      </v-form>
      
      <v-simple-table>
      <!-- <v-simple-table v-scroll.self="onScroll" height="268px"> -->
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                NickName
              </th>
              <th class="text-left">
                comment
              </th>
              <th class="text-left">
                delete
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- 이거뭐야,,,,? -->
            <!-- comment 자리 -->
            <tr v-for="comment in comments" :key="comment.id">
              <td>{{ comment.user.nickname }}</td>
              <td>{{ comment.comment }}</td>
              <!-- 삭제버튼 -->
              <td>
                <div v-if="comment.user.nickname==userInfo.nickname" @click="deleteComment(comment)">
                  <v-btn
                    elevation="2"
                    x-small
                    icon
                    color="pink"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="text-center">
        <!-- 댓글 페이지네이션 구현하기 -->
        <!-- <v-pagination
          v-model="page"
          :length="4"
          circle
        ></v-pagination> -->
      </div>
      <v-card-actions>
        <div class="d-flex">
          <v-btn text @click="show=false">Close</v-btn>
          <div v-if="reviewDetail.user.id==userInfo.id">
            <v-btn text @click="reviewEditOpen=true">Edit</v-btn>
            <v-btn text @click="deleteReview">Delete</v-btn>
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
      comment:null,
      reviewEditOpen:false,
    }
  },
  components: { 
    MovieReviewEdit 
  },
  props: {
    value: Boolean,
  },
  methods: {
    openAnotherUserProfile : function(otherUserPk, event){
      event.preventDefault()
      this.$store.dispatch('login/getOtherUserInfo',otherUserPk)
      this.$router.push({name : 'Profile'})
    },
    deleteReview:function(){
      let reviewPk = this.reviewDetail.id
      this.$store.dispatch('review/deleteReview',reviewPk)
      location.reload()
    },
    createComment : function(event){
      event.preventDefault()
      let commentData = {
        'reviewPk' :this.reviewDetail.id,
        'comment' : this.comment
      }
      this.$store.dispatch('comment/createComment',commentData)
      this.comment = null
    },
    deleteComment : function(comment){
      this.$store.dispatch('comment/deleteComment', comment)
    }
  },
  computed: {
    ...mapState('review', ['reviewDetail']),
    ...mapState('comment', ['comments']),
    ...mapState('login', ['userInfo']),
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