<template>
<div class="container">
	<div class="welcome">
		<p>Moive Project SangJune & TaeHyun</p>
	</div>
	<div class="login-box">
		<h1>Login</h1>
		<form action="">
			<div class="user-box">
				<input type="text" name="" required="" id="username" v-model="credentials.username">
				<label for="username">ID</label>
			</div>
			<div class="user-box">
				<input type="password" required="" id="password" v-model="credentials.password" @keyup.enter="login"> 
				<label for="password">Password</label>
			</div>
			<a href="" @click.prevent="login">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				Login
			</a>
		</form>
	</div>
</div>
</template>

<script scoped>
import axios from 'axios'

  export default {
    name: 'Login',
    components: {
    },
		data: function(){
			return{
				credentials:{
					username:null,
					password:null,
				}
			}
		},
		methods:{
			setToken : function(){
				const token = localStorage.getItem('jwt')
				const config = {
					Authorization: `JWT ${token}`
				}
				return config
			},
			login : function(){
				axios({
					method : 'post',
					url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
					data : this.credentials,
				})
					.then(res =>{
						localStorage.setItem('jwt', res.data.token)
						//유저 id 가지고 오기
						const isLogin = true
						const token = this.setToken()
						this.$store.dispatch('login/loginCheck', isLogin)
						this.$store.dispatch('login/setToken', token)
						const data = {
							'username' : this.credentials.username,
						}
						axios({
							method : 'get',
							url : 'http://127.0.0.1:8000/accounts/login/',
							params : data,
							headers : this.setToken(),
						})
						.then((res)=>{
							// console.log(res.data)
							this.$store.dispatch('login/setUserInfo',res.data)
						})
						
						this.$router.push({name : 'Main'})
					})
					.catch((error) =>{
						alert(error.message)
						// console.log('Error',error.message)
					})
				
			}
		}
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
	top: 50%;
	left: 50%;
	width: 400px;
	padding: 40px;
	transform: translate(-50%, -50%);
	background: rgba(255, 255, 255, 0.5);
	box-sizing: border-box;
	box-shadow: 0 15px 25px rgba(0,0,0,.6);
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

.login-box .user-box input:focus ~ label, .login-box .user-box input:valid ~ label {
	top: -20px; 
	left: 0px; 
	color: #000000;
	font-size: 12px;
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
	background: #ffffff;
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
  50%, 100% {
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
	0%{
		top: -100%;
	}
	50%,100% {
		top: 100%;
	}
}

.login-box span:nth-child(3){
	bottom: 0;
	height: -100%;
	width: 100%;
	height: 2px;
	background: linear-gradient(270deg, transparent, #000000);
	animation: btn-anim3 1s linear infinite;
	animation-delay: .5s;
}

@keyframes btn-anim3 {
	0%{
		right: -100%;
	}
	50%, 100% {
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
  50%,100% {
    bottom: 100%;
  }
}

</style>