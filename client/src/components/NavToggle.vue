<template>
  <div>
    <div class="d-flex flex-end">
      <v-btn
      class="mx-2"
      fab
      dark
      @click.stop="drawer = !drawer">
      <v-icon dark>
        mdi-format-list-bulleted-square
      </v-icon>
    </v-btn>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      right
      absolute
      temporary
      dark
    >
      <v-list-item>
        <v-list-item-content>
          <span v-if="isLogin">
          <v-list-item-title>{{userInfo.nickname}}</v-list-item-title>
          </span>
          <span v-else>
          <v-list-item-title>로그인 하세요.</v-list-item-title>
          </span>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-autocomplete
          label="Search"
          dense
          filled
          rounded
        ></v-autocomplete>
      </v-list-item>

      <!-- 항상보임 -->
      <v-list>
        <span>
          <!-- 관리자만 보이는 관리자페이지 -->
          <span v-if="userInfo !== null">
            <span v-if="userInfo.nickname =='admin'">
              <v-list-item href="http://127.0.0.1:8000/admin/" router exact>
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>관리자페이지</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </span>
          </span>
          
          <span v-if="isLogin">
            <v-list-item to="/profile" router exact @click="getUserInfo">
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>내 프로필</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </span>
          <v-list-item to="/Main" router exact>
              <v-list-item-icon>
                <v-icon>mdi-forum</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Main</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <!-- 작업 수월용 -->
          <!-- <v-list-item to="/MovieDetail" router exact>
              <v-list-item-icon>
                <v-icon>mdi-forum</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>MovieDetail</v-list-item-title>
              </v-list-item-content>
          </v-list-item> -->
          
          <v-list-item to="/MovieBoxOffice" router exact :disabled="!isLogin">
              <v-list-item-icon>
                <!-- 뭐깔라는데................................ -->
                <!-- <v-icon color="green darken-2">fas fa-lock</v-icon> -->
                <v-icon>mdi-forum</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>MovieBoxOffice</v-list-item-title>
              </v-list-item-content>
          </v-list-item>

          <v-list-item to="/MovieSearch" router exact :disabled="!isLogin">
                <v-list-item-icon>
                  <v-icon>mdi-forum</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>MovieSearch</v-list-item-title>
                </v-list-item-content>
          </v-list-item>
        </span>

        <!-- 로그인 해야 보임 -->
        <span v-if="isLogin">
          <v-list-item to="/#" router exact @click.native="logout">
            <v-list-item-icon>
              <v-icon>mdi-forum</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </span>

        <!-- 로그인하면 안보임 -->
        <span v-else>
          <v-list-item to="/Login" router exact>
              <v-list-item-icon>
                <v-icon>mdi-forum</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          

          <v-list-item to="/Signup" router exact>
              <v-list-item-icon>
                <v-icon>mdi-forum</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Signup</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </span>
        
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name: 'NavToggle',
    data () {
      return {
        drawer: null,
        // isLogin: false,
      }
    },
    methods:{
      getUserInfo : function(){
        this.$store.dispatch('login/getUserInfo')
      },
      logout:function(){
        // this.isLogin = false
        localStorage.removeItem('jwt')
        const isLogin = false
        this.$store.dispatch('login/loginCheck', isLogin)
        this.$router.push({name : 'index'})
      }
    },
    // created:function(){
    //   const token = localStorage.getItem('jwt')
    //   if (token) {
    //     this.isLogin = true
    //   }
    // },
    computed :{
      ...mapState('login', ['isLogin','userInfo']),
    }
  }
</script>

<style>

</style>