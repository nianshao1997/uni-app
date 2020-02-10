import Vue from 'vue'
import App from './App'
//引入vuex  store
// import store from './pages/store/store.js'
// Vue.prototype.$store = store

//我的vuex,store
import myStore from './pages/store/myStore.js'
import loading from './element/loading.vue'
import nonedata from './element/nonedata.vue'
import homeload from './element/homeload.vue'
import animate from 'animate.css'
Vue.prototype.$store = myStore

Vue.config.productionTip = false
Vue.component('loading',loading)
Vue.component('nonedata',nonedata)
Vue.component('homeload',homeload)
Vue.use(animate)

App.mpType = 'app'

const app = new Vue({
	...App,
	// store
	myStore
})
app.$mount()
