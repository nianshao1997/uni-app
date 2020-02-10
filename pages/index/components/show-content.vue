<template>
	<view class="content">
			<view class="content-box" v-for="(item,index) in content" :key="index" @click="preViewImg([item.image],0)">
				<view class="img-box">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<view class="name">
					{{item.title}}
				</view>
				<view class="message">
					{{item.list}}
				</view>
				<view class="title">
					{{item.label}}
				</view>
				<view class="sub-info">
					<text class="price">￥{{item.price}}</text>
					<text class="buy">{{item.buy}}人已阅</text>
				</view>
			</view>
	</view>
</template>

<script>
	import {preView} from '../../../commen/spot.js'
	export default {
		props:{
			content:Array
		},
		data() {
			return {
				
			}
		},
		methods:{
			preViewImg(src,index){
				preView(src,index)
				.then(res=>{
					console.log(res)
					console.log('预览成功')
				})
				.catch(err=>{
					console.log('预览失败')
				})
			}
		}
	}
</script>

<style scoped>
	@import '../../../commen/uni-show.css';
</style>
