<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper green darken-1">
        <a href="#" class="brand-logo center"> Personas en db.json </a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(error, index) of errors" :key="index">
          campo <b>{{error.field}}</b> - {{error.defaultMessage}}
          
        </li>
      </ul>

      <h5 id="titulo">Formulario de inscripcion usuarios </h5>
      <form @submit.prevent="guardar">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" v-model="person.first_name" required>
          <label>Apellido</label>
          <input type="text" placeholder="Apellido" v-model="person.last_name" required>
          <label>Correo</label>
          <input type="email" placeholder="Correo" v-model="person.email" required>

          <button class="waves-effect waves-light btn-small"> Guardar <i class="material-icons left">save</i></button>
      </form>

      <hr/>

      <h5 id="titulo"> Personas registradas </h5>

      <div class="overflow-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align= "center"
        ></b-pagination>

         <p class="mt-3" align="center"> Current Page: {{ currentPage }}</p>

        <b-table 
          id="my-table"
          :items="people"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          striped
          responsive="sm"
        >
          <template slot="id" slot-scope="row">
            {{row.value}}
          </template>

          <template slot="first_name" slot-scope="row">
            {{row.value}}
          </template>

          <template slot="last_name" slot-scope="row">
            {{row.value}}
          </template>

          <template slot="email" slot-scope="row">
            {{row.value}}
          </template>

          <template slot="options" slot-scope="row">
            <button @click="editar(row.item)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
            <button @click="remover(row.item.id)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
          </template>

          <template slot="row-details" slot-scope="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import People from './services/peoples'

export default{
  data(){
    return {
      perPage: 10,
      currentPage: 1,
      person:{
        id: '',
        first_name: '',
        last_name: '',
        email: ''
      },
      fields: [
        {key: 'id', label: 'id'},
        {key: 'first_name', label: 'Nombre'},
        {key: 'last_name', label: 'Apellido'},
        {key: 'email', label: 'Correo'},
        {key: 'options', label: 'Opciones'}
      ],
      errors: []
    }
  },

  mounted(){
    this.obtenerPeople();
  },

  computed: {
    rows(){
      return this.people.length
    },

    people(){
      return this.$store.state.people;
    }
  },

  methods:{
    async obtenerPeople() {
      await this.$store.dispatch('obtenerPeople');
    },

    async guardar(){

       if(!this.person.id){
          await this.$store.dispatch('guardarPersona', this.person)
          this.person = {
             id: '',
             first_name: '',
             last_name: '',
             email: ''
          }
          alert('Guardado satisfactoriamente')
          this.obtenerPeople()
        }  
      else{
          await this.$store.dispatch('editarPersona', this.person)
          this.person = {
            id: '',
            first_name: '',
            last_name: '',
            email: ''
          }
          alert('Actualizado satisfactoriamente')
          this.obtenerPeople()
       }
    },

    editar(person){
      this.person = person
    },

    async remover(peopleId){
      if (confirm('Esta seguro que quiere eliminar a este usuario?')) {
        await this.$store.dispatch('eliminarPersona', peopleId)
        alert('Usuario borrado con exito')
        this.obtenerPeople()
      }
    }

  }
}


</script>

<style>

#titulo{
  display: block;
  margin-top: 20px;
}

</style>
