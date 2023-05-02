<template>
  <div id="app">
    <!-- nav bar -->
    <nav class="navbar has-background-link-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item is-size-3">
          <span class="icon">
            <i class="fa fa-book mr-2"></i>
          </span>
          <strong>ReadNovel</strong>
        </router-link>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu mx-2">
        <div class="navbar-end">
         
          <div v-if="user&&user.role=='author'" class="navbar-item">
            <router-link :to="{ name: 'authorBook', params: { user_id: user.user_id }}">
              <span class="icon">
                <i class="fa fa-folder-open"></i>
              </span>
              <strong>My Work</strong>
            </router-link>
          </div>
          <div v-if="user" class="navbar-item">
            <router-link :to="{ name: 'shelfBook', params: { user_id: user.user_id }}">
              <span class="icon">
                <i class="fa fa-star"></i>
              </span>
              <strong>Shelf Book</strong>
            </router-link>
          </div>
           <div v-if="user" class="navbar-item">
            <router-link :to="{ name: 'profile'}">
              <span class="icon">
                <i class="fa fa-user-circle"></i>
              </span>
              <strong>Profile</strong>
            </router-link>
          </div>
          <div v-if="user && user.role == 'user'" class="navbar-item">
            <router-link :to="{ name: 'applyAuthor', params: { user_id: user.user_id }}">
              <span class="icon">
                <i class="fa fa-sharp fa-solid fa-pen"></i>
              </span>
              <strong>Write a Novel</strong>
            </router-link>
          </div>
          <div v-if="user" class="navbar-item" @click="logOut()">
            <span class="icon">
              <i class="fa fa-sign-out"></i>
            </span>
            <strong>LogOut</strong>
            
          </div>
          <div v-if="!user" class="navbar-item">
            <router-link to="/user/register">
              <strong>Register</strong>
            </router-link>
          </div>
          <div v-if="!user" class="navbar-item">
            <router-link to="/user/login">
              <span class="icon">
                <i class="fa fa-sign-in"></i>
              </span>
              <strong>Login</strong>
            </router-link>
          </div>
          
        </div>
      </div>
    </nav>
    
    
    <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" />
  </div>
</template>

<script type="module">
import axios from '@/plugins/axios'
export default {
  data () {
    return {
      user: null,
      port: null,
      }
  },
  created(){
    this.port = process.env.PORT
  },
  mounted () {
    this.onAuthChange()
  },
  methods: {
    onAuthChange () {
      const token = localStorage.getItem('token')
      if (token) {
        console.log('token : '+token)
        this.getUser()
      }
    },
    getUser () {
      const token = localStorage.getItem('token')
      axios.get(`${this.port}/user/login`).then(res => {
        this.user = res.data
      })
    },
    logOut(){
      localStorage.clear();
      this.user = null;
      this.$router.push('/user/login')
    }
  },
};

</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai&display=swap');
  #app{
    font-family: 'IBM Plex Sans Thai', sans-serif;
  }
</style>