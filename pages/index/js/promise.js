// function readDatabase(dbName,srcName){
// 	return new Promise((resovle,reject){
// 		const db = wx.cloud.database();
// 		db.collection(dbName).get().then(res=>{
// 			console.log(res.data)
// 			srcName = res.data
// 		}).catch(err=>{
// 			console.log(err)
// 		})
// 	})
// }
// export default (dbName)=>{
// 	return new Promise((resovle,reject)=>{
// 		const db = wx.cloud.database();
// 		db.collection(dbName).get().then(res=>{
// 			console.log(res.data)
// 			resovle(res.data)
// 		}).catch(err=>{
// 			reject('读取失败')
// 		})
// 	})
// }
// async function fn () {
// 	await pro('content')
// }
let promise = (dbName)=>{
	return new Promise((resovle,reject)=>{
		const db = wx.cloud.database();
		db.collection(dbName).get().then(res=>{
			console.log(res.data)
			resovle(res.data)
		}).catch(err=>{
			reject('读取失败')
		})
	})
}
let contentPromise = (dbName,count)=>{
	return new Promise((resovle,reject)=>{
		console.log(count)
		const cdb = wx.cloud.database();
		cdb.collection(dbName)
		.limit(6)
		.skip(count * 6)
		.get()
		.then(res=>{
			console.log(dbName,res.data)
			resovle(res.data)
		}).catch(err=>{
			reject('没有数据')
		})
		console.log('end')
	})
}
export {promise,contentPromise}