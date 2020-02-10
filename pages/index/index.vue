<template>
	<view class="">
		<homeload v-if="homeload"></homeload>
		<search :iconType="iconType" :bannerSrc="bannerSrc"></search>
		<ticket></ticket>
		<more></more>
		<tab-scroll id="tabScroll" ref='ref1' :tabs="tabs" :class="{'fixed':isFixed}" @load='more'></tab-scroll>
		<view class="" style="height: 130rpx;"> </view>
		<loading v-if="isLoading"></loading>
		<!-- <show-content :content='recommend' :class="{'show':nav === 'recommend','hidden':true}"></show-content>
		<show-content :content='ytcyx' :class="{'show':nav === 'ytcyx','hidden':true}"></show-content>
		<show-content :content='ssyy' :class="{'show':nav === 'ssyy','hidden':true}"></show-content>
		<nothing :class="{'none':none}"></nothing> -->
		<show-content :content="content" v-if="!isLoading"></show-content>
		<nonedata v-if="none"></nonedata>
		<view class="loading-box" v-if="showLoad">
			<uni-load-more :status="status" color="brown"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import showContent from './components/show-content.vue'
	import search from "./search.vue";
	import ticket from "./ticket.vue";
	import more from "./more.vue";
	import tabScroll from "./tab-scroll.vue";
	import {
		promise,
		contentPromise
	} from './js/promise.js';
	import nothing from './components/nothing.vue';
	import {
		mapState
	} from 'vuex'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			search,
			ticket,
			more,
			tabScroll,
			showContent,
			nothing,
			uniLoadMore
		},
		data() {
			return {
				homeload:true,
				showLoad:false,
				status: 'loading',
				nav: 'recommend',
				count: 0,
				isLoading: false,
				content: [],
				none: false,
				ytcyx: [],
				recommend: [],
				ssyy: '',
				tabs: '',
				bannerSrc: '',
				isFixed: false,
				rect: '',
				menutop: '',
				title: 'Hello',
			}
		},
		onLoad() {
			const query = wx.createSelectorQuery();
			query.select('#tabScroll').boundingClientRect();
			query.exec((res) => {
				this.menutop = res[0].top;
			})
		},
		onPageScroll(e) {
			this.rect = e.scrollTop
		},
		onReachBottom() {
			console.log('触底了')
			this.status = 'loading'
			this.showLoad = true
			this.pullon()
		},
		created() {
			console.log('create')
			Promise.all([promise('banner'), promise('tab'), contentPromise('recommend', this.count)])
				.then(res => {
					console.log(this)
					this.bannerSrc = res[0]
					this.tabs = res[1]
					this.content = res[2]
					console.log(res)
					this.homeload = false
				}).catch(err => {
					console.log(err)
				})
			console.log('create')
		},
		methods: {
			pullon() {
				contentPromise(this.nav, ++this.count)
					.then(res => {
						this.content = [...this.content, ...res]
						this.status = res.length === 0 ? 'noMore' : 'more'
					})
					.catch(err => {
						console.log(err)
					})
			},
			more(m){
				this.status = m
				this.showLoad = false
			}
		},
		computed: {
			...mapState(['lists', 'dataobj','load','nonedata']),
			render() {
				this.content = this.lists.list
				//console.log(this.status)
			},
			navdata() {
				this.isLoading = this.dataobj.loading
				console.log(this.isLoading)
				this.nav = this.dataobj.nav
				this.count = this.dataobj.count
			},
			munone(){
				this.none = this.nonedata.none
			},
			namepage() {
				if (this.rect > this.menutop) {
					console.log(this.menutop)
					this.isFixed = true;
				}
				if (this.rect <= this.menutop) {
					console.log(this.menutop)
					this.isFixed = false
				}
			}
		}
	}
</script>

<style scoped>

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* tab-scroll{
		position: relative;
	} */
	.fixed {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
	}

	.show {
		display: flex !important;
	}

	.hidden {
		display: none;
	}

	.none {
		display: none;
	}
	.loading-box{
		height: 160rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
