<template>
  <div class="container is-widescreen">
    <section class="section" id="app">
      <div class="content">
        <center><div class="title">Edit Chapter</div></center>
        <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
            <label class="label">Name :</label>
            <input class="input" type="text" placeholder="name" v-model="selectchapter.name"/>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
            <label class="label">Detail :</label>
            <textarea class="input" rows="4" cols="50" placeholder="detail" v-model="selectchapter.detail"></textarea>
          </div>
          
        </div>
        <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
              <button class="button mr-3 is-success" @click="editChapter()">Save</button>
              <button class="button is-danger" @click="cancelEditChapter()">Cancel</button>
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
      novel_id:this.$route.params.novel_id,
      selectchapter:[]
    };
  },
  mounted() {
    this.getChapter();
  },
 
  methods: {
    shortContent(content) {
      if (content.length > 200) {
        return content.substring(0, 197) + "...";
      }
      return content;
    },
    cancelEditChapter(){
        this.$router.push({ name: 'chapterNovel',params: {novel_id: this.novel_id }})
    },
    editChapter(){
      console.log("edit Chapter")
        axios
        .put(`${this.$hostname}/novel/${this.$route.params.novel_id}/chapter/${this.$route.params.chapter_id}`,{
            name : this.selectchapter.name,
            detail:this.selectchapter.detail
        })
        .then((res) => this.$router.push({name: 'chapterNovel',params: {novel_id: this.$route.params.novel_id}}))
        .catch((e) => console.log(e.response.data));
    },
    getChapter(){
        axios
        .get(`${this.$hostname}/novel/${this.$route.params.novel_id}/chapter/editChapter/${this.$route.params.chapter_id}`)
        .then((res)=>{
            this.selectchapter = res.data.selectchapter;
        })
        .catch((e) => console.log(e.response.data));
    }
  },
};
</script>
