<template>
	<view class="content">
		<addr :address='address'></addr>
		<locality></locality>
		<content :finalDatas='finalDatas' v-if="!showLoading"></content>
		<loading v-if="showLoading"></loading>
		<nonedata v-if="none"></nonedata>
		<view class="add animated fadeInUp">
			<image src="../../static/tab/fab.png" mode="widthFix" @click="turnToUpload"></image>
		</view>
		<uni-load-more :status="status" color="brown" v-if="!showLoading"></uni-load-more>
	</view>
</template>

<script>
	import content from './components/content.vue'
	import locality from './components/locality.vue'
	import addr from './components/address.vue'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	import {
		mapState
	} from 'vuex'
	// var QQMapWX = require('../../commen/qqmap-wx-jssdk.js');
	// var qqmapsdk;
	import {
		addressData
	} from '../../commen/spot.js'
	let db = wx.cloud.database()
	let userInfo = db.collection('userInfo')
	export default {
		components: {
			addr,
			content,
			locality,
			uniLoadMore
		},
		data() {
			return {
				status:'loading',
				count:0,
				showLoading:false,
				address: '',
				watchAddress:'',
				finalDatas:[],
				none:false,
				name:'全部'
			}
		},
		methods: {
			exchangeTab(name){
				this.count = 0
				this.finalDatas = []
				this.name = name
				this.none = false
				this.showLoading = true
				console.log(name)
				if(name === '全部'){
					this.rendContent(this.address)
					return
				}
				this.rendKind(this.address,name)
			},
			rendKind(address,name){
				userInfo.where({
					datas:{
						address:address,
						kind:name
					}
				})
				.orderBy('datas.time', 'desc')
				.skip(6 * this.count++)
				.limit(6)
				.get()
				.then(res=>{
					this.rezultData(res.data)
					console.log(res.data)
				}).catch(err=>{
					console.log(err)
				})
			},
			rezultData(arrData){
				let rezult = arrData.map(item=>{
					let id = item._id
					let datas = item.datas
					return {
						id,
						datas
					}
				})
				console.log(rezult)
				this.finalDatas = [...this.finalDatas,...rezult]
				if(rezult.length === 0 && this.finalDatas.length === 0){
					this.none = true
				}else{
					this.none = false
				}
				this.status = rezult.length <= 5 ? 'noMore' : 'more'
				this.showLoading = false
			},
			rendContent(address){
				userInfo.where({
					datas:{
						address:address
					}
				})
				.skip(6 * this.count++)
				.limit(6)
				.orderBy('datas.time', 'desc')
				.get()
				.then(res=>{
					console.log(res.data)
					this.rezultData(res.data)
				})
				.catch(err=>{
					console.log(err)
				})
			},
			addRess() {
				addressData().then(res => {
						this.address = res.result.address_component.city
						this.rendContent(this.address)
						console.log(this.address)
					})
					.catch(err => {
						console.log(err)
					})
			},
		    turnToUpload(){
				uni.navigateTo({
					url:'../upload/upload'
				})
			}
		},
		created() {
			this.addRess()
		},
		onLoad(){
			
		},
		onReachBottom() {
			console.log('触底了')
			this.status = 'loading'
			if(this.name === '全部'){
				this.rendContent(this.address,this.name)
			}else{
				this.rendKind(this.address,this.name)
			}
		},
		computed:{
			...mapState(['strategyCity','updateMuta']),
			renderAddress(){
				//this.address = this.citys.city ? this.citys.city : this.address
				this.watchAddress = this.strategyCity.city
			},
			updatePage(){
				if(this.updateMuta.update === true){
					if(this.name === '全部'){
						this.rendContent(this.address)
					}else{
						this.rendKind(newData,this.name)
					}
				}
			}
		},
		watch:{
			watchAddress(newData,oldData){
				this.address = newData
				this.finalDatas = []
				this.count = 0
				if(this.name === '全部'){
					this.rendContent(this.address)
				}else{
					this.rendKind(newData,this.name)
				}
			}
		}
	}
</script>

<style scoped>
	.add {
		position: fixed;
		bottom: 20upx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}

	.add image {
		width: 120rpx;
		height: 100rpx;
		border-radius: 40rpx;
	}
</style>
