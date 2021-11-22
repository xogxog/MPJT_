<template>
  <v-dialog v-model="show" width="50%">
    <v-card>

      <v-card-title>
        <span class="text-h5">리뷰 수정</span>
      </v-card-title>
      <v-rating color="warning" background-color="grey" hover length="5" size="40" v-model="rank"></v-rating>
      <div class="container">
        <v-form ref="form">
          <v-text-field label="Title" required v-model="title"></v-text-field>
          <v-textarea label="Content" v-model="content"></v-textarea>
        </v-form>

        <v-card-actions>
          <v-btn flat text @click="createReview">Write {{title}}</v-btn>
          <v-btn text flat @click="resetForm">Reset</v-btn>
          <v-btn flat text @click.stop="show=false">Close</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name : 'MovieReviewEdit',
    props: {
      value: Boolean,
    },
    data :function(){
      return{
        title : this.reviewDetail.title,
        content :this.reviewDetail.content,
        rank : this.reviewDetail.rank,
      }
    },
    methods: {
      createReview : function (){
        let reviewData = {
          'title' : this.title,
          'content' : this.content,
          'rank' : this.rank,
        }
        this.$store.dispatch('review/createReview',reviewData)
        // location.reload()
      },
      resetForm : function () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
    },
    computed: {
      ...mapState('review', ['reviewDetail']),
      // 상준상코드 
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