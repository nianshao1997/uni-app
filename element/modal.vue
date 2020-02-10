<template>
	<view>
		<view class="wrapper" v-if="show">
			<view class="container">
				<view class="title">
					请先授权登陆
				</view>
				<view class="control">
					<button plain="true" @click="cancle">取消</button>
					<button plain="true" type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo">去登陆</button>
				</view>
			</view>
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
	import {login} from '../commen/spot.js'
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	export default {
		name: 'modal',
		components:{
			HMmessages
		},
		data() {
			return {
				show:false
			}
		},
		methods: {
			init(){
				this.show = true
			},
			getuserinfo(e) {
				console.log(e)
				this.show = false
				login(e.detail.userInfo)
				.then(res=>{
					console.log(res)
					console.log('用户存储登录信息成功')
					this.HMmessages.show('登陆成功',{icon:'success',background:'#00ff22',fontColor:'#fff'})
				})
				.catch(err=>{
					console.log('用户信息存储失败')
					console.log(err)
				})
			},
			cancle(){
				this.show = false
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		z-index: 999;
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .6);
	}

	.container {
		width: 500rpx;
		height: 250rpx;
		background-color: #FFFFFF;
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		border-radius: 20rpx;
	}

	.title {
		font-size: 40rpx;
		text-align: center;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
	}

	.control {
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 150rpx;
		align-items: center;
	}
</style>
