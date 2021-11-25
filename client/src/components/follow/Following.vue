<template>
  <v-dialog v-model="show" width="50%" max-width="300px">
    <v-card>

      <v-card-title class="d-flex justify-center">
        <span class="text-h5 align-center">팔로잉</span>
      </v-card-title>
      <v-card-text class="text-body-1" style="color: black">
        <div v-for="following in userProfile.followings" :key="following.id">
          <v-avatar size="35">
            <img
              :src="`http://127.0.0.1:8000${following.profile_path}`"
              alt="John"
            >
          </v-avatar>
          <p @click="openProfile(following.id)" :show="a">{{following.nickname}}</p>
          <v-divider></v-divider>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn flat text @click.stop="show=false">Close</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "Following",
    props: {
      value: Boolean,
    },
    
    data :function(){
      return{
         a:false,
      }
    },

    methods: {
      openProfile:function(user_pk){
        this.$store.dispatch('login/getOtherUserInfo',user_pk)
        this.show=false
      }
    },

    computed: {
      ...mapState('login', ['userProfile']),
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