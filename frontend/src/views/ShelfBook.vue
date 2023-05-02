<template>
  <div class="container is-widescreen">
    <section class="section" id="app">
      <div class="content">
        <center>
          <div class="title " style="height:100px">Shelf Book</div>
        </center>
        
        <div class="columns is-multiline">
          
          <div class="column is-3" v-for="book in novelsShelf" :key="book.book_id">
            <div class="card">
              <div class="card-image pt-5">
                <figure class="image">
                  <img v-if="book.image != null"
                    style="height: 150px;width: 120px;"
                    :src="book.image"
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
                <router-link :to="{ name: 'chapterNovel', params: { novel_id: book.novel_id }}">
                <div class="title has-text-link">{{ book.title }}</div></router-link>
                <div class="title has-text-link"></div>
                <div class="author">author:{{book.alias}}</div>
                <div class="content" style="height:50px;overflow: hidden;">descript:{{book.descript}}</div>
              </div>
               <footer class="card-footer">
                 <a class="card-footer-item" @click="deleteBook(book.novel_id)">
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
      shelfBooks: [],
      novelsShelf:[],
      novel_id:''
    };
  },
  mounted() {
    this.getShelfBooks();
  },
  methods: {
    getShelfBooks() {
      axios
        .get(`http://3.84.45.245:3000/${this.$route.params.user_id}`)
        .then((res) => {
          this.shelfBooks = res.data.shelfBooks;
          this.novelsShelf= res.data.novelsShelf
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // getNovelsShelf() {
        
    //     for(let i=0;i<this.shelfBooks.length;i++){
    //         console.log("555")
    //         axios
    //         .get(`http://3.84.45.245:3000/${this.shelfBooks[i].novel_id}`)
    //         .then((res) => {
    //             this.novelsShelf = res.data.novelsShelf;
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //     }
      
    // },
    deleteBook(novel_id){
        //young tom mai dai
        console.log(novel_id)
        axios
        .delete(`http://3.84.45.245:3000/${this.users.user_id}/${novel_id}`)
        .then((res) => 
        
        location.reload()
        )
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>
