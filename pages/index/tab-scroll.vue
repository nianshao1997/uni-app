<template>
	<view class="tab-scroll-box">
		<scroll-view scroll-x="true" show-scrollbar='false'>
			<view v-for="(item,index) in tabs" :key="index" :class="{'item-active':index === num,'item':true}" @click="exchange(index,item.nav)">
				<view class="item-content">
					<view class="title">
						{{item.name}}
					</view>
					<view :class="{content:true,'item-content-active':index === num}">
						{{item.title}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		promise,
		contentPromise
	} from './js/promise.js'
	export default {
		props: {
			tabs: Array
		},
		data() {
			return {
				num: 0
			}
		},
		methods: {
			exchange(index, nav) {
				this.num = index
				this.$emit('load','more')
				console.log('tab:', nav)
				let obj = {
					nav,
					loading: true,
					count:0
				}
				this.$store.commit('loading', obj)
				this.$store.commit('none',false)
				contentPromise(nav,0)
					.then(res => {
						if(res.length === 0){
							this.$store.commit('none',true)
						}else{
							this.$store.commit('none',false)
						}
						this.$store.commit('exChangeData', res)
						let obj = {
							nav,
							loading: false,
							count:0
						}
						this.$store.commit('loading', obj)
					}).catch(err => {
						console.log(err)
					})
			}
		}
	}
</script>

<style scoped>
	/* .tab-scroll-box{
		width: 100%;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
	} */
	scroll-view {
		width: 100%;
		white-space: nowrap;
		position: absolute;
		left: 0;
		right: 0;
		padding: 20rpx 0;
		background-color: #F1F1F1; 
	}

	.item {
		display: inline-block;
		padding-left: 20rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 30rpx;
		border-top-right-radius: 70rpx;
		/* background-color: #DD524D; */
		box-sizing: border-box;
		width: 25%;
	}

	.item-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 35rpx;
	}

	.content {
		font-size: 20rpx;
		color: #C0C0C0;
	}

	.item-active {
		background-color: #007AFF;
	}

	.item-content-active {
		color: #333333;
	}
</style>
