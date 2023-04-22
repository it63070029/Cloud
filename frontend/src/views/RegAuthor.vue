<template>
    <section class="section" id="app">
       <div class="content">
            <center><div class="title mb-5">Apply to be a Author</div></center>
            <div class="columns">
                <div class="column is-4"></div>
                <div class="column is-4" >
                    <div class="card">
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
                            <label class="label">Alias :</label>
                            <div class="control">
                                <input class="input" type="text" v-model="alias">
                            </div>
                        </div>
                        <footer class="card-footer">
                            <div class="card-footer-item">
                                <button class="button is-primary is-rounded" @click="applyToAuthor">Submit</button>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
       </div>
    </section>
</template>

<script>
  import axios from '@/plugins/axios'
    // @ is an alias to /src
    export default {
        props: ['user'],

    data() {
        return {
            users : this.user,
            alias: '',
        };
    },
    methods: {
        applyToAuthor(){
            if (this.alias != ''){
                axios
                .put(`http://localhost:3000/applyAuthor/${this.users.user_id}`, {
                    alias: this.alias
                })
                .then((res)=>{
                    console.log(res)
                    this.$router.push({name: 'authorBook', params: { user_id: this.users.user_id }})
                    document.location.reload(true);
                })
                .catch((e) => console.log(e));
            }
            else {
                alert('Please add your alias')
            }
        }
    },
};
</script>
