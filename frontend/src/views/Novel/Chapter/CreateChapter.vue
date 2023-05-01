<template>
  <div class="container is-widescreen">
    <section class="section" id="app">
      <div class="content">
        <center><div class="title my-2">Create Chapter</div></center>
       <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
            <label class="label">Name :</label>
            <input class="input" type="text" placeholder="name" v-model="name"/>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
            <label class="label">Detail :</label>
            <textarea class="input" rows="4" cols="50" placeholder="detail" v-model="detail"></textarea>
          </div>
          
        </div>
        <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
              <button class="button mr-3 is-success" @click="createChapter()">Create</button>
              <button class="button is-danger" @click="cancelCreateChapter()">Cancel</button>
          </div>
        </div>
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
      name:'',
      detail:'',
    };
  },
 
  methods: {
    
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    shortContent(content) {
      if (content.length > 200) {
        return content.substring(0, 197) + "...";
      }
      return content;
    },
    cancelCreateChapter(){
        this.$router.push({ name: 'chapterNovel', params: { novel_id: this.$route.params.novel_id }})
    },
    createChapter(){
        axios
        .post(`http://18.206.137.146:3000/novel/chapter/${this.$route.params.novel_id}`,{
            name : this.name,
            detail:this.detail
        })
        .then((res) => this.$router.push({name: 'chapterNovel'}))
        .catch((e) => console.log(e.response.data));
    }
  },
};
</script>
