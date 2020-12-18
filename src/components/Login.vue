<template lang="html">
  <div class="bg-teal-100 h-screen font-sans">
      <div class="container mx-auto h-full flex justify-center items-center">
          <div class="w-full">
              <h1 class="font-hairline mb-6 text-center text-xl font-bold">Aplikasi Absensi</h1>
              <div class="border-teal-500 p-8 border-t-12 bg-teal-300 mb-6 rounded-lg shadow-lg">
                <form @submit.prevent="login">
                  <div class="mb-4">
                      <label class="font-bold text-grey-darker block mb-2">Username or Email</label>
                      <input v-model="username" type="text" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" placeholder="Your Username">
                  </div>

                  <div class="mb-4">
                      <label class="font-bold text-grey-darker block mb-2">Password</label>
                      <input v-model="password" type="text" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" placeholder="Your Password">
                  </div>

                  <div class="flex items-center justify-end">
                      <button type="submit" class="bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded items-end">
                          Login
                      </button>
                  </div>
                </form>
              </div>
              <!-- <p> {{anu}} </p> -->
              <!-- <div class="text-center">
                  <p class="text-grey-dark text-sm">Don't have an account? <a href="#" class="no-underline text-blue font-bold">Create an Account</a>.</p>
              </div> -->
          </div>
      </div>
  </div>
</template>

<script>
// const base_url = 'http://localhost:8080/';
// const api_url = 'http://localhost:8080/api';
// const api_url = 'http://localhost/absensiapi/public/api/login';
const base_url = 'http://localhost/';
// const base_url = 'http://localhost/';
const api_url = 'http://192.168.1.103/absensiapi/public/api/login';
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default {
  data(){
    return {
        username: '',
        password: '',
        anu: null
    }
  },
  methods: {
    login: function() {
      if (this.username != '' && this.password != '') {
        this.$axios.post(api_url, {
          request: 1,
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          console.log(response);
          // this.anu = JSON.stringify(response);
          if (response.data[0]) {
            if (response.data[0].level == 0) {
              localStorage.menuDosen = true;
              localStorage.menuMahasiswa = true;
              localStorage.menuMk = true;
              localStorage.menuAbsen = true;
              localStorage.menuJadwal = true;
              localStorage.daftarJadwal = false;
              localStorage.menuDaftarmk = false;
              localStorage.hapusJadwal = true;
            } else if (response.data[0].level == 1) {
              localStorage.menuDosen = false;
              localStorage.menuMahasiswa = false;
              localStorage.menuMk = true;
              localStorage.menuAbsen = true;
              localStorage.menuJadwal = true;
              localStorage.menuDaftarmk = false;
              localStorage.daftarJadwal = false;
              localStorage.hapusJadwal = true;
            } else {
              localStorage.menuDosen = false;
              localStorage.menuMahasiswa = false;
              localStorage.menuMk = false;
              localStorage.menuAbsen = true;
              localStorage.menuJadwal = true;
              localStorage.menuDaftarmk = true;
              localStorage.daftarJadwal = true;
              localStorage.hapusJadwal = false;
            }
            localStorage.item = JSON.stringify(response.data[0]);
            alert('Login Successfully');
            // alert(response.data[0].id_user);
            window.location = `${base_url}`;
            // alert(window.location.href + " | " + api_url);
          } else {
            alert("User does not exist");
          }
        })
        .catch(function(error) {
          console.log(error);
          // alert(error + " | " + window.location.href + " | " + api_url);
          alert(error);
        });
        // const options = {
        //   url: api_url,
        //   method: 'GET'
        // }
        // // console.log(JSON.parse(localStorage.daftarAll));
        // this.$axios(options)
        //   .then(response => {
        //     this.anu = JSON.stringify(response);
        //     // this.dosen_data = response.data['data']
        //     // console.log(this.dosen_data);
        //     // console.log(JSON.parse(localStorage.item));
        //     alert(this.anu);
        //   })
        //   .catch(error => alert(error))
      } else {
        alert('Please enter username & password');
      }
      // e.preventDefault();
    }
  }
}
</script>

<style lang="css" scoped>
</style>
