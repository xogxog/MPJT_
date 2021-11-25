<template>
  <v-dialog v-model="show" width="50%" max-width="450px">
    <v-card>

      <v-card-title>
        <span class="text-h5">리뷰 작성</span>
      </v-card-title>
      <v-rating color="warning" background-color="grey" hover length="5" size="40" v-model="rank"></v-rating>
      <div class="container">
        <v-form ref="form" @submit.prevent>
          <v-text-field label="Title" required v-model="title"></v-text-field>
          <v-textarea label="Content" v-model="content"></v-textarea>
        </v-form>

        <v-card-actions>
          <v-btn flat text @click="createReview " :show="showOrNotshow">Write</v-btn>
          <v-btn text flat @click="resetForm">Reset</v-btn>
          <v-btn flat text @click.stop="show=false">Close</v-btn>
        </v-card-actions>
      </div>
    </v-card>

  </v-dialog>
</template>

<script>

  export default {
    props: {
      value: Boolean,
      movieId: Number,
    },
    data :function(){
      return{
        showOrNotshow : false,
        title : null,
        content :null,
        rank : 5,
      }
    },
    methods: {
      createReview : function (){
        this.show=true
        let reviewData = {
          'movieId' : this.movieId,
          'title' : this.title,
          'content' : this.content,
          'rank' : this.rank,
        }
        if(reviewData.title && reviewData.content){
          this.$store.dispatch('review/createReview',reviewData)
          this.show=false
          this.title=null
          this.content=null
          // location.reload()
        }else{
          alert('리뷰 제목 및 내용을 작성하세요.')
        }

      },
      resetForm : function () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
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