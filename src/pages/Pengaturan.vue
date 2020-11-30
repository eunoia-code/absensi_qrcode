<template>
    <div id="pengaturan">

        <!-- breadcrumb -->
        <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
          <ol class="list-none p-0 inline-flex">
            <li class="flex items-center text-blue-500">
              <a href="#" class="text-gray-700">Home</a>
              <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center">
              <a href="#" class="text-gray-600">Pengaturan</a>
            </li>
          </ol>
        </nav>
        <!-- breadcrumb end -->

      <div class="relative mx-auto">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start bg-blue-500 justify-between p-2 border-b border-solid border-gray-300 rounded-t">
            <h3 class="text-3xl font-semibold text-white">
              Informasi User
            </h3>
          </div>
          <!--body-->
          <form @submit.prevent="insertData" id="addDataDosenForm">
            <div class="relative p-6 flex-auto">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="nama">
                    Nama Lengkap
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="nama" type="text" v-model="addDataDosen.nama" required>
                  <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="isi_surat">
                    Alamat
                  </label>
                  <textarea class="resize-y appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="alamat" v-model="addDataDosen.alamat" required></textarea>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="username">
                    Username atau Email
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="username" type="text" placeholder="Username" v-model="addDataDosen.username" required>
                  <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
                    Password
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="password" type="text" placeholder="Password" v-model="addDataDosen.password" required>
                  <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
              </div>
            </div>
            <!--footer-->
            <div class="flex items-center bg-blue-500 justify-end p-2 border-t border-solid border-gray-300 rounded-b">
              <button type="submit" class="text-black bg-white hover:bg-teal-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"  style="transition: all .15s ease">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
const api_url = 'http://localhost:8080/api';

export default {
    name: 'Dosen',
    data() {
        return {
          dosen_data: [],
          headers: [
             { text: 'No.', value: 'num' },
             { text: 'Nama', value: 'nama' },
             { text: 'Username', value: 'username' },
             // { text: 'password', value: 'password' },
             { text: 'Alamat', value: 'alamat' },
             { text: 'Pilihan' },
          ],
          search: '',
          addModalShow: false,
          addDataDosen: {},
          success_message: ''
        }
    },
    computed: {
      items() {
        return this.dosen_data.map((d, index) => ({
          ...d,
          num: index + 1
        }))
      }
    },
    methods: {
      getData: function(){
        const options = {
          url: `${api_url}/dosen`,
          method: 'GET'
        }

        this.$axios(options)
          .then(response => {
            this.dosen_data = response.data['data']
            console.log(this.dosen_data);
          })
          .catch(error => console.log(error))
      },
      insertData: function(e){
        let id_user = this.getUniqid()

        this.$axios
          .post(`${api_url}/users`, {
            id_user: id_user,
            username: `${this.addDataDosen.username}`,
            password: `${this.addDataDosen.password}`,
            level: 1
          }, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
         })
        .then((data) => {
          this.getData();
          this.successMessage('ditambahkan');
        }).catch(err => {
          console.error(err);
        });

        this.$axios
          .post(`${api_url}/dosen`, {
            id_dosen: this.getUniqid(),
            id_user: id_user,
            nama: `${this.addDataDosen.nama}`,
            alamat: `${this.addDataDosen.alamat}`
          }, {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
         })
        .then((data) => {
          this.getData();
          this.successMessage('ditambahkan');
        }).catch(err => {
          console.error(err);
        });

        this.addModalShow = !this.addModalShow
        e.preventDefault();
      },
      getUniqid: function(){
        let uniqid = require('uniqid');
        return uniqid();
      },
      successMessage: function(msg){
        this.success_message = msg;
      }
    },
    mounted () {
      this.getData()
    }
}
</script>
