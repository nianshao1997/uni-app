<template>
	<view class="wrapper">
		<view class="content">
			<view class="left" v-if="show">
				<image :src="avatarUrl" mode="widthFix"></image>
				<text>{{nickName}}</text>
			</view>
			<view class="right" v-if="!show">
				<text>登录小程序，开启旅程</text>
				<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">去登陆</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {login} from '../../commen/spot.js'
	let db = wx.cloud.database()
	let users = db.collection('user')
	export default{
		name:'me',
		data(){
			return{
				show:false,
				avatarUrl:'',
				nickName:''
			}
		},
		methods:{
			getUserInfo(e){
				console.log(e)
				login(e.detail.userInfo)
				.then(res=>{
					console.log(res)
					this.isLogin()
					console.log('登陆成功')
				})
				.catch(err=>{
					console.log(err)
				})
			},
			isLogin(){
				users.get()
				.then(res=>{
					console.log(res)
					if(res.data.length === 0){
						this.show = false
					}else{
						this.show = true
						this.avatarUrl = res.data[0].avatarUrl
						this.nickName = res.data[0].nickName
					}
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		onShow() {
			this.isLogin()
		}
	}
</script>

<style scoped>
	.content{
		width: 100%;
		padding-left: 34rpx;
		padding-right: 34rpx;
		padding-top: 100rpx;
		padding-bottom: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		background-color:#4CD964;
	}
	.left{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	image{
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin-right: 14rpx;
		border: 6rpx solid #F8F8F8;
	}
	.right{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-left: 30rpx;
	}
	.right text{
		margin-bottom: 20rpx;
	}
	.right button{
		border: none;
		width: 300rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background-color: #007AFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
