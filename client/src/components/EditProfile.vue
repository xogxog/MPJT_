<template>
  <v-dialog v-model="show" width="50%" max-width="400px">
    <v-card>

      <v-card-title>
        <span class="text-h5">프로필 수정</span>
      </v-card-title>
      <div class="container">
        <v-form ref="form" @submit.prevent>
          <v-file-input type="file" accept="image/*" @change="selectFile" class="form-control-file" id="profile_path" enctype="multipart/form-data"></v-file-input>
          <div class="border p-2 mt-3">
            <p>Preview Here</p>
            <template v-if="previewImage">
              <v-img :src="previewImage" class="img-fluid"></v-img>
              <p class="mb-0">file name: {{ image.name }}</p>
              <p class="mb-0">size: {{ image.size/1024 }}KB</p>
            </template>
          </div>
        </v-form>
        
        <v-card-actions>
          <v-btn flat text @click="EditProfileImage" :show="preShow">Edit</v-btn>
          <v-btn flat text @click.stop="show=false">Close</v-btn>
        </v-card-actions>
        
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: "EditProfile",

    props: {
      value: Boolean,
    },
    data:function(){
      return{
        image:null,
        previewImage: undefined,
        preShow: false
      }
    },
    methods: {
      selectFile:function(file){
        this.image=file
        console.log(this.image)
        this.previewImage = URL.createObjectURL(this.image);
      },
      
      EditProfileImage: function(){
        console.log(this.image)

        this.$store.dispatch('profile/editProfileImg', this.image)

      },
    },

    computed: {
      
      ...mapState('login', ['userInfo']),

      show: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    },
  }
</script>