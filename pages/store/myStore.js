import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const lists = {
	list:[],
	num:3
}
const dataobj = {
	loading:null,
	nav:'recommend',
	count:0
}
const strategyCity = {
	city:''
}
const uploadCity = {
	city:''
}
const load = {
	load:'more'
}

const nonedata = {
	none:''
}
const updateMuta = {
	update:false
} 
const state = {
	lists,
	dataobj,
	load,
	nonedata,
	strategyCity,
	uploadCity,
	updateMuta
}

export default new Vuex.Store({
	state,
	// actions:{
	// 	exChangeData(state,data){
	// 		state.commit('todo',data)
	// 	}
	// },
	mutations:{
		exChangeData(state,data){
			state.lists.list = data
			
		},
		loading(state,data){
			state.dataobj.loading = data.loading
			state.dataobj.nav = data.nav
			state.dataobj.count = data.count
		},
		none(state,data){
			state.nonedata.none = data
		},
		fromStrategyCity(state,data){
			state.strategyCity.city = data
			console.log(state.strategyCity.city)
		},
		fromUploadCity(state,data){
			state.uploadCity.city = data
			console.log(state.uploadCity.city)
		},
		updateContent(state,data){
			state.updateMuta.update = data 
		}
	}
})