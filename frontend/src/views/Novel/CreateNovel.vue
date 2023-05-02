<template>
  <div class="container is-widescreen">
    <section class="section" id="app">
      <div class="content">
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
      <div v-if="image" class="columns is-multiline">
        <div v-for="(image, index) in image" :key="image.id" class="column is-one-quarter">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image" />
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
            <input class="input" type="text" placeholder="title" v-model="title"/>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
            <label class="label">Description :</label>
            <textarea class="input" rows="5" placeholder="description" v-model="description"></textarea>
          </div>
          
        </div>
        <div class="columns">
          <div class="column is-3"></div>
          <div class="column is-6">
              <button class="button mr-3 is-success" @click="createNovel()">Create</button>
              <button class="button is-danger" @click="cancelCreateNovel()">Cancel</button>
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
      image:[],
      title:"",
      description:"",
    };
  },
 
  methods: {
    cancelCreateNovel(){
        this.$router.push({ name: 'authorBook', params: { user_id: this.users.user_id }})
    },
    selectImages(event) {
        var fileData = event.target.files[0];
        // this.image.push(fileData)
        if(this.image.length>=1){
            this.image.splice(0, 1);
            this.image.push(fileData)

        }
        else{
            this.image.push(fileData)
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
    createNovel(){
        let formData = new FormData();
        formData.append("title", this.title);
        formData.append("description", this.description);
        formData.append("image", this.image[0]);
        console.log(this.users.user_id)
        axios
        .post(`http://3.84.45.245:3000/novel/createNovel/${this.users.user_id}`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            },
        })
        .then(()=>  this.$router.push({ name: 'authorBook', params: { user_id: this.users.user_id }}))
        .catch((err)=>console.log(err.response.data));
            

        
        
    }
  },
};
</script>
