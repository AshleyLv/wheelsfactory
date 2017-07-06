<template>
	<div class="fw-view">
		<router-link :to="{ path: 'fwDetail', query: { id: fw.id }}" class="fw-card" v-for="fw in frameworkList">
			<img v-lazy="basePath + '/api/readImage?image='+fw.cover" width="660">
			<a class="fw-title">{{fw.title}}</a>
			<div>
				{{fw.description}}
			</div>
			<div class="fw-footer">
				<img v-if="fw.type=='VUE'" src="../assets/vue.png">
						<img v-if="fw.type=='Angular'" src="../assets/angular.jpeg">
						<img v-if="fw.type=='jQuery'" src="../assets/jquery.jpg">
		
					<span class="pull-right card-label">创建时间:{{fw.creationTime}}</span>
		
			</div>
		</router-link>
        <div class="btn-wrapper">
                <md-button v-if="currentPage<totalPage-rows" type="button" :inverse="true" size="btn-lg" @oneclick="loadMore">更多内容</md-button>
                <div v-if="currentPage>=totalPage-rows && hasload">没有更多内容了</div>
            </div>
	</div>
</template>
<script>
	import mdButton from './button'
    import {basePath,loadFrameworkItemsApi} from './utils/util.js'
	export default{
		data: function () {
			return {
				frameworkList:[],
            	rows:8,
            	currentPage:0,
            	totalPage:0,
                hasLoad:false,
                basePath:basePath
			}
		},
		components:{
        	mdButton
        },
        mounted:function(){
        	this.loadFrameworkItems()
        },
        methods:{
        	loadFrameworkItems : function(){
        		var self = this
        		this.$http.post(basePath+loadFrameworkItemsApi,{'page': this.currentPage,'rows':this.rows}).then(function(response){
        			let data = response.data
        			if(data.status == 0){
        				self.totalPage = data.total
        				data.result.forEach((element)=>{
        				self.frameworkList.push(element)
        			})
        			}
        			
        		}, function(response){
        			
        		})
        	},
            loadMore:function(){
                this.currentPage += this.rows
                this.loadFrameworkItems()
                this.hasload = true
            }
        }
	}
</script>