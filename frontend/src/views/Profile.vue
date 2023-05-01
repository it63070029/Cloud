<template>
    <section class="section" id="app">
       <div class="content">
            <center><div class="title mb-5">My Profile</div></center>
            <div class="columns">
                <div class="column is-4"></div>
                <div class="column is-4" >
                    <div class="card">
                        <div class="card-image pt-5">
                            <figure class="image">
                                <img
                                style="height: 200px;width: 180px;"
                                src="users.image"
                                alt="Placeholder image"
                                />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="columns">
                                <div class="column is-4 ml-6">
                                    <!-- <div class="subtitle my-3">Username: </div> -->
                                    <div class="subtitle my-3">Firstname: </div>
                                    <div class="subtitle my-5">Lastname: </div>
                                    <div class="subtitle my-3">Email: </div>
                                </div>
                                <div class="column mr-6">
                                    <!-- <input class="input my-1 mr-6" type="text" disabled v-model="users.username"/> -->
                                    <input class="input my-1" type="text" disabled v-model="users.firstname"/>
                                    <input class="input my-1" type="text" disabled v-model="users.lastname"/>
                                    <input class="input my-1" type="text" disabled v-model="users.email"/>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a class="card-footer-item" @click="modalEditProfile=!modalEditProfile">
                                <span class="icon-text">
                                    <span class="icon">
                                        <i class="far fa-edit"></i>
                                    </span>
                                    <span>Edit </span>
                                </span>
                            </a>
                        </footer>
                    </div>
                </div>
            
            </div>
            <!-- Modal Edit Profile -->
            <div class="modal" v-bind:class="{'is-active':modalEditProfile}">
            <div class="modal-background" @click="modalEditProfile = !modalEditProfile"></div>
                <div class="modal-card" style="max-width: 960px;width: 50%;">
                    <header class = "modal-card-head">
                     <p class = "modal-card-title">Edit Profile</p>
                     <button class = "delete" aria-label = "close" @click="modalEditProfile = !modalEditProfile"></button>
                    </header>
                    <section class="modal-card-body">
                        <!-- <center> -->
                        <!-- <div class="column " > -->
                            <div class="columns">
                                <div class="column">
                                    <label class="label">Image Profile:</label>
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
                                    
                                    <!-- <label class="label">Username:</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="users.username">
                                    </div> -->
                                    <label class="label">Firstname:</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="users.firstname">
                                    </div>
                                    <label class="label">Lastname:</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="users.lastname">
                                    </div>
                                    <label class="label">Email:</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="users.email">
                                    </div>
                                </div>
                            </div>
                            
                            <center>
                            <button class = "button mx-1"  @click="modalEditProfile = !modalEditProfile">cancel</button>
                            <button class = "button mx-1"  @click="editProfile()">Save</button>
                            </center>
                        <!-- </div> -->
                        
                    </section>
                </div>
            </div>
       </div>
    </section>
</template>
    
<script >
  import axios from '@/plugins/axios'
    // @ is an alias to /src
    export default {
        props: ['user'],
        
    
    data() {
        return {
            users : this.user,
            modalEditProfile:false,
            newImage:[]
        };
    },
    methods: {
        imagePath(file_path) {
            if (file_path) {
                return "http://localhost:3000/" + file_path;
            } 
            else {
                return "https://bulma.io/images/placeholders/640x360.png";
            }
        },
    
        selectImages(event) {
            var fileData = event.target.files[0];
        
            if(this.newImage.length>=1){
                this.newImage.splice(0, 1);
                this.newImage.push(fileData)

            }
            else{
                this.users.image=[];
                this.newImage.push(fileData)
            }
        },
        editProfile(){
            let formData = new FormData();
            // formData.append("username", this.users.username);
            formData.append("firstname", this.users.firstname);
            formData.append("lastname", this.users.lastname);
            formData.append("email", this.users.email);
            if(this.newImage.length>0){
                formData.append("newImage", this.newImage[0]);
            }
            else{
                formData.append("image", this.users.image[0]);
            }

            axios
            .put(`http://18.206.137.146:3000/profile/${this.users.user_id}`,formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then((res)=>{
                this.modalEditProfile = false;
                this.$router.push('/profile')}
            )
            .catch((e) => console.log(e));
        }
    },
        
    
};
    </script>
