<template>
	<view class="content">
			<view class="content-box" v-for="(item,index) in finalDatas" :key="index" @click="turnToDetails(item.id)">
				<block v-for="(imgItem,imgIndex) in item.datas.uploadImg" :key='imgIndex' v-if="imgIndex === 0">
					<view class="img-box">
						<image :src="imgItem" mode="aspectFill"></image>
					</view>
				</block>
				<view class="name">
					{{item.datas.title}}
				</view>
				<view class="message">
					{{item.datas.tips}}
				</view>
				<view class="sub-info userinfo">
					<image :src="item.datas.avatarUrl" mode="widthFix"></image>
					<text class="buy newing">{{item.datas.nickName}}</text>
				</view>
			</view>
	</view>
</template>

<script>
	export default{
		name:'cont',
		props:{
			finalDatas:Array
		},
		data(){
			return{
				
			}
		},
		methods:{
			turnToDetails(id){
				console.log(id)
				uni.navigateTo({
					url:'../details/details?id=' + id
				})
			}
		}
	}
</script>

<style scoped>
	@import '../../../commen/uni-show.css';
	.userinfo{
		display: flex;
		align-items: center;
	}
	.userinfo image{
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
	.newing{
		font-size: 28rpx;
		margin-left: 16rpx;
	}
</style>
