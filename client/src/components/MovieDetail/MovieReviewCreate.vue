<template>
  <v-dialog v-model="show" width="50%">
    <v-card>

      <v-card-title>
        <span class="text-h5">리뷰 작성</span>
      </v-card-title>
      <v-rating color="grey" background-color="grey" hover length="5" size="40"></v-rating>
      <div class="container">
        <v-form ref="form">
          <v-text-field label="Title" required></v-text-field>
          <v-textarea label="Content"></v-textarea>
        </v-form>

        <v-card-actions>
          <v-btn flat text>Write</v-btn>
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
      value: Boolean
    },
    methods: {
      resetForm () {
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