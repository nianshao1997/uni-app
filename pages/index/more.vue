<template>
	<view class="content" @click="handle">
		<view class="item-box" v-for="(item,index) in moreArr" :key='index'>
			<view class="over-item">
				<text class="title">{{item.title1}}</text>
				<text class="sub-title">{{item.subTitle1}}</text>
			</view>
			<view class="sub-item">
				<text class="title">{{item.title2}}</text>
				<text class="sub-title">{{item.subTitle2}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				moreArr:[
					{
					title1:'出境游',
					title2:'签证/签注',
					subTitle1:'走遍全球',
					subTitle2:'领券'
				},
				{
					title1:'国内游',
					title2:'会员',
					subTitle1:'精选路线',
					subTitle2:'签到'
				},
				{
					title1:'周边游',
					title2:'每日福利',
					subTitle1:'暑假红包',
					subTitle2:'领里程'
				},
				{
					title1:'精选购',
					title2:'全部',
					subTitle1:'免税预约',
					subTitle2:'更多推荐'
				}
				]
			}
		},
		methods:{
			handle(){
				uni.showToast({
					title:'别点我',
					icon:'none'
				})
			}
		}
	}
</script>

<style scoped>
	.content{
		display: flex;
		flex-direction: row !important;
	}
	.item-box{
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		box-sizing: border-box;
		width: 25%;
	}
	.over-item,
	.sub-item{
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		border: 1rpx solid #F1F1F1;
		/* margin: 10rpx auto; */
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
	}
	.title{
		font-size: 30upx !important;
		color: #333333;
	}
	.sub-title{
		color: #808080;
		font-size: 20upx !important;
	}
	
</style>
