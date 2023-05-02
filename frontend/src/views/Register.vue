<template>
  <div>
    <div class="container is-fluid mt-5">
      <div class="columns is-centered">
        <div class="column is-4">
          <h1 class="title">Register</h1>
          <!-- Sign up form -->
          <!-- Username -->
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left">
              <input
                v-model="$v.username.$model"
                :class="{ 'is-danger': $v.username.$error }"
                class="input"
                type="text"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <template v-if="$v.username.$error">
              <p class="help is-danger" v-if="!$v.username.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.username.minLength">
                Must be at least 5 characters
              </p>
            </template>
          </div>
          <!-- Password -->
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="$v.password.$model"
                :class="{ 'is-danger': $v.password.$error }"
                class="input"
                type="password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <template v-if="$v.password.$error">
              <p class="help is-danger" v-if="!$v.password.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.password.minLength">
                Must be at least 8 character
              </p>
              <p class="help is-danger" v-if="!$v.password.complex">
                Password too easy
              </p>
            </template>
          </div>
          <!-- Email -->
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="$v.email.$model"
                :class="{ 'is-danger': $v.email.$error }"
                class="input"
                type="text"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
            <template v-if="$v.email.$error">
              <p class="help is-danger" v-if="!$v.email.required">
                This field is required
              </p>
              <p class="help is-danger" v-if="!$v.email.email">Invalid Email</p>
            </template>
          </div>
          <!-- First Name -->
          <div class="field">
            <label class="label">First Name</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="$v.first_name.$model"
                :class="{ 'is-danger': $v.first_name.$error }"
                class="input"
                type="text"
              />
            </div>
            <template v-if="$v.first_name.$error">
              <p class="help is-danger" v-if="!$v.first_name.required">
                This field is required
              </p>
            </template>
          </div>
          <!-- Last Name -->
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="$v.last_name.$model"
                :class="{ 'is-danger': $v.last_name.$error }"
                class="input"
                type="text"
              />
            </div>
            <template v-if="$v.last_name.$error">
              <p class="help is-danger" v-if="!$v.last_name.required">
                This field is required
              </p>
            </template>
          </div>

          <button class="button is-link is-fullwidth" @click="submit()">Sign Up</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

//function validate password
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      first_name: "",
      last_name: "",
    };
  },
  methods: {
    submit() {
      // alert("click Submit")
      // Validate all fields
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        let data = {
          username: this.username,
          password: this.password,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
        };

        axios
          .post(`${this.$hostname}/user/register`, data)
          .then((res) => {
            alert("Sign up Success");
            this.$router.push('/user/login')
          })
          .catch((err) => {
            alert(err.response.data.details.message)
          });
      }
    },
  },
  validations: {
    email: {
      required: required,
      email: email,
    },
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,

    },
    username: {
      required: required,
      minLength: minLength(5),
      maxLength: maxLength(20),
    },
    first_name: {
      required: required,
    },
    last_name: {
      required: required,
    },
  },
};
</script>