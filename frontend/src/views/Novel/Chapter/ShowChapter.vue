<template>
  <div class="container is-widescreen">
    <section class="section" id="app">
      <div class="content">
        <div class="columns is-multiline">
            
            <div class="column is-2"></div>
            <div class="column is-8">
                <div class="mx-3 title is-size-4"><strong>{{selectChapters[0].name}}</strong></div>
                <div class="card my-3 has-background-light">
                
                    <div class="card-content">
                        <div class="subtitle is-size-6">{{selectChapters[0].detail}}</div>
                    </div>
                </div>
                <!-- <button class="button" >Back</button> -->
                <router-link  :to="{ name: 'chapterNovel', params: {novel_id: selectChapters[0].novel_id }}">
                <center><button class="button is-info" >Info</button></center></router-link>
                 <router-link :to="{ name: 'chapterDetail', params: {novel_id: selectChapters[0].novel_id ,chapter_id:this.chapter_id}}">
                <button v-if="selectChapters[0].chapter_id!=chapters[0].chapter_id"  class="button is-link is-light" @click="backChap()" style="float:left">Back</button></router-link>

                <router-link :to="{ name: 'chapterDetail', params: {novel_id: selectChapters[0].novel_id ,chapter_id:this.chapter_id}}">
                <button v-if="selectChapters[0].chapter_id!=chapters[chapters.length-1].chapter_id"  class="button is-link is-light" @click="nextChap()" style="float:right">Next</button></router-link>
                
                
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
      selectChapters:[],
      chapters:[],
      chapter_id:1
    };
  },
  mounted() {
    this.getDeatailChapter();
    this.getChapterList()
  },
  methods: {
    getDeatailChapter() {
      axios
        .get(`http://localhost:3000/novel/chapter/showChapter/${this.$route.params.chapter_id}/${this.$route.params.novel_id}`)
            // user_id:this.users.user_id
        .then((res) => {
          this.selectChapters = res.data.selectChapters;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
    getChapterList(){
      axios
      .get(`http://localhost:3000/novel/chapter/showChapter/${this.$route.params.novel_id}`)
      .then((res) => {
          this.chapters = res.data.chapters;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    nextChap(){
      for(let i=0;i<this.chapters.length;i++){
        if(this.selectChapters[0].chapter_id==this.chapters[i].chapter_id && this.selectChapters[0].chapter_id !==this.chapters[this.chapters.length-1].chapter_id){
          this.chapter_id=this.chapters[i+1].chapter_id
          break
        }
      }
    },
    backChap(){
      for(let i=0;i<this.chapters.length;i++){
        if(this.selectChapters[0].chapter_id==this.chapters[i].chapter_id && this.selectChapters[0].chapter_id !==this.chapters[0].chapter_id){
          this.chapter_id=this.chapters[i-1].chapter_id
          break
        }
      }
    }
  },
};
</script>
