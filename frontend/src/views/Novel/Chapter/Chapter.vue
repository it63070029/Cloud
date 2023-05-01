<template>
  <div class="container is-widescreen">
    <section class="section" id="app">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-3">
            <div class="card" style="position: relative">
              <div class="card-image pt-5">
                <figure class="image">
                  <img
                    v-if="selectNovels[0].image != null"
                    style="height: 200px; width: 180px"
                    :src="selectNovels[0].image"
                    alt="Placeholder image"
                  />
                  <img
                    v-else
                    style="height: 200px; width: 180px"
                    src="https://bulma.io/images/placeholders/640x360.png"
                    alt="Placeholder image"
                  />
                  <!-- <img
                    style="height: 150px; width: 120px"
                    :src="imagePath(selectNovels[0].image)"
                    alt="Placeholder image"
                  /> -->
                </figure>
              </div>
              <div class="card-content">
                <div class="title">{{ selectNovels[0].title }}</div>
                <div class="author">author: {{ selectNovels[0].alias }}</div>
                <div
                  class="content"
                  id="descriptNovel"
                  style="height: 120px; overflow: hidden"
                >
                  descript :{{ shortContent(selectNovels[0].descript) }}
                  <span
                    id="clickshow"
                    style="color: #8cc0de"
                    @click="showDescript()"
                    >Read more</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="column is-8">
            <div class="subtitle mx-2">
              Chapter
              <button
                class="button is-danger is-light"
                style="float: right"
                v-if="
                  users &&
                  users.role == 'author' &&
                  user_id[0].user_id == users.user_id
                "
              >
                <router-link
                  :to="{
                    name: 'createChapter',
                    params: { novel_id: novel_id },
                  }"
                >
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fa fa-plus"></i>
                    </span>
                    <span>Create Chapter</span>
                  </span>
                </router-link>
              </button>
            </div>
            <!-- Chapter -->
            <div
              class="card"
              v-for="chapter in chapters"
              :key="chapter.chapter_id"
            >
              <div class="card-content">
                <!-- Click To Get Detail Chapter -->
                <div>
                  <router-link
                    :to="{
                      name: 'chapterDetail',
                      params: {
                        chapter_id: chapter.chapter_id,
                        novel_id: chapter.novel_id,
                      },
                    }"
                    >{{ chapter.name }}</router-link
                  >
                  <!-- DeleteChapter -->
                  <span
                    style="float: right"
                    v-if="
                      users &&
                      users.role == 'author' &&
                      user_id[0].user_id == users.user_id
                    "
                  >
                    <a
                      class="card-footer-item"
                      @click="deleteChapter(chapter.chapter_id)"
                    >
                      <span class="icon-text">
                        <span class="icon">
                          <i class="fa fa-trash"></i>
                        </span>
                        <span>Delete</span>
                      </span>
                    </a>
                  </span>
                  <!-- EditChapter -->
                  <span
                    style="float: right"
                    v-if="
                      users &&
                      users.role == 'author' &&
                      user_id[0].user_id == users.user_id
                    "
                  >
                    <router-link
                      :to="{
                        name: 'editChapter',
                        params: {
                          novel_id: novel_id,
                          chapter_id: chapter.chapter_id,
                        },
                      }"
                    >
                      <a class="card-footer-item">
                        <span class="icon-text">
                          <span class="icon">
                            <i class="fa fa-edit"></i>
                          </span>
                          <span>Edit</span>
                        </span>
                      </a>
                    </router-link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- commentt -->
        <div>
          <div class="title" style="margin-left: 10%">Comment</div>
          <div
            style="
              width: 80%;
              height: 300px;
              overflow-y: auto;
              margin-left: 10%;
              background-color: lightblue;
              padding: 20px;
              border-radius: 20px;
            "
          >
            <div
              class="card"
              v-for="comment in comments"
              :key="comment.comment_id"
            >
              <div class="card-content my-2">
                <!-- Show text comment -->
                <div>
                  {{ comment.comment_text }}
                  <!-- Delete Comment -->
                  <span
                    style="float: right"
                    v-if="
                      users &&
                      ((users.role == 'author' &&
                        user_id[0].user_id == users.user_id) ||
                        comment.user_id == users.user_id)
                    "
                  >
                    <a
                      class="card-footer-item"
                      @click="deleteComment(comment.comment_id)"
                    >
                      <span class="icon-text">
                        <span class="icon">
                          <i class="fa fa-trash"></i>
                        </span>
                        <span>Delete</span>
                      </span>
                    </a>
                  </span>
                  <span
                    style="float: right"
                    v-if="users && comment.user_id === users.user_id"
                    @click="modalEditComment = !modalEditComment"
                  >
                    <a
                      class="card-footer-item"
                      @click="
                        editComment(comment.comment_id, comment.comment_text)
                      "
                    >
                      <span class="icon-text">
                        <span class="icon">
                          <i class="fa fa-edit"></i>
                        </span>
                        <span>Edit</span>
                      </span>
                    </a>
                  </span>
                </div>
                <div style="color: #f4bfbf">
                  Create By:{{ comment.username }}
                </div>
              </div>
            </div>
          </div>
          <br />
          <!-- createComment -->
          <div
            v-if="users"
            style="
              width: 80%;
              margin-left: 10%;
              background-color: lightblue;
              padding: 20px;
              border-radius: 20px;
            "
          >
            <div class="columns">
              <div class="column is-10">
                <textarea
                  class="input"
                  placeholder="Comment.."
                  v-model="commentText"
                ></textarea>
              </div>
              <div class="column">
                <button class="button is-danger" @click="createComment()">
                  comment
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal Edit Comment -->
        <div class="modal" v-bind:class="{ 'is-active': modalEditComment }">
          <div
            class="modal-background"
            @click="modalEditComment = !modalEditComment"
          ></div>
          <div class="modal-card" style="max-width: 960px; width: 30%">
            <header class="modal-card-head">
              <p class="modal-card-title">Edit Comment</p>
              <button
                class="delete"
                aria-label="close"
                @click="modalEditComment = !modalEditComment"
              ></button>
            </header>
            <section class="modal-card-body">
              <!-- <center> -->
              <div class="column">
                <div class="columns">
                  <div class="column">
                    <label class="label">Comment:</label>
                    <div class="control">
                      <input class="input" type="text" v-model="commentEdit" />
                    </div>
                  </div>
                </div>

                <center>
                  <button
                    class="button mx-1"
                    @click="modalEditComment = !modalEditComment"
                  >
                    cancel
                  </button>
                  <button class="button mx-1" @click="changeComment()">
                    Save
                  </button>
                </center>
              </div>
            </section>
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
  props: ["user"],
  data() {
    return {
      users: this.user,
      selectNovels: [],
      chapters: [],
      novel_id: this.$route.params.novel_id,
      user_id: "",
      comments: [],
      commentText: "",
      modalEditComment: false,
      commentEdit: "",
      comment_id: "",
      comment_idDelete: "",
      descript: false,
    };
  },
  created(){
    this.users = this.user
  },
  mounted() {
    this.getNovels();
    this.getComments();
  },
  methods: {
    getNovels() {
      axios
        .get(
          `http://18.206.137.146:3000/novel/chapter/${this.$route.params.novel_id}`
        )
        .then((res) => {
          this.selectNovels = res.data.selectNovels;
          this.chapters = res.data.chapters;
          this.user_id = res.data.byAuthorId;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shortContent(content) {
      if (!this.descript) {
        if (content.length > 120) {
          return content.substring(0, 110) + "... ";
        }
        return content;
      } else {
        return content;
      }
    },
    deleteChapter(chapter_id) {
      axios
        .delete(
          `http://18.206.137.146:3000/novel/${this.novel_id}/chapter/${chapter_id}`
        )
        .then((res) => location.reload())
        .catch((err) => {
          console.log(err);
        });
    },
    getComments() {
      axios
        .get(
          `http://18.206.137.146:3000/comment/${this.$route.params.novel_id}`
        )
        .then((res) => {
          this.comments = res.data.comments;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createComment() {
      console.log("test Post Comment" + this.$route.params.novel_id);
      axios
        .post(
          `http://18.206.137.146:3000/comment/${this.$route.params.novel_id}/${this.users.user_id}`,
          {
            comment_text: this.commentText,
          }
        )
        .then((res) => document.location.reload(true))
        .catch((err) => {
          console.log(err);
        });
    },
    deleteComment(comment_id) {
      console.log("Delete Comment" + comment_id);
      axios
        .delete(
          `http://18.206.137.146:3000/comment/${comment_id}/${this.users.user_id}`
        )
        .then((res) => location.reload())
        .catch((err) => {
          console.log(err);
        });
    },
    changeComment() {
      axios
        .put(`http://18.206.137.146:3000/comment/${this.comment_id}`, {
          comment_text: this.commentEdit,
        })
        .then((res) => location.reload())
        .catch((err) => {
          console.log(err);
        });
    },
    editComment(id, text) {
      this.commentEdit = text;
      this.comment_id = id;
    },
    showDescript() {
      if (!this.descript) {
        this.descript = true;
        document.getElementById("clickshow").innerHTML = "Hide";
        document.getElementById("descriptNovel").style.height = "auto";
      } else {
        document.getElementById("descriptNovel").style.height = "120px";
        document.getElementById("clickshow").innerHTML = "Read more";
        this.descript = false;
      }

      // document.getElementById('descriptNovel').style.height="auto"
      // document.getElementById('descriptNovel').style.overflow ="auto"
    },
  },
};
</script>
