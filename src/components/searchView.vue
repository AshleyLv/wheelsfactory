<template>
	<div class="search-view">
		<div class="search-item clearfix" v-for="item in pluginList">
			<img class="cover" v-bind:src="basePath + '/api/readImage?image='+item.cover">
			<div class="search-content">

				<router-link :to="{ path: 'detail', query: { id: item.id }}" class="title">{{item.name}}</router-link>
				<div class="desc">{{item.description}}</div>
				<div>
					<!--  -->
					<span>创建时间:{{item.creationTime}}</span>
					<span><i class="fa fa-heart"></i>{{item.likeCounter}}</span><span><i class="fa fa-eye"></i>{{item.readCounter}}</span>
				</div>
			</div>
		</div>
		<div class="btn-wrapper">
			<md-button v-if="currentPage<totalPage-rows" type="button" :inverse="true" size="btn-lg" @oneclick="loadMore">更多内容</md-button>
		<!-- 	<div v-if="currentPage>=totalPage-rows && hasload">没有更多内容了</div> -->
		</div>
	</div>
</template>
<script>
	import mdButton from './button'
	import {basePath} from './utils/util.js'
	export default{
		data: function(){
			return {
				pluginList:[],
            	rows:6,
            	currentPage:0,
            	totalPage:0,
            	basePath : basePath,
            	hasload:false
			}
		},
		mounted: function(){
			this.currentPage = 0
			this.pluginList.splice(0,this.pluginList.length)
			this.loadPlugins()
		},
		components:{
        	mdButton
        },
         watch:{
            '$store.state.keyword'(val){
            	if(val){
            		this.currentPage = 0
            		this.pluginList.splice(0,this.pluginList.length)
            		this.loadPlugins()
            	}
            }
        },
		methods:{
			loadPlugins:function(){
				var self = this
				if(this.$route.query.searchtype==='byTag'){
					this.$http.post(basePath+'/api/searchByTag',{'page': this.currentPage,'rows':this.rows,'tagId':this.$route.query.id}).then(function(response){
						let data = response.data
						if(data.status == 0){
							self.totalPage = data.total
							data.result.forEach((element)=>{
								self.pluginList.push(element)
							})
						}

					}, function(response){

					})
				} else if(this.$route.query.searchtype==='bySearch'){
					this.$http.post(basePath+'/api/searchPluginItem',{'page': this.currentPage,'rows':this.rows,'keyword':this.$store.state.keyword}).then(function(response){
						let data = response.data
						if(data.status == 0){
							self.totalPage = data.total
							data.result.forEach((element)=>{
								self.pluginList.push(element)
							})
						}

					}, function(response){

					})
				}

			},
        	loadMore:function(){
				this.currentPage += this.rows
				this.loadPlugins()
				this.hasload = true
        	}
		}
	}
</script>