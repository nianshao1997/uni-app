<template>
	<view class="wrapper">
		<view class="nav" :style="{opacity:opa}" v-if="showNav">
			<navigation></navigation>
		</view>
		<banner :toDatas='toDatas' :toCommentDetails='toCommentDetails'></banner>
		<view class="scroll-content">
			<content :toDatas='toDatas'></content>
		</view>
		<view class="scroll-comment">
			<comment :toCommentTab='toCommentTab'
			:toCommentDetails='toCommentDetails' :data='data'></comment>
		</view>
		<view class="the-bottom" v-if="showNone">
			<nonedata></nonedata>
		</view>
		<homeload v-if="showLoading"></homeload>
	</view>
</template>

<script>
	import navigation from './components/navigation.vue'
	import banner from './components/banner.vue'
	import content from './components/content.vue'
	import comment from './components/comment.vue'
	let db = wx.cloud.database()
	let userInfo = db.collection('userInfo')
	let comments = db.collection('comments')
	export default{
		name:'details',
		components:{
			navigation,
			banner,
			content,
			comment
		},
		data(){
			return{
				showLoading:true,
				showNone:false,
				data:'',
				showNav:false,
				opa:0,
				toDatas:{},
				toCommentTab:[],
				toCommentDetails:[]
			}
		},
		onPageScroll(e){
			let top = e.scrollTop
			this.handleNav(top)
		},
		methods:{
			tabScroll(index){
				if(index === 1){
					this.thePageScroll('.scroll-content')
				}else{
					this.thePageScroll('.scroll-comment')
				}
			},
			thePageScroll(target){
				const query = wx.createSelectorQuery()
				query.select(target).boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec(function(res){
				  wx.pageScrollTo({
					  scrollTop:res[0].top + res[1].scrollTop - 40,
					  duration:300
				  })
				})
			},
			handleNav(top){
				if(top > 90){
					this.showNav = true
					let opa = top / 170
					opa = opa > 1 ? 1 : opa
					this.opa = opa
				}else{
					this.showNav = false
				}
			},
			handleData(data){
				userInfo.where({
					"_id":data
				}).get()
				.then(res=>{
					this.toDatas = res.data[0].datas
					console.log(res)
					this.showLoading = false
					console.log(this.toDatas)
				})
				.catch(err=>{
					console.log(err)
				})
			},
			handleComments(data){
				comments.where({
					id:data
				}).orderBy('aboutComment.time', 'desc')
				.get()
				.then(res=>{
					if(res.data.length === 0){
						this.showNone = true
					}else{
						this.showNone = false
						this.toCommentTab = res.data.map(item=>{
							return item.commentTab
						})
						this.toCommentDetails = res.data.map(item=>{
							return item.aboutComment
						})
						let deNull = this.toCommentTab.filter(item=>item)
						let deRepeat = Array.from(new Set(deNull))
						this.toCommentTab = deRepeat
					}
				})
				.catch(err=>{
					console.log(err)
				})
			},
			handleTabComments(id,tab){
				this.showNone = false
				comments.where({
					id:id,
					commentTab:tab
				}).orderBy('aboutComment.time', 'desc')
				.get()
				.then(res=>{
					this.toCommentDetails = res.data.map(item=>{
						return item.aboutComment
					})
					console.log(res)
				})
				.catch(err=>{
					console.log(err)
				})
			},
			renderComment(item){
				console.log(item)
				if(item === '全部'){
					this.handleComments(this.data)
				}else{
					this.handleTabComments(this.data,item)
				}
			}
		},
		onLoad(e){
			console.log(e)
			let id = e.id
			this.data = id
			this.handleData(this.data)
			this.handleComments(this.data)
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100%;
		}
	.nav{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: 2;
	}
	.the-bottom{
		margin-bottom: 110rpx;
	}
</style>
