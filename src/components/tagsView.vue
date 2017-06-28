<template>
	<div class="tag-view">
		<div class="tag-container"><router-link :to="{ path: 'search', query: { id: tag.id,searchtype:'byTag' }}" class="tag" v-bind:style="{fontSize:(16+tag.counts*3)+'px'}" v-for="tag in tagList">{{tag.content}}</router-link></div>
	</div>
</template>
<script>
import {basePath,loadAllTagsApi} from './utils/util.js'
export default{
	data: function(){
		return {
			tagList: []
		}
	},
	mounted: function(){
		this.loadTags()
	},
	methods: {
		loadTags: function(){

        		this.$http.get(basePath+loadAllTagsApi).then((response)=>{
        			let data = response.data
        			if(data.status == 0){
        				data.pluginTagList.forEach((element)=>this.tagList.push(element))
        				
        				
        			}
        			
        		}, function(response){
        			
        		})
		}
	}
}
	
</script>