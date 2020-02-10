<template>
	<view class="wrapper">
		<view class="search-wrapper">
			<view class="search-container">
				<input type="text" placeholder="请输入关键字" 
				focus="true"
				v-model="innerns"
				@confirm="onkeysearch"
				/>
			</view>
			<view class="search-btn">
				<text @click="handleHistory">搜索</text>
			</view>
		</view>
		<view v-if="showHistory">
		<view class="over">
			<text>搜索历史</text>
			<text class="iconfont" @click="deleteHistory">&#xe657;</text>
		</view>
		<view class="history">
			<block v-for="(item,index) in historys" :key='index'>
				<text @click="handleItem(item)">{{item}}</text>
			</block>
		</view>
		</view>
		<content :finalDatas="showData"></content>
		<nonedata v-if="showNone"></nonedata>
	</view>
</template>

<script>
	import content from '../strategy/components/content.vue'
	export default{
		name:'theSearch',
		components:{
			content
		},
		data(){
			return{
				showNone:false,
				showHistory:true,
				historys:[],
				showData:[],
				innerns:[]
			}
		},
		methods:{
			deleteHistory(){
				uni.removeStorageSync('search_key')
				this.historys = []
			},
			handleItem(item){
				this.showHistory = false
				this.searchData(item)
			},
			handleHistory(){
				this.showHistory = false
				if(this.innerns.length === 0){
					return
				}else{
					console.log(this.innerns)
					this.searchData(this.innerns)
					let theStorage = uni.getStorageSync('search_key') || []
					theStorage.unshift(this.innerns)
					uni.setStorageSync('search_key',theStorage)
					this.historys = theStorage
				}
			},
			searchData(data){
				const db = wx.cloud.database()
				db.collection('userInfo').where({
					datas:{
						title:db.RegExp({
                        regexp: data,
                        options: 'm',
                    })
					}
				}).get()
				.then(res=>{
					this.rezultData(res)
				})
				.catch(err=>{
					console.log(err)
				})
			},
			rezultData(res){
				let rezult = res.data.map(item=>{
					let id = item._id
					let datas = item.datas
					return {
						id,
						datas
					}
				})
				this.showData = rezult
				if(this.showData.length === 0){
					this.showNone = true
				}else{
					this.showNone = false
				}
			},
			onkeysearch(){
				this.handleHistory()
			}
		},
		created(){
			let theStorage = uni.getStorageSync('search_key') || []
			let single = Array.from(new Set(theStorage))
			this.historys = single
			if(this.historys.length === 0){
				this.showHistory = false
			}
		}
	}
	
</script>

<style>
	.wrapper{
		width: 100%;
		padding-top: 30rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}
	@font-face {
	  font-family: 'iconfont';  /* project id 1576276 */
	  src: url('//at.alicdn.com/t/font_1576276_wcw4vhi7iwc.eot');
	  src: url('//at.alicdn.com/t/font_1576276_wcw4vhi7iwc.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1576276_wcw4vhi7iwc.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1576276_wcw4vhi7iwc.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1576276_wcw4vhi7iwc.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1576276_wcw4vhi7iwc.svg#iconfont') format('svg');
	}
	.search-wrapper{
		display: flex;
		flex-direction: row;
		height: 70rpx;
		align-items: center;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}
	.search-container{
		border-bottom-right-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		border-top-left-radius: 50rpx;
		width: 100%;
		height: 100%;
		flex-grow: 1;
		padding-left: 30rpx;
		margin-right: 30rpx;
		background-color: #F1F1F1;
	}
	.search-container input{
		height: 100%;
		width: 100%;
	}
	.search-btn text{
		white-space: nowrap;
	}
	.over{
		margin-top: 70rpx;
		margin-bottom: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.over text{
		font-weight: bold;
		display: flex;
		justify-content: center;
	}
	.iconfont{
		font-family: iconfont;
		width: 40rpx;
		height: 40rpx;
		font-size: 40rpx;
		line-height: 40rpx;
		color: #F8F8F8;
	}
	.history{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.history text{
		border-radius: 10rpx;
		font-size: 26rpx;
		background-color: #F8F8F8;
		margin-bottom: 26rpx;
		padding: 18rpx 8rpx;
		margin-right: 20rpx;
	}
</style>
