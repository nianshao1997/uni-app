var QQMapWX = require('./qqmap-wx-jssdk.js');
var qqmapsdk;
let addressData = function() {
	return new Promise((resovle, reject) => {
		qqmapsdk = new QQMapWX({
			key: 'F3CBZ-WJHC6-EAVSX-EVDO6-CUTJV-3ZFGN'
		});
		qqmapsdk.reverseGeocoder({
			success: res => {
				resovle(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
let preView = function(urls, index) {
	return new Promise((resovle, reject) => {
		uni.previewImage({
				urls: urls,
				current: index,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
				}
			})
			.then(res => {
				resovle(res)
			})
			.catch(err => {
				reject(err)
			})
	})
}
let login = function(userInfo){
	return new Promise((resolve,reject)=>{
		let db = wx.cloud.database()
		db.collection('user')
		.add({
			data:userInfo
		})
		.then(res=>{
			resolve(res)
			console.log(res)
		})
		.catch(err=>{
			reject(err)
			console.log(err)
		})
	})
}
export {
	addressData,
	preView,
	login
}
