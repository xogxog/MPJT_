<template>
  <div class="container">
    <div class="welcome">
      <p>Moive Project SangJune & TaeHyun</p>
    </div>
    <div class="login-box">
      <h1>Signup</h1>
      <form action="">
        <div class="user-box">
          <input type="text" id="username" required="" v-model="credentials.username">
          <label for="username">ID</label>
        </div>
        <div class="user-box">
          <input type="text" id="nickname" required="" v-model="credentials.nickname">
          <label for="nickname">Nick Name</label>
        </div>
        <div class="user-box">
          <input type="password" id="password" required="" v-model="credentials.password">
          <label for="password">Password</label>
        </div>
        <div class="user-box">
          <input type="password" id="pwConfirmation" required="" v-model="credentials.pwConfirmation">
          <label for="pwConfirmation">Password Confirm</label>
        </div>

        <!-- <form>
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
                <img :src="credentials.profile_path" class="img-fluid" />
                <p class="mb-0">file name: {{ image.name }}</p>
                <p class="mb-0">size: {{ image.size/1024 }}KB</p>
              </template>
          </div>
        </form> -->

        <v-row align="center">
          <v-col>
            <v-select v-model="credentials.genres_name" :items="genres" :menu-props="{ maxHeight: '400' }" label="Select" multiple
              hint="Pick your favorite Genres" persistent-hint>
            </v-select>
          </v-col>
        </v-row>
        <a href="" @click='signup'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Signup
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Cancel
        </a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'Signup',
    components: {

    },

    data() {
      return {
       // profile_path: null,
        image: null,
        genres: ['모험','판타지','애니메이션','드라마','공포','액션','코미디','역사','서부','스릴러','범죄','다큐멘터리','SF','미스터리','음악','로맨스','가족','전쟁','TV 영화'],
        credentials: {
          username: null,
          password: null,
          pwConfirmation: null,
          nickname: null,
          // profile_path: null,
          genres_name: [], 
        }
      }
    },

    methods: {
      previewImage: function (event) {
        var input = event.target;
        // const frm = new FormData();
        if (input.files) {
          var reader = new FileReader();
          reader.onload = (event) => {
            this.credentials.profile_path = event.target.result;
          }
          this.image = input.files[0];
          reader.readAsDataURL(input.files[0]);
          }
        },
      signup : function(event){
        
        event.preventDefault()
        // const frm = new FormData();
        // frm.append("username", this.credentials.username)
        // frm.append("password", this.credentials.password)
        // frm.append("pwConfirmation", this.credentials.pwConfirmation)
        // frm.append("nickname", this.credentials.nickname)
        // frm.append("profile_path", this.credentials.profile_path)
        // frm.append("genres_name", this.credentials.genres_name)
        // console.log(frm)

        axios({
          method: 'post',
          url : 'http://127.0.0.1:8000/accounts/signup/',
          data : this.credentials,
          // headers: {
          //   "Content-type": "multipart/form-data"
          // },
        })
        
          .then(()=>{
            this.$router.push({ name:'Main'})
          })
          .catch(error =>{
            alert(error.response.data.error)
            console.log(error.response.data.error)
          })
        },
      },
    }
</script>

<style scoped>
.welcome {
    z-index: 999;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .welcome p {
    position: relative;
    /* font-family: sans-serif; */
    /* color: white; */
    text-transform: uppercase;
    font-size: 2em;
    letter-spacing: 4px;
    overflow: hidden;
    background: linear-gradient(90deg, #000, #fff, #000);
    background-repeat: no-repeat;
    background-size: 70%;
    animation: animate 4s linear infinite;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
    -webkit-background-clip: text;
  }

  @keyframes animate
  {
    0%
    {
      background-position: -400%;
    }
    100%
    {
      background-position: 300%;
    }
  }


  .login-box {
    position: relative;
    top: 45%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
  }

  .login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #000000;
    text-align: center;
  }

  .login-box .user-box {
    position: relative;
  }

  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #000000;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #000000;
    outline: none;
    background: transparent;
  }

  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #000000;
    pointer-events: none;
    transition: .5s;
  }

  .login-box .user-box input:focus~label,
  .login-box .user-box input:valid~label {
    top: -20px;
    left: 0px;
    color: #000000;
    font-size: 15px;
  }


  .login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #000000;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px;
  }

  .login-box form a:hover {
    background: #ffffff8e;
    color: #000000;
    border-radius: 5px;
    box-shadow: 0 0 5px #000000, 0 0 25px #000000, 0 0 50px #000000, 0 0 100px #000000;
  }

  .login-box a span {
    position: absolute;
    display: block;
  }

  .login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #000000);
    animation: btn-anim1 1s linear infinite;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }

    50%,
    100% {
      left: 100%;
    }
  }

  .login-box span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #000000);
    animation: btn-anim2 1s linear infinite;
    animation-delay: .25s;
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }

    50%,
    100% {
      top: 100%;
    }
  }

  .login-box span:nth-child(3) {
    bottom: 0;
    height: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #000000);
    animation: btn-anim3 1s linear infinite;
    animation-delay: .5s;
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }

    50%,
    100% {
      right: 100%;
    }
  }

  .login-box span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #000000);
    animation: btn-anim4 1s linear infinite;
    animation-delay: .75s;
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }

    50%,
    100% {
      bottom: 100%;
    }
  }
</style>