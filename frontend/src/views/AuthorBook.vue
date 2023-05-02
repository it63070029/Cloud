<template>
  <div class="container is-widescreen">
    <section class="section" id="app">
      <div class="content">
        <center>
          <div class="title " style="height:100px">My Work
            <span><button class="button is-info " style="float:right">
              <router-link :to="{ name: 'createNovel', params: { user_id: users.user_id }}">
                <strong class="has-text-white">Create Novel</strong>
              </router-link>
            
            </button></span>
          </div>
        </center>
        
        <div class="columns is-multiline">
          
          <div class="column is-3" v-for="novel in novels" :key="novel.novel_id">
            <div class="card equal-height" style="height: 100%;">
              <div class="card-image pt-5">
                <figure class="image is-4by3">
                  <img v-if="novel.image != null"
                    style="height: 150px;width: 120px;"
                    :src="novel.image"
                    alt="Placeholder image"
                  />
                  <img v-else
                    style="height: 150px;width: 120px;"
                    src="https://bulma.io/images/placeholders/640x360.png"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <router-link :to="{ name: 'chapterNovel', params: { novel_id: novel.novel_id }}">
                <div class="title has-text-link" @click="addView(novel.novel_id)">{{ novel.title }}</div></router-link>
                <div class="author">author: {{ novel.alias }}</div>
                <div class="content" style="height:50px;overflow: hidden;">descript:{{ shortContent(novel.descript) }}</div>
              </div>
               <footer class="card-footer">
                 <router-link :to="{ name: 'editNovel', params: { novel_id: novel.novel_id }}">
                <a class="card-footer-item">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fa fa-pen-square"></i>
                    </span>
                    <span>Edit</span>
                  </span>
                </a></router-link>
                 <a class="card-footer-item" @click="deleteNovel(novel.novel_id)">
                  <span class="icon-text">
                    <span class="icon">
                     <i class="fa fa-trash"></i>
                    </span>
                    <span>Delete</span>
                  </span>
                </a>
              </footer>
            </div>
          </div>
          
        </div>
        <!-- <center><div>
            <button class="button is-info ">
              <router-link :to="{ name: 'createNovel', params: { user_id: users.user_id }}">
                <strong class="has-text-white">Create Novel</strong>
              </router-link>
            
            </button>
        </div></center> -->
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
  props: ['user'],
  data() {
    return {
      users : this.user,
      novels: [],
    };
  },
  mounted() {
    this.getNovels();
  },
  methods: {
    getNovels() {
      axios
        .get(`${this.$hostname}/author/myBook/${this.users.user_id}`)
        .then((res) => {
          this.novels = res.data.novels;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shortContent(content) {
      if (content.length > 100) {
        return content.substring(0, 97) + "...";
      }
      return content;
    },
    deleteNovel(novel_id){
      axios
      .delete(`${this.$hostname}/novel/${novel_id}`)
      .then((res) => location.reload())
      .catch((err) => {console.log(err);});
    },
     addView(novel_id){
      axios
        .put(`${this.$hostname}/novel/addview/${novel_id}/${this.users.user_id}`)
        .then((response) => {
          let selectedNovel = this.novels.filter((e) => e.novel_id === novel_id)[0];
          selectedNovel.view = response.data.view;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>
<style scoped>
  .equal-height {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-footer {
    margin-top: auto;
  }
</style>
