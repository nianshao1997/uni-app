<template>
	<view class="wrapper">
		<view class="content">
			<block v-for="(item,index) in tabs" :key='index'>
				<text :class="{active:index === num}" @click="exchangeTab(index)">{{item.name}}</text>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		name:'navigation',
		data(){
			return{
				num:0,
				tabs:[
					{
						name:'宝贝'
					},
					{
						name:'详情'
					},
					{
						name:'评价'
					}
				]
			}
		},
		methods:{
			exchangeTab(index){
				this.num = index
				if(index === 0){
					wx.pageScrollTo({
						scrollTop:0
					})
				}else{
					this.$parent.tabScroll(index)
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
		display: flex;
		justify-content: center;
		padding-top: 10rpx;
		background-color: #4CD964;
	}
	.content text{
		margin:10rpx 30rpx ;
		width: 100rpx;
		display: flex;
		justify-content: center;
	}
	.active{
		border-bottom:6rpx solid #292C33;
	}
</style>
