<template>
  <v-dialog v-model="show" width="50%" max-width="300px">
    <v-card>

      <v-card-title class="d-flex justify-center">
        <span class="text-h5 align-center">팔로윙</span>
      </v-card-title>
      <v-card-text class="text-body-1" style="color: black">
        <p>123</p>
      </v-card-text>
      <v-card-actions>
        <v-btn flat text @click.stop="show=false">Close</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>

  export default {
    name: "Following",
    props: {
      value: Boolean,
    },
    
    data :function(){
      return{
        
      }
    },

    methods: {
      
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