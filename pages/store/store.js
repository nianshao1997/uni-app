import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const list = {
	listing:[],
	num:2
}
const state = {
	list
}
export default new Vuex.Store({
	state,
	actions:{
		listAction(listAction,listData){
			listAction.commit('listmut',listData)
		}
	},
	mutations:{
		listmut(state,data){
			state.list = {
				listing:data
			}
		}
	}
})