<template>
  <section class="hero ">
        <div class="hero-body">
        <div class="container mt-5 " >
        <div class="columns is-centered">
        <div class="column is-3">
          <h3 class="title has-text-black">Register</h3>
          <hr class="login-hr">
          <p v-if="error" class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light">{{ error }}</p>
        <!-- Login form -->
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left">
            <input v-model="username" class="input" type="text" />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            
          </div>
        </div>
<!--
         <label class="label">Email</label>
          <div class="control has-icons-left">
            <input v-model="email" class="input" type="email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
-->
          <label class="label">Firstname</label>
          <div class="control has-icons-left">
            <input v-model="firstname" class="input" type="text" />
          </div>

          <label class="label">Lastname</label>
          <div class="control has-icons-left">
            <input v-model="lastname" class="input" type="text" />
          </div>
          <label class="label">Email</label>
          <div class="control has-icons-left">
            <input v-model="email" class="input" type="text" />
          </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input v-model="password" class="input" type="password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <button class="button is-block is-link is-fullwidth" @click="registersubmit()">Register <i class="fa fa-sign-in" aria-hidden="true"></i></button>
         <p class="has-text-grey">
            <router-link to="/user/login">
                Login
            </router-link>
        </p>
      </div>
    </div>

    
  </div>
    </div>
    <!-- <section class="hero is-success is-halfheight">
  <div class="hero-body">
    <div class="">
      <p class="title">
        Half height hero
      </p>
    </div>
  </div>
</section> -->
  </section>
</template>

<script>
import axios from '@/plugins/axios'

export default {
  data () {
    return {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      error: ''
    }
  },computed: {
    userData() {
      return Object(this.$attrs);
    }
  },

 methods: {
   registersubmit() {
    //  const data = {
    //    username: this.username,
    //    password: this.password,
    //    firstname: this.firstname,
    //    lastname: this.lastname,
    //    email: this.email,
    //  }
     console.log("register")
     axios.post(`${this.$hostname}/user/register`, {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,

   })
       .then(res => {                          
//    this.username = username.response.data,
//    this.password,
//    this.firstname,
//    this.lastname,
       //email: this.email,

         this.$router.push('/user/login')
       })
       .catch(error => {
         this.error = error.response.data
         console.log(error.response.data)
       }
       )
    }
  },
}
</script>