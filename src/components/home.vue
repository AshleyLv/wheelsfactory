<template>
<div class="page">
	<div class="page-content">
    <div class="banner" v-if="!hasFilter">
    <div  class="title">WHEELS FACTORY</div>
        <div class="sub-title">Standing on the shoulders of giants, to see further and more</div>
       <div class="search-bar">
            <input type="text" class="search-input" placeholder="请输入组件的关键词" name="query" v-model="keyword" autocomplete="off" @keyup.enter="search">

            <md-button class="search-btn" @oneclick="search">
            <span>寻找轮子</span>
            </md-button>
      
       </div>
         
       
    </div>
		<div class="card-container row clearfix">
       
			<div class="card-wrapper" v-for="item in pluginList">
				<card :cardObj=item></card>
			</div>
				
		</div>
        <div class="btn-wrapper">
                <md-button v-if="currentPage<totalPage-rows" type="button" :inverse="true" size="btn-lg" @oneclick="loadMore">更多内容</md-button>
               <!--  <div v-if="currentPage>=totalPage-rows && hasload">没有更多内容了</div> -->
            </div>
	</div>
</div>
	
	
</template>
<script>
import card from './card'
import mdButton from './button'
import VueLazyload from 'vue-lazyload'
import {basePath,loadPluginsApi} from './utils/util.js'
    export default{
        data(){
            return{
            	pluginList:[],
            	rows:12,
            	currentPage:0,
            	totalPage:0,
                hasload:false,
                keyword:'',
                hasFilter:false
            }
        },
        components:{
        	card,
        	mdButton
        },
        watch:{
        	'$route.query.filter'(val){
                if(val && val!='search'){
                this.pluginList.splice(0,this.pluginList.length)
                this.currentPage = 0
                this.loadPlugins()
                
                }
                if(val==='all'){
                this.hasFilter=false
                } else{
                this.hasFilter = true
                }
        		
        	}
        },
        mounted: function(){
        	this.loadPlugins()
        },
        methods:{
        	loadPlugins:function(){
        		var self = this
                this.totalPage = 0
        		this.$http.post(basePath+loadPluginsApi,{'page': this.currentPage,'rows':this.rows,'filter':this.$route.query.filter!='all'?this.$route.query.filter:''}).then(function(response){
        			let data = response.data
        			if(data.status == 0){
        				self.totalPage = data.total
        				data.result.forEach((element)=>{
        				self.pluginList.push(element)
        			})
        			}
        			
        		}, function(response){
        			
        		})
        	},
        	loadMore:function(){
				this.currentPage += this.rows
				this.loadPlugins()
                this.hasload = true
        	},
            search: function(){
            if(this.keyword){
             this.$store.dispatch('search')
        this.$store.state.keyword = this.keyword
        this.keyword=''
        this.$store.state.isSearch=true
              this.$router.push({
                path: '/search',
                query: {
                  searchtype: 'bySearch'
                }
              })
            }
       

      }	
        }
    }
</script>