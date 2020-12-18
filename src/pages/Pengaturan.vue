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
          <form @submit.prevent="insertData" id="addDataUserForm">
            <div class="relative p-6 flex-auto">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                  <input class="hidden" type="text" name="" id="" v-model="editDataUser.id_user">
                  <input class="hidden" type="text" name="" id="" v-model="editDataUser.id_dosen">
                  <input class="hidden" type="text" name="" id="" v-model="editDataUser.id_mahasiswa">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="nama">
                    Nama Lengkap
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="nama" type="text" v-model="editDataUser.nama" required>
                  <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="alamat">
                    Alamat
                  </label>
                  <textarea class="resize-y appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline focus:border-gray-500" id="alamat" v-model="editDataUser.alamat" required></textarea>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="username">
                    Username atau Email
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="username" type="text" placeholder="Username" v-model="editDataUser.username" required>
                  <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
                    Password
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="password" type="text" placeholder="Password" v-model="addDataUser.password" required>
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
// const api_url = 'http://localhost:8080/api';

export default {
    name: 'User',
    data() {
        return {
          user_data: [],
          headers: [
             { text: 'No.', value: 'num' },
             { text: 'Nama', value: 'nama' },
             { text: 'Username', value: 'username' },
             // { text: 'password', value: 'password' },
             { text: 'Alamat', value: 'alamat' },
             { text: 'Pilihan' },
          ],
          search: '',
          editDataUser: [],
          addModalShow: false,
          addDataUser: {},
          success_message: ''
        }
    },
    computed: {
      items() {
        return this.user_data.map((d, index) => ({
          ...d,
          num: index + 1
        }))
      }
    },
    methods: {
      getData: function(){
        if (JSON.parse(localStorage.item).level == 2) {
          this.$axios
            .post(this.$store.state.url.BASE_API + `/showmahasiswa`, {
              id_user: JSON.parse(localStorage.item).id_user
            }, {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
            },
          })
          .then((data) => {
            console.log(data);
            this.selectData(data.data[0]);
          }).catch(err => {
            console.error(err);
          });
        } else {
          this.$axios
            .post(this.$store.state.url.BASE_API + `/showdosen`, {
              id_user: JSON.parse(localStorage.item).id_user
            }, {
              headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
          })
          .then((data) => {
            console.log(data);
            this.selectData(data.data[0]);
          }).catch(err => {
            console.error(err);
          });
        }

      },
      selectData: function(row){
        if (JSON.parse(localStorage.item).level == 2) {
          this.editDataUser = {
            id_user: `${row.id_user}`,
            id_mahasiswa: `${row.id_mahasiswa}`,
            nama: `${row.nama}`,
            alamat: `${row.alamat}`,
            username: `${row.username}`
          }
        } else {
          this.editDataUser = {
            id_user: `${row.id_user}`,
            id_dosen: `${row.id_dosen}`,
            nama: `${row.nama}`,
            alamat: `${row.alamat}`,
            username: `${row.username}`
          }
        }
      },
      insertData: function(e){
        if (JSON.parse(localStorage.item).level == 2) {
          this.$axios
          .put(this.$store.state.url.BASE_API + `/mahasiswa/${this.editDataUser.id_mahasiswa}`, this.editDataUser)
          .then(data => {
            this.getData();
            this.editModalShow = !this.editModalShow
            this.successMessage('diupdate');
          }).catch(err => {
            console.error(err);
          });
        } else {
          this.$axios
          .put(this.$store.state.url.BASE_API + `/dosen/${this.editDataUser.id_dosen}`, this.editDataUser)
          .then(data => {
            this.getData();
            this.editModalShow = !this.editModalShow
            this.successMessage('diupdate');
          }).catch(err => {
            console.error(err);
          });
        }
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
