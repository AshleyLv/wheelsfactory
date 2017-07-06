<template>
	<div class="page">
		<div class="fw-detail-view">
			<img v-lazy="basePath + '/api/readImage?image='+fwItem.detailCover" height="606" width="2556" class="fw-cover">

			<div class="fw-btn-group">
				<md-button type="button" class="desc-label" :inverse="true" @btnClick='openLink(fwItem.homepageUrl)' v-if="fwItem.homepageUrl">项目官网</md-button>
				<md-button type="button" class="desc-label" :inverse="true" @btnClick='openLink(fwItem.demoUrl)' v-if="fwItem.demoUrl">查看Demo</md-button>
				<md-button type="button" class="desc-label" :inverse="true" @btnClick='openLink(fwItem.githubUrl)' v-if="fwItem.githubUrl">GitHub</md-button>
			</div>

			<div class="fw-doc">
				<div v-html="fwItem.document">{{fwItem.document}}</div>   
					
	</div>
</div> 
</div>

</template>
<script>
	import Vue from 'vue'
	import mdButton from './button'
	import hljs from 'highlight.js'
	import {basePath,getFrameworkDetailApi} from './utils/util.js'
	export default{
		data(){
			return {
				fwItem:{},
				basePath:basePath
			}
		},
		components:{
			mdButton
		},
		mounted(){
			hljs.initHighlightingOnLoad()
			this.loadFrameworkItem()
		},
		methods: {
			loadFrameworkItem(){
				this.$http.get(basePath+getFrameworkDetailApi+'?id='+this.$route.query.id).then((response)=>{
					let data = response.data
					if(data.status == 0){
						this.fwItem = data.result[0]
						Vue.nextTick(function () {
							document.querySelectorAll('pre code').forEach(function (block,i) {
								hljs.highlightBlock(block)
							})
						})

					}

				}, (response)=>{

				})
			},
			openLink(url){
				window.open(url)
			}
		}
	}
</script>