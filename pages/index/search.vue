<template>
	<view class="wrapper">
		<view class="search-box">
			<view class="sca-code">
				<image src="../../static/tab/sca-code.png" mode="widthFix" @click="handleNo"></image>
			</view>
			<view class="search-input" @click="toSearch">
				<image src="../../static/tab/search.png" mode="widthFix"></image>
				<input type="text" value="" placeholder="请输入内容" />
			</view>
			<view class="search-more">
				<image src="../../static/tab/more.png" mode="widthFix" @click="handleNo"></image>
			</view>
		</view>
		<view class="banner-box">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" circular="true">
				<swiper-item v-for="(item,index) in bannerSrc" :key='index'>
					<view class="swiper-item">
						<image :src="item.src" mode="aspectFill" @click="handleImg(item,index)"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			iconType: {
				type: Array
			},
			bannerSrc:Array
		},
		data() {
			return {
				
			}
		},
		methods:{
			handleNo(){
				uni.showToast({
					title:'点不了我哈',
					icon:'none'
				})
			},
			toSearch(){
				uni.navigateTo({
					url:'../the-search/theSearch'
				})
			},
			handleImg(item,index){
				uni.navigateTo({
					url:'../bannerDetails/bannerDetails?id=' + item._id
				})
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		width: 100%;
	}

	.search-box {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding-top: 30upx;
		padding-left: 10upx;
		padding-right: 10upx;
		padding-bottom: 30upx;
		background-image: linear-gradient(to top, #4CD964 10%, #4CD950 100%);
		box-sizing: border-box;
	}

	.sca-code {
		width: 40upx;
		height: 40upx;
	}

	.sca-code image {
		width: 100%;
		height: 100%;
		vertical-align: middle;
	}

	.search-input {
		width: 80%;
		height: 60upx;
		display: flex;
		background-color: #F1F1F1;
		align-items: center;
		padding-left: 30upx;
		border-bottom-left-radius: 100upx;
		border-bottom-right-radius: 100upx;
		border-top-left-radius: 100upx;
	}

	.search-input image {
		vertical-align: middle;
		width: 40upx;
		height: 40upx;
	}

	.search-more {
		/* margin-right: 30upx; */
		width: 40upx;
		height: 40upx;
	}

	.search-more image {
		width: 100%;
		height: 100%;
		vertical-align: middle;
	}

	swiper {
		width: 100% !important;
		height: 300upx !important;
	}

	.banner-box {
		width: 100%;
	}

	swiper-item,
	image {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		width: 100% !important;
		height: 100%;
	}

	.item {
		display: flex;
		flex-direction: column;
		width: 30%;
		text-align: center;
		margin: 20rpx auto;
		overflow-wrap: break-word;
	}
	.icon-box{
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}
</style>
