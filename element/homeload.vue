<template>
	<view class="wrapper">
		<view class="content">
			<image src="../static/tab/homeload.svg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.wrapper{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background-color: rgba(242,243,244.8);
		z-index: 999;
	}
	.content{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		height: 100%;
		align-items: center;
	}
	.content image{
		background-color: rgba(0,0,0,.2);
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}
</style>
