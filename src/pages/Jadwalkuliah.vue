<template>
    <div id="jadwalkuliah">

        <!-- breadcrumb -->
        <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
          <ol class="list-none p-0 inline-flex">
            <li class="flex items-center text-blue-500">
              <a href="#" class="text-gray-700">Home</a>
              <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center">
              <a href="#" class="text-gray-600">Jadwal Kuliah</a>
            </li>
          </ol>
        </nav>
        <!-- breadcrumb end -->

      <div class="lg:flex justify-between items-center mb-6">
        <div class="text-2xl font-semibold mb-2 lg:mb-0">
          <v-text-field
            v-model="search"
            append-icon="fa fa-search"
            label="Cari"
            single-line
            hide-details
          ></v-text-field>
        </div>
        <button @click="addModalShow = !addModalShow" class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-3 py-1 text-white font-semibold shadow">
          <i class="fa fa-plus-circle"></i> Tambah Data
        </button>
      </div>
      <div v-if="success_message!==''" role="alert">
        <div class="bg-green-500 text-white font-bold rounded-t px-4 py-2">
          Sukses
          <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="successMessage('')">
            <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        <div class="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
          <p>Data berhasil {{success_message}}.</p>
        </div>
      </div>
      <div class="flex flex-wrap mb-20">
        <div class="w-full" data-app>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            class="elevation-1"
            :footer-props="{
              showFirstLastPage: true,
              firstIcon: 'fa fa-angle-double-left',
              lastIcon: 'fa fa-angle-double-right',
              prevIcon: 'fa fa-angle-left',
              nextIcon: 'fa fa-angle-right'
            }"
          >
            <template v-slot:item="row">
              <tr class="text-xs-center">
                <td>{{row.item.num}}</td>
                <td>{{row.item.nama_mk}}</td>
                <td>{{row.item.nama}}</td>
                <td>{{row.item.tgl_jadwal}}</td>
                <td>{{row.item.waktu_jadwal}}</td>
                <td style="width:auto">
                  <div class="flex justify-center">
                    <button class="text-black bg-yellow-500 border border-solid border-yellow-600 font-bold hover:bg-yellow-400 active:bg-yellow-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="selectData(row.item); editModalShow = !editModalShow" title="Edit Data">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="text-black bg-red-500 border border-solid border-red-600 font-bold hover:bg-red-400 active:bg-red-200 uppercase text-sm py-2 px-4 rounded outline-none focus:outline-none m-1" @click="deleteData(row.item.id_jadwal)" title="Hapus Data">
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </div>
      <!-- <button @click="console()">tes</button> -->


      <!-- ADD MODAL -->
      <div v-if="addModalShow" class="overflow-x-hidden overflow-y-auto fixed md:mx-6 sm:px-6 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex rounded">
        <div class="relative w-3/4 my-6 mx-auto max-w-6xl mx-6">
          <!--content-->
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <!--header-->
            <div class="flex items-start bg-blue-500 justify-between p-2 border-b border-solid border-gray-300 rounded-t">
              <h3 class="text-3xl font-semibold text-white">
                Tambah Data Jadwal
              </h3>
              <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="addModalShow = !addModalShow">
                <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <!--body-->
            <form @submit.prevent="insertData" id="addDataJadwalForm">
              <div class="relative p-6 flex-auto">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="id_mk">
                      Nama Mata Kuliah
                    </label>
                    <!-- <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="nama_mk" type="text" v-model="addDataJadwal.nama_mk" required> -->
                    <select class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="id_mk" v-model="addDataJadwal.id_mk" required>
                        <option selected></option>
                        <option v-for="item in mk_data" :key="item.id_user" :value="item.id_mk">{{item.nama_mk}}</option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="id_user">
                      Nama Dosen
                    </label>
                    <select class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="id_user" v-model="addDataJadwal.id_user" required>
                        <option selected></option>
                        <option v-for="item in dosen_data" :key="item.id_user" :value="item.id_user">{{item.nama}}</option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="username">
                      Tanggal
                    </label>
                    <template>
                      <v-menu
                        v-model="date1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateFormatted"
                            prepend-icon="fa fa-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          header-color="bg-blue-500"
                          @input="date1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </template>
                    <!-- <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="username" type="text" placeholder="Username" v-model="addDataJadwal.username" required> -->
                    <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                  </div>
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="waktu_jadwal">
                      Waktu
                    </label>
                    <!-- <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="waktu_jadwal" type="text" placeholder="Contoh: 13:00" v-model="addDataJadwal.waktu_jadwal" required> -->
                    <template>
                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="waktu_jadwal"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="waktu_jadwal"
                            prepend-icon="fa fa-clock-o"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="waktu_jadwal"
                          header-color="bg-blue-500"
                          full-width
                          @click:minute="$refs.menu.save(waktu_jadwal)"
                        ></v-time-picker>
                      </v-menu>
                    </template>
                    <!-- <p class="text-red-500 text-xs italic">Gunakan Format 24 Jam.</p> -->
                  </div>
                </div>
              </div>
              <!--footer-->
              <div class="flex items-center bg-blue-500 justify-end p-2 border-t border-solid border-gray-300 rounded-b">
                <button class="text-black bg-gray-200 border border-solid border-gray-500 hover:bg-gray-200 hover:bg-gray-400 active:bg-gray-500 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="addModalShow = !addModalShow">
                  Close
                </button>
                <button type="submit" class="text-black bg-teal-400 hover:bg-teal-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"  style="transition: all .15s ease">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-if="addModalShow" class="opacity-25 fixed inset-0 z-40 bg-black"></div>

      <!-- EDIT MODAL -->
      <div v-if="editModalShow" class="overflow-x-hidden overflow-y-auto fixed md:mx-6 sm:px-6 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex rounded">
        <div class="relative w-3/4 my-6 mx-auto max-w-6xl mx-6">
          <!--content-->
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <!--header-->
            <div class="flex items-start bg-yellow-300 justify-between p-2 border-b border-solid border-gray-300 rounded-t">
              <h3 class="text-3xl font-semibold">
                Edit Data Jadwal
              </h3>
              <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="editModalShow = !editModalShow">
                <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <!--body-->
            <form @submit.prevent="editData" id="editDataJadwalForm">
              <div class="relative p-6 flex-auto">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                    <input type="hidden" v-model="editDataJadwal.id_jadwal" id="id_jadwal">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="id_mk">
                      Nama Mata Kuliah
                    </label>
                    <select class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="id_mk" v-model="editDataJadwal.id_mk" disabled>
                        <option v-for="item in mk_data" :key="item.id_user" :value="item.id_mk">{{item.nama_mk}}</option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="id_user">
                      Nama Dosen
                    </label>
                    <select class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="id_user" v-model="editDataJadwal.id_user" required>
                        <option v-for="item in dosen_data" :key="item.id_user" :value="item.id_user">{{item.nama}}</option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="username">
                      Tanggal
                    </label>
                    <template>
                      <v-menu
                        v-model="date1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateFormatted"
                            prepend-icon="fa fa-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          header-color="bg-blue-500"
                          @input="date1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </template>
                    <!-- <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="username" type="text" placeholder="Username" v-model="addDataJadwal.username" required> -->
                    <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                  </div>
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="waktu_jadwal">
                      Waktu
                    </label>
                    <!-- <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline hover:shadow-outline" id="waktu_jadwal" type="text" placeholder="Contoh: 13:00" v-model="addDataJadwal.waktu_jadwal" required> -->
                    <template>
                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="editDataJadwal.waktu_jadwal"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editDataJadwal.waktu_jadwal"
                            prepend-icon="fa fa-clock-o"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="editDataJadwal.waktu_jadwal"
                          header-color="bg-blue-500"
                          full-width
                          @click:minute="$refs.menu.save(editDataJadwal.waktu_jadwal)"
                        ></v-time-picker>
                      </v-menu>
                    </template>
                    <!-- <p class="text-red-500 text-xs italic">Gunakan Format 24 Jam.</p> -->
                  </div>
                </div>
              </div>
              <!--footer-->
              <div class="flex items-center bg-yellow-300 justify-end p-2 border-t border-solid border-gray-300 rounded-b">
                <button class="text-black bg-gray-200 border border-solid border-gray-500 hover:bg-gray-200 hover:bg-gray-400 active:bg-gray-500 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="editModalShow = !editModalShow">
                  Close
                </button>
                <button type="submit" class="text-black bg-yellow-300 hover:bg-yellow-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"  style="transition: all .15s ease">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-if="editModalShow" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
