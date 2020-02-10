<template>
	<view class="wrapper">
		<view class="content">
			<view class="title">
				<text>图片和视频展示</text>
			</view>
			<view class="video-box">
				<video v-if="showVedio" controls objectFit="cover" :src="videoSrc"></video>
			</view>
			<view class="img-box">
				<block v-for="(item,index) in toDatas.uploadImg" :key='index'>
				<view class="single-img">
					<image :src="item" mode="widthFix"></image>
				</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'detailsContent',
		props:{
			toDatas:Object
		},
		data(){
			return{
				videoSrc:'',
				showVedio:false
			}
		},
		watch:{
			toDatas(newValue,oldValue){
				if(newValue.vedio !== ''){
					this.videoSrc = newValue.vedio
					this.showVedio = true
				}else{
					this.showVedio = false
				}
			}
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100%;
	}
	.content{
		width: 100%;
	}
	.video-box{
		padding: 20rpx;
		box-sizing: border-box;
	}
	video{
		width: 100%;
	}
	.img-box{
		padding: 0 20rpx;
		box-sizing: border-box;
		width: 100%;
	}
	.single-img{
		width: 100%;
		margin: 6rpx 0;
	}
	image{
		width: 100%;
	}
	.title{
		padding-left: 20rpx;
		display: flex;
		align-items: flex-end;
		font-size: 40rpx;
	}
</style>
