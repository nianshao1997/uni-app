<template>
	<view class="wrapper">
		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :circular='true' :duration="1000" @change="handleIndex">
				<block v-for="(item,index) in bannerImg" :key='index'>
					<swiper-item>
						<image :src="item" mode="aspectFill" @click="previewImg(index)"></image>
					</swiper-item>
				</block>
			</swiper>
			<view class="current">
				<text>{{current}}</text>
				<text>/{{bannerImg.length}}</text>
			</view>
		</view>
		<view class="title">
			<text>{{toDatas.title}}</text>
		</view>
		<view class="more">
			<text>超出预期</text>
			<text>评论{{toCommentDetails.length}}条</text>
			<text>月销爆单</text>
		</view>
	</view>
</template>

<script>
	import {preView} from '../../../commen/spot.js'
	export default{
		name:'banner',
		props:{
			toDatas:Object,
			toCommentDetails:Array
		},
		data(){
			return{
				current:1,
				bannerImg:[]
			}
		},
		methods:{
			handleIndex(e){
				console.log(e)
				this.current = e.detail.current + 1
			},
			previewImg(index){
				preView(this.bannerImg,index)
				.then(res=>{
					console.log('预览成功')
				})
				.catch(err=>{
					console.log('预览失败')
				})
			}
		},
		watch:{
			toDatas(newDatas,oldDatas){
				this.bannerImg = newDatas.uploadImg.slice(0,3)
			}
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100%;
	}
	.banner,
	swiper,
	swiper-item,
	image{
		width: 100%;
		height: 400rpx;
	}
	.banner{
		position: relative;
	}
	.current{
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		background-color: #292C33;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 20rpx;
		border-radius: 40rpx;
	}
	.current text{
		color: #FFFFFF;
	}
	.title{
		padding: 20rpx;
	}
	.title text{
		color: #333333;
		font-weight: bolder;
	}
	.more{
		font-size: 26rpx;
		color: #C0C0C0;
		display: flex;
		justify-content: space-around;
	}
	
</style>
