import { http } from './config'

export default{

	listar:() =>{
		return http.get('/people/')
	},

	guardar:(people) =>{
		return http.post('/people/add', people)
	},

	actualizar:(people) =>{
		return http.put(`/people/update/${people.id}`, people)
	},

	eliminar:(peopleId) =>{
		return http.delete(`/people/delete/${peopleId}`)
	}
}
