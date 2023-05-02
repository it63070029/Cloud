<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-5">
            <input
              class="input"
              type="text"
              v-model="search"
              placeholder="Search"
            />
          </div>
          <div class="column is-3">
            <button @click="getNovels" class="button">Search</button>
          </div>
        </div>
      </div>
    </section>
    <!-- <section>
      <label class="label">Image :</label>
      <div class="file">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            @change="selectImages($event)"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label"> Choose a file… </span>
          </span>
        </label>
      </div>
      <button class="button mx-1" @click="sendImg()">Save</button>
    </section>
    <section>
      <img src="https://bucket-novel.s3.amazonaws.com/static%5Cuploads%5CnewImage-1682951842254.webp"/>
    </section> -->
    <section class="section" id="app">
      <div class="content">
        <div class="columns is-multiline">
          <div
            class="column is-3"
            v-for="novel in novels"
            :key="novel.novel_id"
          >
            <div class="card">
              <div class="card-image pt-5">
                <figure class="image">
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
                <router-link
                  :to="{
                    name: 'chapterNovel',
                    params: { novel_id: novel.novel_id },
                  }"
                >
                  <div
                    class="title has-text-link"
                    @click="addView(novel.novel_id)"
                  >
                    {{ novel.title }}
                  </div></router-link
                >
                <div class="author">author: {{ novel.alias }}</div>
                <!-- <div class="content" style="height: 100px;">descript: {{ shortContent(novel.descript) }}</div> -->
              </div>
              <footer class="card-footer">
                <a class="card-footer-item">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fa fa-eye"></i>
                    </span>
                    <span>View ({{ novel.view }})</span>
                  </span>
                </a>
                <a class="card-footer-item" @click="addLike(novel.novel_id)">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="far fa-heart"></i>
                    </span>
                    <span>Like ({{ novel.like }})</span>
                  </span>
                </a>
                <a class="card-footer-item" @click="addShelf(novel.novel_id)">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fa fa-bookmark"></i>
                    </span>
                    <span>addToShelf</span>
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
  name: "Home",
  props: ["user"],
  data() {
    return {
      search: "",
      novels: [],
      users: this.user,
      shelfBooks: [],
      // newImage: [],
    };
  },
  mounted() {
    this.getNovels();
    this.getShelfBooks();
  },
  methods: {
    getNovels() {
      axios
        .get("http://3.84.45.245:3000/", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.novels = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shortContent(content) {
      if (content.length > 200) {
        return content.substring(0, 197) + "...";
      }
      return content;
    },
    // addLike(novel_id) {

    addShelf(novel_id) {
      if (this.users != null) {
        axios
          .post(`http://3.84.45.245:3000/shelfBook/`, {
            novel_id: novel_id,
            user_id: this.users.user_id,
          })
          .then((res) => console.log(res))
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Please Login");
      }

      // for(let i=0;i<this.shelfBooks.length;i++){
      //   if(this.shelfBooks[i].novel_id!==novel_id){
      //     axios
      //     .post(`http://3.84.45.245:3000/shelfBook`,{
      //       novel_id:novel_id,
      //       user_id:this.users.user_id
      //     })
      //     .then((res) => location.reload())
      //     .catch((err) => {console.log(err);});

      //   }
      // }
    },
    getShelfBooks() {
      axios
        .get(`http://3.84.45.245:3000/${this.users.user_id}`)
        .then((res) => {
          this.shelfBooks = res.data.shelfBooks;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addLike(novel_id) {
      if (this.users != null) {
        axios
          .put(
            `http://3.84.45.245:3000/novel/addlike/${novel_id}/${this.users.user_id}`
          )
          .then((response) => {
            let selectedNovel = this.novels.filter(
              (e) => e.novel_id === novel_id
            )[0];
            selectedNovel.like = response.data.like;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Please Login");
      }
    },
    addView(novel_id) {
      axios
        .put(
          `http://3.84.45.245:3000/novel/addview/${novel_id}/${this.users.user_id}`
        )
        .then((response) => {
          let selectedNovel = this.novels.filter(
            (e) => e.novel_id === novel_id
          )[0];
          selectedNovel.view = response.data.view;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
