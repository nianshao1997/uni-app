<template>
	<view class="wrapper">
		<view class="content">
			<text>{{text}}</text>
			<view class="img">
				<image :src="src" mode="aspectFill" ref="ns"></image>
			</view>
		</view>
	</view>
</template>

<script>
	const db = wx.cloud.database()
	const bannerns = db.collection('bannerItem')
	export default{
		name:'banDetails',
		data(){
			return{
				id:'',
				src:'',
				text:'',
			}
		},
		methods:{
			handleData(id){
				bannerns.where({
					id
				}).get()
				.then(res=>{
					let data = res.data[0]
					this.src = data.src
					this.text = data.text
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad(e) {
			this.id = e.id
			this.handleData(this.id)
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100%;
		padding-top: 100rpx;
		padding-left: 60rpx;
		padding-right: 60rpx;
		box-sizing: border-box;
	}
     
	.content{
		display: flex;
		align-items: center;
	 }
	image{
		margin-top: 200rpx;
		border: 6rpx solid #DD524D;
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}
</style>
