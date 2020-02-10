<template>
	<view class="wrapper">
		<view class="content">
			<view class="title">
				<text>宝贝评价({{toCommentDetails.length}})</text>
			</view>
			<view class="tab-box">
				<block v-for="(item,index) in theCommentTab" :key='index'>
					<text :class="{active:index === num}" @click="handleTab(index,item)">{{item}}</text>
				</block>
			</view>
			<view class="user-box">
				<block v-for="(item,index) in toCommentDetails" :key='index'>
					<view class="container">
			<view class="over">
				<view class="user-avar">
					<image :src="item.avatarUrl" mode="aspectFill"></image>
				</view>
				    <text class="user-name">{{item.nickName}}</text>
					<text class="user-time">{{item.time.substr(0,10)}}</text>
			 </view>
					<view class="user-comment">
						<text>{{item.comment}}</text>
					</view> 
					</view>
				</block>
			</view>
			<view class="upload-comment">
				<input type="text" disabled="disabled" placeholder="我来说两句" @click="handleInput" />
			</view>
			<view class="mask" v-if="showMask" :catchtouchmove='true'>
				<textarea  placeholder="写下您的评价" show-confirm-bar="false" focus="true" v-model="comment"/>
					<view class="handleBtns">
						<text @click="cancleComment">取消</text>
						<text @click="sureComment">发表</text>
					</view>
					<view class="other"></view>
			</view>
		</view>
		<modal ref='mon'></modal>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
	import modal from '../../../element/modal.vue'
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	let timer = require('../../../commen/util.js')
	let time = timer.formatTime(new Date())
	let db = wx.cloud.database()
	let user = db.collection('user')
	let dbComment = db.collection('comments')
	export default{
		name:'comment',
		props:{
			toCommentTab:Array,
			toCommentDetails:Array,
			data:String,
		},
		components:{
			modal,
			HMmessages
		},
		data(){
			return{
				// defaultKind:'全部',
				idData:'',
				theCommentTab:[],
				time:time,
				avatarUrl:'',
				nickName:'',
				comment:'',
				uploadComment:'',
				showMask:false,
				num:0,
			}
		},
		methods:{
			handleTab(index,item){
				this.num = index
				console.log(item)
				this.$parent.renderComment(item)
			},
			handleInput(){
				user.get()
				.then(res=>{
					if(res.data.length === 0){
						this.$refs.mon.show = true
					}else{
						let theUser = res.data[0]
						this.avatarUrl = theUser.avatarUrl
						this.nickName = theUser.nickName
						this.showMask = true
					}
				})
				.catch(err=>{
					console.log(err)
				})
			},
			cancleComment(){
				this.showMask = false
				this.comment = ''
			},
			sureComment(){
				if(this.comment === ''){
					let info = '评论不能为空'
					let status = 'error'
					this.remind(info,status)
				}else{
					this.submit()
				}
			},
			async submit(){
				let theComment = await this.fnComment()
				let commentTab = this.handleComment(theComment)
				let avatarUrl = this.avatarUrl
				let nickName = this.nickName
				let id = this.idData
				let currentTime = time
				dbComment.add({
					data:{
						commentTab,
						id,
						aboutComment:{
							avatarUrl,
							nickName,
							time:currentTime,
							comment:this.comment
						}
					}
				}).then(res=>{
					this.comment = ''
					let info = '评论成功'
					let status = 'success'
					this.remind(info,status)
					let item = '全部'
					this.$parent.renderComment(item)
					console.log('上传成功')
				}).catch(err=>{
					console.log('出错了')
				})
				console.log(commentTab)
			},
			handleComment(comment){
				if( comment.result.nsMessage.items.length === 0){
					return ''
				}
				let items = comment.result.nsMessage.items
				let theItem = items[items.length - 1]
				let [prop,adj] = [theItem['prop'],theItem['adj']]
				return prop + adj
			},
			fnComment(){
				return new Promise((resolve,reject)=>{
					wx.cloud.callFunction({
						name:'yyhBaidu',
						data:{
							message:this.comment
						}
					})
					.then(res=>{
						resolve(res)
					})
					.catch(err=>{
						reject(err)
					})
				})
			},
			remind(info,status){
				this.HMmessages.show(info,{icon:status,background:'coral',fontColor:'#fff'})
			}
		},
		watch:{
			toCommentTab(newVal,oldVal){
				this.theCommentTab = ['全部',...newVal]
				this.num = 0
			},
			data(newVal,oldVal){
				this.idData = newVal
				console.log(this.idData)
			}
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100%;
		padding-top: 40rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.content{
		width: 100%;
	}
	.title{
		font-weight: bold;
		margin-bottom: 40rpx;
	}
	.tab-box{
		display: flex;
		flex-wrap: wrap;
	}
	.tab-box text{
		margin: 0 14rpx;
		margin-bottom: 16rpx;
		padding: 14rpx;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		border: 2rpx solid #C0C0C0;
		font-weight: bold;
	}
	.active{
		background-color: #FFDD00;
		border-style: none !important;
	}
	.user-box{
		width: 100%;
		margin-bottom: 144rpx;
	}
	.container{
		width: 100%;
		margin-bottom: 30rpx;
	}
	.over{
		margin-top: 14rpx;
		display: flex;
		align-items: center;
		width: 100%;
	}
	.over image{
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
	}
	.user-name{
		margin-left: 10rpx;
	}
	.user-time{
		flex-grow: 1;
		display: flex;
		justify-content: flex-end;
	}
	.over text{
		font-size: 28rpx;
		color: #808080;
	}
	.user-comment{
		margin-top: 6rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 6rpx;
		box-sizing: border-box;
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #F8F8F8;
	}
	.user-comment text{
		box-sizing: border-box;
		font-size: 24rpx;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:2;
		line-height: 28rpx;
		-webkit-box-orient:vertical;
		color: #333333;
	}
	.upload-comment{
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9;
		background-color:#F8F8F8 ;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8rpx 40rpx;
	}
	input{
		width: 100%;
		height: 66rpx;
		border-radius: 50rpx;
		background-color: #F1F1F1;
	}
	.mask{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		z-index: 999;
		display: flex;
		flex-direction: column;
	}
	textarea{
		margin-top: 100rpx;
		margin-bottom: 20rpx;
		width: 100%;
	}
	.handleBtns{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background-color: #F1F1F1;
	}
	.handleBtns text{
		border-radius: 10rpx;
		padding: 8rpx 60rpx;
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #FFDD00;
	}
	.other{
		flex-grow: 1;
		background-color: #F1F1F1;
	}
</style>
