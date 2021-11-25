<template>
  <v-dialog v-model="show" width="50%">
    <v-card>

      <v-card-title>
        <span class="text-h5">프로필 수정</span>
      </v-card-title>
      <div class="container">
        <v-form ref="form" @submit.prevent>
          <v-file-input type="file" accept="image/*" @change="selectFile" class="form-control-file" id="profile_path" enctype="multipart/form-data"></v-file-input>
          <!-- <div class="border p-2 mt-3">
              <p>Preview Here</p>
              <template v-if="credentials.profile_path">
                <v-img :src="credentials.profile_path" class="img-fluid"></v-img>
                <p class="mb-0">file name: {{ image.name }}</p>
                <p class="mb-0">size: {{ image.size/1024 }}KB</p>
              </template>
          </div> -->
        </v-form>
        
        <v-card-actions>
          <v-btn flat text @click="EditProfileImage">Edit</v-btn>
          <v-btn flat text @click.stop="show=false">Close</v-btn>
        </v-card-actions>
        
      </div>

      
<!-- <v-form>
            <label for="profile_path">Select Image</label>
            <v-file-input type="file" accept="image/*" @change="previewImage" class="form-control-file" id="profile_path"></v-file-input>
            <input type="file" accept="image/*" @change="previewImage" class="form-control-file" id="profile_path">
                    <v-file-input
          show-size
          label="File input"
          @change="selectFile"
        ></v-file-input>
            <div class="border p-2 mt-3">
              <p>Preview Here</p>
              <template v-if="credentials.profile_path">
                <v-img :src="credentials.profile_path" class="img-fluid"></v-img>
                <p class="mb-0">file name: {{ image.name }}</p>
                <p class="mb-0">size: {{ image.size/1024 }}KB</p>
              </template>
          </div>
        </v-form> -->


    </v-card>
  </v-dialog>
</template>

<script>
// import { mapState } from 'vuex'
  export default {
    name: "EditProfile",

    props: {
      value: Boolean,
    },
    data:function(){
      return{
        image:null,
      }
    },
    methods: {
      selectFile:function(file){
        this.image=file
      },
      EditProfileImage: function(){
        console.log(this.image)
        this.$store.dispatch('profile/editProfileImg', this.image)
        
      },
      // previewImage: function (event) {
      //   var input = event.target;
      //   // const frm = new FormData();
      //   if (input.files) {
      //     var reader = new FileReader();
      //     reader.onload = (event) => {
      //       this.credentials.profile_path = event.target.result;
      //     }
      //     this.image = input.files[0];
      //     reader.readAsDataURL(input.files[0]);
      //     }
      //   },
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
    },
  }
</script>