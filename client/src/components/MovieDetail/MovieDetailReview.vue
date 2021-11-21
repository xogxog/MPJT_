<template>
  <v-dialog v-model="show" width="50%">
    <v-card>

      <v-card-title>
        <span class="text-h5">리뷰 보는 모달 영화 제목</span>
      </v-card-title>
      <v-card-text>
        작성자 : 박상준
      </v-card-text>
      <v-card-text>
        이거 리뷰 내용
      </v-card-text>


      <v-card-actions>
        <v-btn flat text @click.stop="show=false">Close</v-btn>
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