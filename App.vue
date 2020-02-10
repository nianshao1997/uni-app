<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			if(!wx.cloud){
				console.error('请使用2.2.2或以上的基础库以使用云功能')
			}else{
				wx.cloud.init({
					env:'ns-travel-kciiq',
					traceUser:true
				})
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	::-webkit-scrollbar{
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
