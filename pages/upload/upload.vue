<template>
	<view class="wrapper">
		<view class="tab-wrapper">
			<view class="kinds">
				<text>分类</text>
			</view>
			<view class="tab-container">
				<block v-for="(item,index) in tabs" :key='index'>
					<view @click="exchange(index,item)" :class="{active:index === num,tab:true}">
						<text>{{item}}</text>
					</view>
				</block>
			</view>
		</view>
		<view class="title">
			<input type="text" placeholder="给旅行日记起个标题吧" v-model="title" />
		</view>
		<view class="tips">
			<textarea placeholder="描述下的的旅行心得,帮助更多的旅行的人" v-model="tips" />
			</view>
		<view class="img-box" @click="upload">
			<image src="../../static/tab/topimg.png" mode="widthFix"></image>
		</view>
		<view class="upload-box">
			<view class="upload-container">
				<block v-for="(item,index) in uploadimg" :key='index'>
					<view class="container">
						<image :src="item" mode="aspectFill" @click="preViewImg(index)"></image>
						<image class="delete" @click="deleteImg(index)" src="../../static/tab/delvideo.png" mode="widthFix"></image>
					</view>
				</block>
			</view>
		</view>
		<view class="img-box">
			<image src="../../static/tab/topvideo.png" mode="widthFix" @click="uploadVideo"></image>
		</view>
		<view class="video" v-if="show">
			<video :src="video" controls objectFit="cover"></video>
			<image src="../../static/tab/delvideo.png" mode="widthFix" @click="deleteVedio"></image>
		</view>
		<view class="current-wrapper">
		<view class="current-box">
			<text>所在地点</text>
			<view class="current" @click="turnToSearch">
				<image src="../../static/tab/gonglveb.png" mode="widthFix"></image>
				<text>{{address}}</text>
			</view>
		</view>
		</view>
		<view class="submit" @click="submit">
			发布
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<modal ref='mod'></modal>
		<view class="mask-wrapper" v-if="showMask">
			<view class="mask-box">
				<text>{{mask}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {addressData,preView,login} from '../../commen/spot.js'
	import {mapState} from 'vuex'
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	import modal from '../../element/modal.vue'
	let timer = require('../../commen/util.js')
	let time = timer.formatTime(new Date())
	export default {
		components:{
			HMmessages,
			modal
		},
		data() {
			return {
				showMask:false,
				mask:'正在上传中...请勿关闭页面',
				time:time,//
				kind:'景点',//
				video:'',//
				show:false,
				title:'',//
				tips:'',//
				num: 0,
				address:'',//
				watchAddress:'',
				uploadimg:[],//
				avatarUrl:'',
				nickName:'',
				openid:'',
				tabs: [
					'景点',
					'美食',
					'网红打卡'
				]
			}
		},
		methods: {
			exchange(index,kind) {
				this.num = index
				this.kind = kind 
			},
			upload(){
				uni.chooseImage({
				    count: 9, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: res=> {
				        this.uploadimg.push(...res.tempFilePaths)
				    }
				});
			},
			deleteImg(index){
				this.uploadimg.splice(index,1)
			},
			preViewImg(index){
				let urls = this.uploadimg
				preView(urls,index)
				.then(res=>{
					console.log('预览成功')
				})
				.catch(err=>{
					console.log('预览失败')
				})
			},
			uploadVideo(){
				uni.showLoading({
					title:'上传中'
				})
				uni.chooseVideo({
				count: 1,
				sourceType: ['camera', 'album']
				    })
					.then(res=>{
						uni.hideLoading()
						this.show = true
						this.video = res[1].tempFilePath
						console.log(res)
					})
					.catch(err=>{
						console.log('上传失败')
						this.show = false
				})
			},
			deleteVedio(){
				this.video = ''
				this.show = false
			},
			turnToSearch(){
				uni.navigateTo({
					url:'../search/search'
				})
			},
			addRess() {
				addressData().then(res => {
						this.address = res.result.address_component.city
						console.log(this.address)
					})
					.catch(err => {
						this.address = '杨太和(err)'
					})
			},
			submit(){
				console.log(this.kind)
				console.log(this.title)
				console.log(this.tips)
				console.log(this.uploadimg)
				console.log(this.video)
				console.log(this.address)
				if(this.title === ''){
					let msg = '标题不能为空'
					this.remind(msg)
				}else if(this.tips === ''){
					let msg = '描述不能为空'
					this.remind(msg)
				}else if(this.uploadimg.length < 3){
					let msg = '图片不能小于三张'
					this.remind(msg)
				}else{
					let db = wx.cloud.database()
					db.collection('user')
					.get()
					.then(res=>{
						if(res.data.length === 0){
							this.$nextTick(()=>{   
							     this.$refs.mod.init()
								})
						}else{
							console.log('可以提交')
							let user = res.data[0]
							this.avatarUrl = user.avatarUrl
							this.nickName = user.nickName
							this.openid = user._openid
							this.showMask = true
							this.submitData()
						}
					})
					.catch(err=>{
						console.log(err)
					})
				}
			},
			async submitData(){
				let img = await this.submitImg()
				this.uploadimg = []
				console.log(img)
				let vedio = await this.submitVedio()
				console.log(vedio)
				await this.submitJson(img,vedio)
			},
			submitImg(){
				let imgsFile = []
				return new Promise((resovle,reject)=>{
					this.uploadimg.forEach(img=>{
						let index = img.lastIndexOf('.')
						let pop = img.slice(index)
						let cloudPath = `${Date.now()}-${Math.floor(Math.random() * 1000000)}${pop}`
						wx.cloud.uploadFile({
						  cloudPath: 'static/imgs/' + cloudPath,
						  filePath: img, // 文件路径
						}).then(res => {
						  // get resource ID
						  // console.log(res.fileID)
						  imgsFile.push(res.fileID)
						  if(imgsFile.length === this.uploadimg.length){
							  resovle(imgsFile)
						  }
						}).catch(error => {
						     console.log(error)
						})
					})
					
					
				})
			},
			submitVedio(){
				return new Promise((resovle,reject)=>{
					if(this.video === ''){
						console.log('用户不上传视频')
						resovle('')
					}else{
						console.log('用户上传视频')
						let index = this.video.lastIndexOf('.')
						let pop = this.video.slice(index)
						let cloudPath = `${Date.now()}-${Math.floor(Math.random() * 1000000)}${pop}`
						wx.cloud.uploadFile({
						  cloudPath: 'static/vedios/' + cloudPath,
						  filePath: this.video, // 文件路径
						}).then(res => {
						    resovle(res.fileID)
						}).catch(error => {
						     console.log(error)
						})
					}
				})
			},
			submitJson(img,vedio){
				let datas = {
					kind:this.kind,
					title:this.title,
					tips:this.tips,
					uploadImg:img,
					vedio:vedio,
					address:this.address,
					time:this.time,
					avatarUrl:this.avatarUrl,
					nickName:this.nickName,
					openid:this.openid
				}
				let db = wx.cloud.database()
				db.collection('userInfo').add({
					data:{
						datas:datas
					}
				}).then(res=>{
					console.log(res)
					this.mask = '上传完成，正在跳转页面中...'
					this.$store.commit('updateContent',true)
					setTimeout(()=>{
						uni.switchTab({
							url:'../strategy/strategy'
						})
					},1700)
				})
				.catch(err=>{
					console.log(err)
				})
			},
			remind(msg){
				this.HMmessages.show(msg,{icon:'error',background:'rgba(102,0,50,.5)',fontColor:'#fff'})
			}
		},
		onLoad() {
			this.addRess()
		},
		computed:{
			...mapState(['uploadCity']),
			render(){
				this.watchAddress = this.uploadCity.city
				console.log(this.address)
			}
		},
		watch:{
			watchAddress(newVal,oldVal){
				this.address = newVal
				console.log(this.address)
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		padding: 10rpx;
		padding-top: 40rpx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.tab-wrapper {
		padding-left: 10rpx;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.kinds {
		margin-right: 40rpx;
	}

	.kinds text {
		/* font-size: 34rpx; */
		font-weight: bold;
		/* line-height: 34rpx; */
	}

	.tab-container {
		display: flex;
		flex-wrap: wrap;
	}

	.tab {
		padding: 10rpx 20rpx;
		color: #555555;
		background-color: #F8F8F8;
		border-radius: 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 30rpx;
		/* font-size: 28rpx; */
	}

	.tab text {
		/* line-height: 28rpx; */
	}

	.active {
		background-color: #FFDD00 !important;
	}
	.title{
		margin-top: 46rpx;
		display: flex;
		align-items: center;
		padding-left: 10rpx;
		box-sizing: border-box;
	}
	.tips{
		display: flex;
		align-items: center;
		margin-top: 46rpx;
		padding-left: 10rpx;
	}
	.img-box{
		padding-left: 10rpx;
		box-sizing: border-box;
		width: 150rpx;
		height: 150rpx;
	}
	.img-box image{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	
	.upload-container{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}
	.container{
		height: 176rpx;
		padding: 4px 4px;
		box-sizing: border-box;
		width: 25%;
		position: relative;
	}
	.container image{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	.container .delete{
		width: 38rpx;
		height: 30rpx;
		position: absolute;
		right: 16rpx;
		top: 16rpx;
	}
	.video{
		width: 100%;
		position: relative;
	}
	.video video{
		width: 100%;
	}
	.video image{
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		right: 16rpx;
		top: 16rpx;
	}
	.current-wrapper{
		padding: 20rpx 10rpx;
		box-sizing: border-box;
		margin-bottom: 160px;
	}
	.current-box{
		background-color: #F8F8F8;
		padding: 10rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border-radius: 12rpx;
	}
	.current-box text{
		margin-right: 40rpx;
		color: #999999;
	}
	.current{
		display: flex;
		align-items: center;
		border-radius: 4rpx;
	}
	.current image{
		width: 42rpx;
		height: 42rpx;
		margin-right: 10rpx;
	}
	.current text{
		margin-right: 0 !important;
		color: #333333 !important;
	}
	.submit{
		height: 100rpx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #FFDD00;
		font-size: 40rpx;
		line-height: 100rpx;
		text-align: center;
	}
	.mask-wrapper{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.6);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.mask-box{
		width: 500rpx;
		height: 200rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>
