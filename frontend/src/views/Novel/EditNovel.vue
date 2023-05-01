<template>
  <div class="container is-widescreen">
    <section class="section" id="app">
      <div class="content">
        <center><div class="title">Edit Novel</div></center>
        <div class="columns">
            <div class="column is-3"></div>
            <div class="column is-6">
                <div class="file">
                    <label class="file-label">
                        <input class="file-input" type="file" accept="image/png, image/jpeg, image/webp" @change="selectImages($event)">
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                Choose a file…
                            </span>
                        </span>
                    </label>
                </div>
                <!-- oldImage -->
      <div v-if="image" class="columns is-multiline">
        
        <div v-for="(image, index) in image" :key="image.id" class="column is-one-quarter">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="imagePath(image)" alt="Placeholder image" />
              </figure>
            </div>
            <footer class="card-footer">
              <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger">Delete</a>
            </footer>
          </div>
        </div>
      </div>
      <!-- new Image -->
      <div v-if="newImage" class="columns is-multiline">
        
        <div v-for="(image, index) in newImage" :key="image.id" class="column is-one-quarter">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image">
              </figure>
            </div>
            <footer class="card-footer">
              <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger">Delete</a>
            </footer>
          </div>
        </div>
      </div>
            </div>
        </div>
       <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
            <label class="label">Title :</label>
            <input class="input" type="text" placeholder="title" v-model="selectNovel[0].title"/>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
            <label class="label">Description :</label>
            <textarea class="input" rows="5" placeholder="description" v-model="selectNovel[0].descript"></textarea>
          </div>
          
        </div>
        <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
              <button class="button mr-3 is-success" @click="editNovel()">Save</button>
              <button class="button is-danger" @click="cancelEditNovel()">Cancel</button>
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
      selectNovel:[],
      image:[],
      newImage:[]
    };
  },
  mounted() {
    this.getNovel();
  },
 
  methods: {
    cancelEditNovel(){
        this.$router.push({ name: 'authorBook',params: {user_id: this.users.user_id }})
    },
    editNovel(){
     let formData = new FormData();
        formData.append("title", this.selectNovel[0].title);
        formData.append("descript", this.selectNovel[0].descript);
      if(this.image.length==0){
        formData.append("newImage", this.newImage[0]);
      }
      else{
        formData.append("image", this.image[0]);
      }
        axios
        .put(`http://18.206.137.146:3000/novel/${this.$route.params.novel_id}/${this.users.user_id}`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            },
        })
        .then((res) => this.$router.push({name: 'authorBook',params: {user_id: this.users.user_id}}))
        .catch((e) => console.log(e.response.data));
    },
    getNovel(){
        axios
        .get(`http://18.206.137.146:3000/novel/${this.$route.params.novel_id}`)
        .then((res)=>{
            this.selectNovel = res.data.selectNovel;
            this.image.push(res.data.selectNovel[0].image)
        })
        .catch((e) => console.log(e.response.data));
    },
    selectImages(event) {
        var fileData = event.target.files[0];
        
        if(this.newImage.length>=1){
            this.newImage.splice(0, 1);
            this.newImage.push(fileData)

        }
        else{
          this.image.splice(0, 1);
          this.newImage.push(fileData)
        }
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.image);
      this.image = Array.from(this.image);
      this.image.splice(index, 1);
      
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
  },
};
</script>