</template>

<script>
import axios from 'axios';
const api_url = 'http://localhost:8080/api';

export default {
    name: 'Jadwalkuliah',
    data() {
        return {
          date: new Date().toISOString().substr(0, 10),
          dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
          waktu_jadwal: null,
          modal: false,
          date1: false,
          menu2: false,
          jadwal_data: [],
          mk_data: [],
          dosen_data: [],
          headers: [
             { text: 'No.', value: 'num' },
             { text: 'Nama Mata Kuliah', value: 'nama_mk' },
             { text: 'Nama Dosen', value: 'nama' },
             { text: 'Tanggal', value: 'tgl_jadwal' },
             { text: 'Waktu', value: 'waktu_jadwal' },
             { text: 'Pilihan' }
          ],
          search: '',
          addModalShow: false,
          editModalShow: false,
          addDataJadwal: {},
          editDataJadwal: {},
          success_message: ''
        }
    },
    computed: {
      items() {
        return this.jadwal_data.map((d, index) => ({
          ...d,
          num: index + 1
        }))
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date);
        this.editDataJadwal.tgl_jadwal = this.dateFormatted;
      }
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`;
      },
      parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      getData: function(){
        const options = {
          url: `${api_url}/jadwalkuliah`,
          method: 'GET'
        }
        const optionsMk = {
          url: `${api_url}/matakuliah`,
          method: 'GET'
        }
        const optionsDosen = {
          url: `${api_url}/dosen`,
          method: 'GET'
        }

        this.$axios(options)
          .then(response => {
            this.jadwal_data = response.data['data']
            console.log(this.jadwal_data);
          })
          .catch(error => console.log(error));
        this.$axios(optionsMk)
          .then(response => {
            this.mk_data = response.data['data']
            console.log(this.mk_data);
          })
          .catch(error => console.log(error));
        this.$axios(optionsDosen)
          .then(response => {
            this.dosen_data = response.data['data']
            console.log(this.dosen_data);
          })
          .catch(error => console.log(error));
      },
      insertData: function(e){
        this.$axios
          .post(`${api_url}/jadwalkuliah`, {
            id_mk: `${this.addDataJadwal.id_mk}`,
            id_user: `${this.addDataJadwal.id_user}`,
            tgl_jadwal: `${this.dateFormatted}`,
            waktu_jadwal: `${this.waktu_jadwal}`
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
      selectData: function(row){
         this.editDataJadwal = {
           id_jadwal: `${row.id_jadwal}`,
           id_mk: `${row.id_mk}`,
           id_user: `${row.id_user}`,
           tgl_jadwal: `${row.tgl_jadwal}`,
           waktu_jadwal: `${row.waktu_jadwal}`
         },
         this.dateFormatted = `${row.tgl_jadwal}`
      },
      console: function() {
        console.log(this.waktu_jadwal);
        console.log(this.dateFormatted);
        console.log(this.addDataJadwal.nama_mk);
        console.log(this.addDataJadwal.nama);
      },
      editData: function(){
        this.$axios
          .put(`${api_url}/jadwalkuliah/${this.editDataJadwal.id_jadwal}`, this.editDataJadwal)
          .then(data => {
            this.getData();
            this.editModalShow = !this.editModalShow
            this.successMessage('diupdate');
          }).catch(err => {
            console.error(err);
          });
      },
      deleteData: function(id){
        this.$confirm("Apakah Kamu yakin ingin menghapus data ini?").then(conf => {
          if(conf){
            this.$axios
              .delete(`${api_url}/jadwalkuliah/${id}`)
              .then(data => {
                this.getData();
                this.successMessage('dihapus');
              }).catch(err => {
                console.error(err);
              })
          }
        });
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
