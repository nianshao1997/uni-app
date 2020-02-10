<template>
	<view class="wrapper">
		<view class="loading"></view>
	</view>
</template>

<script>
</script>

<style scoped>
	.wrapper{
		width: 100%;
		padding: 40rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loading{
		border-radius: 50%;
		width: 30rpx;
		height: 30rpx;
		border: 8rpx solid greenyellow;
		border-bottom-color: transparent !important;
		animation: loading .8s linear infinite;
	}
	@keyframes loading{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
</style>
