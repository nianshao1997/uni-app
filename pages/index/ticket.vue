<template>
	<view class="ticket-box" @click="handle">
		<view class="item" v-for="(item,index) in ticket" :key="index">
			<text :class="item.class"></text>
			<text>{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ticket:[
					{
						class:'train',
						name:'火车'
					},
					{
						class:'bus',
						name:'汽车'
					},
					{
						class:'hotal',
						name:'旅馆'
					},
					{
						class:'ticket',
						name:'门票'
					},
					{
						class:'plane',
						name:'飞机'
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
	@font-face {
		font-family: 'iconfont';
		/* project id 1576276 */
		src: url('https://at.alicdn.com/t/font_1576276_zqla330ijkj.eot');
		src: url('https://at.alicdn.com/t/font_1576276_zqla330ijkj.eot?#iefix') format('embedded-opentype'),
			url('https://at.alicdn.com/t/font_1576276_zqla330ijkj.woff2') format('woff2'),
			url('https://at.alicdn.com/t/font_1576276_zqla330ijkj.woff') format('woff'),
			url('https://at.alicdn.com/t/font_1576276_zqla330ijkj.ttf') format('truetype'),
			url('https://at.alicdn.com/t/font_1576276_zqla330ijkj.svg#iconfont') format('svg');
	}

	.ticket-box {
		padding: 30rpx;
		font-family: iconfont;
	}
	.ticket-box{
		display: flex;
		flex-direction: row;
	}
	.item{
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	text{
		font-family: iconfont;
		text-align: center;
	}
	.train::before{
		content: '\e6ea';
	}
	.bus::before{
		content: '\e6e9';
	}
	.hotal::before{
		content: '\e608';
	}
	.ticket::before{
		content: '\e600';
	}
	.plane::before{
		content: '\e73e';
	}
	.item text:nth-child(1){
		color: #007AFF;
		font-size: 60rpx;
	}
	.item text:nth-child(2){
		color: #808080;
		font-size: 20rpx;
	}
</style>
