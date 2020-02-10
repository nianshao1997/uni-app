<template>
	<view class="wrapper">
		<view class="search-box">
			<view class="search-input">
				<image src="../../static/tab/search.png" mode="widthFix"></image>
				<input type="text" value="" placeholder="请输入内容" @focus="search" @input="searchInput" v-model="inputValue" />
			</view>
			<view v-if="show" @click="reverseShow">
				<text>&#xe691;</text>
			</view>
		</view>
		<view class="bottom-wrapper" v-if="!show">
			<view class="mid-wrapper">
				<view class="middle">
					<text>当前定位城市</text>
					<image src="../../static/tab/gonglveb.png" mode="widthFix"></image>
					<text @click="theCity">{{address}}</text>
				</view>
			</view>
			<view class="hot-wrapper">
				<view class="hot-city">
					<view class="hot">热门城市</view>
					<view class="city-list">
						<block v-for="(item,index) in citys" :key='index'>
							<text @click="getCity(item.city)">{{item.city}}</text>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class="show-wrapper" v-if="show">
			<view class="show-container">
				<block v-for="(item,index) in addressInfo" :key='index'>
					<view class="show" @click="seekBack(item)">
						<image src="../../static/tab/gonglveb.png" mode="widthFix"></image>
						<text>{{item}}</text>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('../../commen/qqmap-wx-jssdk.js');
	// var qqmapsdk;
	import {
		addressData
	} from '../../commen/spot.js'
	export default {
		name: 'search',
		data() {
			return {
				inputValue:'',
				show: false,
				address: '',
				addressInfo: [],
				commit:'',
				citys: [{
						city: '昆明市'
					},
					{
						city: '大理白族自治州'
					},
					{
						city: '北京市'
					},
					{
						city: '上海市'
					},
					{
						city: '广州市'
					},
					{
						city: '深圳市'
					},
					{
						city: '杭州市'
					}
				]
			}
		},
		mounted() {
			this.addRess()
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			seekBack(lacotion){
				this.$store.commit(this.commit, lacotion)
				this.back()
			},
			theCity() {
				console.log(this.address)
				this.$store.commit(this.commit, this.address)
				this.back()
			},
			getCity(city) {
				console.log(city)
				this.$store.commit(this.commit, city)
				this.back()
			},
			search() {
				this.show = true
			},
			reverseShow() {
				this.show = false
				this.inputValue = ''
				this.addressInfo = []
			},
			addRess() {
				addressData().then(res => {
						this.address = res.result.address_component.city
						console.log(this.address)
					})
					.catch(err => {
						console.log(err)
					})
			},
			searchInput(e) {
				var qqmapsdk = new QQMapWX({
					key: 'F3CBZ-WJHC6-EAVSX-EVDO6-CUTJV-3ZFGN'
				})
				qqmapsdk.getSuggestion({
					keyword:e.detail.value,
					//filter:'category=景点',
					success:res=>{
						let arrData = res.data
						let city = arrData[0].city
						let titleData = arrData.map(item=>{
							return item.title
						})
						let rezult = [city,...titleData]
						this.addressInfo = rezult
						console.log(titleData)
					},
					fail:err=>{
						console.log(err)
					}
				})
			},
			routeFrom(){
				let page = getCurrentPages()
				let prePage = page[page.length - 2].route
				console.log(prePage)
				if(prePage === 'pages/upload/upload'){
					this.commit = 'fromUploadCity'
				}else{
					this.commit = 'fromStrategyCity'
				}
			}
		},
		onLoad(){
			this.routeFrom()
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: 'iconfont';
		/* project id 1576276 */
		src: url('//at.alicdn.com/t/font_1576276_cazimf9hlaq.eot');
		src: url('//at.alicdn.com/t/font_1576276_cazimf9hlaq.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_1576276_cazimf9hlaq.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_1576276_cazimf9hlaq.woff') format('woff'),
			url('//at.alicdn.com/t/font_1576276_cazimf9hlaq.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_1576276_cazimf9hlaq.svg#iconfont') format('svg');
	}

	.search-box {
		display: flex;
		width: 100%;
		padding-top: 30upx;
		padding-left: 30upx;
		padding-right: 20upx;
		align-items: center;
		padding-bottom: 30upx;
		background-image: linear-gradient(to top, #4CD964 10%, #4CD950 100%);
		box-sizing: border-box;
	}

	.search-input {
		flex-grow: 1;
		height: 60upx;
		display: flex;
		background-color: #F1F1F1;
		align-items: center;
		padding-left: 30upx;
		border-radius: 100rpx;
	}

	.search-input input {
		flex-grow: 1;
	}

	.search-input image {
		vertical-align: middle;
		width: 40upx;
		height: 40upx;
	}

	.search-box text {
		font-family: iconfont;
		font-size: 42rpx;
		line-height: 40rpx;
		margin-left: 20rpx;
	}

	.mid-wrapper {
		width: 100%;
		padding-top: 50rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}

	.middle {
		display: flex;
		width: 100%;
		background-color: #F1F1F1;
		border-radius: 10rpx;
		align-items: center;
		padding-left: 10rpx;
		padding-top: 10px;
		padding-bottom: 10rpx;
	}

	.middle image {
		margin-left: 40rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.middle text {
		font-size: 30rpx;
		color: #333333;
	}

	.hot-wrapper {
		padding-left: 20rpx;
		width: 100%;
	}

	.hot {
		margin-top: 40rpx;
		margin-bottom: 20rpx;
		color: #999999;
	}

	.city-list {
		display: flex;
		flex-wrap: wrap;
	}

	.city-list text {
		padding: 10rpx 8rpx;
		margin-right: 30rpx;
		margin-bottom: 36rpx;
		background-color: #F8F8F8;
		font-size: 30rpx;
	}

	.show-wrapper {
		width: 100%;
		padding-top: 60rpx;
		padding-right: 20rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.show-container {
		display: flex;
		flex-direction: column;
	}

	.show {
		display: flex;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		/* justify-content: center; */
		align-items: center;
		box-sizing: border-box;
		border-bottom: 4rpx solid #F1F1F1;
	}

	.show image {
		width: 40rpx;
		height: 40rpx;
	}

	.show text {
		font-size: 30rpx;
		color: #DD524D;
		margin-left: 20rpx;
	}
</style>
