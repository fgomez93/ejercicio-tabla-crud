import Vue from 'vue'
import Vuex from 'vuex'
import { http } from '../services/config'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		people: [],
	},

	mutations: {
		['OBTENER_PEOPLE'](state, people){
			state.people = people
		},

		['GUARDAR_PERSONA'](state, person){
			state.people.push(person)
		},
	
		['EDITAR_PERSONA'](state, people){
			var persons = state.people
			persons.splice(persons.indexOf(people), 1)
			state.people = persons
		},
	
		['ELIMINAR_PERSONA'](state, people){
			var persons = state.people
			persons.splice(persons.indexOf(people), 1)
		}
	},

    actions: {
		obtenerPeople({commit}){
			return new Promise((resolve, reject) => {
				http.get('/people/')
					.then(response => {
						if (response.data) {
							commit('OBTENER_PEOPLE', response.data)
							resolve(response.data)
						} else {
							console.log(response)
							reject(response)
						}
					})
					.catch(error => {
						console.error(error)
						reject(response)
					});
			});
		},

		guardarPersona({commit}, person){
			return new Promise((resolve, reject) => {
				http.post('/people/add', person)
					.then(response => {
						if (response.data){
							commit('GUARDAR_PERSONA')
							resolve(response.data)
						}else{
							console.log(response)
							reject(response)
						}
					})
					.catch(error => {
						console.error(error)
						reject(response)
					});
			});
		},
	
		editarPersona({commit}, person){
			return new Promise((resolve, reject) => {
				http.put(`/people/update/${person.id}`, person)
					.then(response => {
						if (response.data) {
							commit('EDITAR_PERSONA', response.data)
							resolve(response.data)
						}else{
							console.log(response)
							reject(response)
						}
					})
					.catch(error => {
						console.error(error)
						reject(response)
					});
			});
		},
	
		eliminarPersona({commit}, personId){
			return new Promise((resolve, reject) => {
				http.delete(`/people/delete/${personId}`, personId)
					.then(response => {
						if (response.data) {
							commit('ELIMINAR_PERSONA', personId)
							resolve(response.data)
						}else{
							console.log(response)
							reject(response)
						}
					})
					.catch(error => {
						console.error(error)
						reject(response)
					});
			});
		}
	}
})