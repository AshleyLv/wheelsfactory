<template>
<div class="page">
	<div class="page-content">
		<div class="detail-view">
			<div class="plugin-title">{{pluginObj.name}}</div>
			<div class="sub-title"> 阅读:{{pluginObj.readCounter}}&nbsp;|&nbsp;喜欢:{{pluginObj.likeCounter}}&nbsp;|&nbsp;创建时间:{{pluginObj.creationTime}}</div>
			<div class="view-container clearfix">
				<div class="cover-area">
					
					<img v-lazy="getBasePath() + '/api/readImage?image='+pluginObj.detailCover">
				</div>
				<div class="plugin-info-card">
								<div class="desc-container">
									<div class="desc-title title">插件介绍</div>
									<div class="pull-right" @click='updateLikeCounter'>
										<!-- <md-button type="button" shape="btn-circle" size="btn-xs" class="like-btn" @btnClick='updateLikeCounter'><i class="fa fa-heart"></i></md-button> -->
										<vue-star animate="animated rotateIn" color="#0097a7"  class="like-btn" style="font-size:30px;">
											<i slot="icon" class="fa fa-heart"></i>
										</vue-star>
									</div>
									<p>{{pluginObj.fullDescription}}</p>
								
								<div class="tags">标签:<a class="tag" v-for="tag in tags">{{tag.content}}</a></div>
								<div class="support-container">
									<div class="title">组件兼容性</div>
									<div class="browser-support">
										<img src="../assets/chrome.png" height="48" width="48" v-if="!!pluginObj.chromeSupport">
										<img src="../assets/firefox.png" height="48" width="48" v-if="!!pluginObj.firefoxSupport">
										<img src="../assets/safari.png" height="48" width="48" v-if="!!pluginObj.safariSupport">
										<img src="../assets/opera.png" height="48" width="45" v-if="!!pluginObj.operaSupport">
										<img src="../assets/ie.png" height="48" width="48" v-if="!!pluginObj.ieSupport">
										<span v-if="!!pluginObj.ieSupport">支持ie {{pluginObj.ieSupport}}+</span>

									</div>
								</div>
								<div class="btn-container clearfix">

									<md-button type="button" class="desc-label" @btnClick='getFileDownload' v-if="pluginObj.fileUrl"><i class="fa fa-cloud-download"></i>下载插件</md-button>
									<md-button type="button" class="desc-label" v-if="pluginObj.demoUrl" @btnClick='goDemo'><i class="fa fa-paper-plane"></i>查看Demo</md-button>
									<md-button type="button" class="desc-label" v-if="pluginObj.homepageUrl" @btnClick='goHomePage'><i class="fa fa-github"></i>GitHub</md-button>
								</div>
							</div>
							<div class="label-container">
								<div class="pull-left">
									<img v-if="pluginObj.type=='VUE'" src="../assets/vue.png" height="30" width="30">
									<img v-if="pluginObj.type=='Angular'" src="../assets/angular.jpeg" height="30" width="30">
									<img v-if="pluginObj.type=='jQuery'" src="../assets/jquery.jpg" height="30" width="30">
								</div>
								<div class="pull-right">
									<div class="iShare iShare1">
										<a @click="getShareLink('qzone')" class="iShare_qzone"><i class="iconfont qzone">&#xe610;</i></a>
										<a @click="getShareLink('douban')" class="iShare_douban"><i class="iconfont douban" style="vertical-align: -2px;"></i></a>
										<a @click="getShareLink('weibo')" class="iShare_weibo"><i class="iconfont weibo"></i></a>
										<a @click="toggleWechatModal" class="iShare_wechat"><i class="iconfont wechat" style="vertical-align: -2px;"></i></a>
										<a @click="getShareLink('facebook')" class="iShare_facebook" ><i class="iconfont facebook" style="vertical-align: 1px;"></i></a>
										<a @click="getShareLink('googleplus')" class="iShare_googleplus"><i class="iconfont googleplus" style="vertical-align: -1px;"></i></a>
									</div>



								</div>
							</div>
						</div>

					</div>
					<div class="detail-info-container">
						<template v-if="pluginObj.installDoc!==''">
							<div class="desc-title">安装</div>
							<div v-for="item in installDoc">
								<div v-if="item.doc">{{item.doc}}</div>
								<div v-if="item.code"><div v-highlight><pre><code :class="item.code.type">{{item.code.snippet}}</code></pre></div></div>
							</div>
						</template>
						<template v-if="pluginObj.howToUseDoc!==''">
							<div class="desc-title">插件应用</div>
						<div v-for="item in howtouseDoc">
							<div v-if="item.doc">{{item.doc}}</div>
					<div v-if="item.code"><div v-highlight><pre><code :class="item.code.type">{{item.code.snippet}}</code></pre></div></div>
				</div>
						</template>
						
				<template v-if="!!pluginObj.parameters">
					<div class="desc-title">插件参数</div>
					<table>
						<thead>
							<th>名称</th>
							<th>类型</th>
							<th>默认值</th>
							<th>说明</th>
						</thead>
						<tbody>
							<tr v-for="item in parameters">
								<td>{{item.key}}</td>
								<td>{{item.type}}</td>
								<td>{{item.default}}</td>
								<td>{{item.description}}</td>
							</tr>
						</tbody>
					</table>
				</template>
				<template v-if="!!pluginObj.events">
					<div class="desc-title">事件</div>
					<table>
						<thead>
							<th>名称</th>
							<th>参数</th>
							<th>说明</th>
						</thead>
						<tbody>
							<tr v-for="item in events">
								<td>{{item.name}}</td>
								<td>{{item.params}}</td>
								<td>{{item.desc}}</td>
								
							</tr>
						</tbody>
					</table>
				</template>
				<div>更多前端技术交流请加入QQ群：324672235</div>
			</div>
			<div class="qrcode-modal" id="qrcodeModal">
				<div class="title">分享到微信朋友圈<a class="close-btn" @click="toggleWechatModal">x</a></div>
				<div id="qrcode">
					<qrcode :background="background" :size="size" :cls="qrCls" :value="qrText"></qrcode>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import Qrcode from 'v-qrcode/src/index'
import VueStar from 'vue-star'
import mdButton from './button'
import {basePath} from './utils/util.js'
	export default{
		 data(){
		 	return{
		 		pluginObj:{},
		 		tags:[],
		 		parameters:[],
		 		installDoc:[],
		 		howtouseDoc:[],
		 		events:[],
		 		qrCls: 'qrcode',
		 		qrText: basePath+'/#/detail?id=9',
		 		size: 180,
		 		background: '#fff',
		 		toggleLike:true
		 	}
		 },
        mounted:function(){
        	this.loadPluginItem()
        	this.updateReadCounter()
        	this.getTags()

        document.querySelectorAll('pre code').forEach(function (i, block) {
          hljs.highlightBlock(block)
        })
        },
        components:{
        	mdButton,
        	Qrcode,
        	VueStar
        },
        methods:{
        	loadPluginItem: function(){
        		var self = this
        		this.$http.get(basePath+'/api/getPluginById?id='+this.$route.query.id).then(function(response){
        			let data = response.data
        			if(data.status == 0){
        				this.pluginObj = data.result[0]
        				if(!!this.pluginObj.parameters){
        					let params = eval(this.pluginObj.parameters)
        					params.forEach(function(element){
        						self.parameters.push(element)
        					})
        				}
        				if(!!this.pluginObj.installDoc){
        					let installDoc = eval(this.pluginObj.installDoc)
        					installDoc.forEach(function(element){
        						self.installDoc.push(element)
        					})
        				}
        				if(!!this.pluginObj.howToUseDoc){
        					let howtouseDoc = eval(this.pluginObj.howToUseDoc)
        					howtouseDoc.forEach(function(element){
        						self.howtouseDoc.push(element)
        					})
        				}
        				if(!!this.pluginObj.events){
        					let events = eval(this.pluginObj.events)
        					events.forEach(element=>{
        						this.events.push(element)
        					})
        				}
        				
        			}
        			
        		}, function(response){
        			
        		})
        	},
        	getBasePath:function() {
        		return basePath
        	},
        	updateReadCounter:function(){
        		this.$http.post(basePath+'/api/updateReadCounter',{'id':this.$route.query.id})
        	},
        	updateLikeCounter:function(){
        		if(this.toggleLike){
        			this.$http.post(basePath+'/api/updateLikeCounter',{'id':this.$route.query.id,'isAdding':true})
        			this.pluginObj.likeCounter++
        		} else {
        			this.$http.post(basePath+'/api/updateLikeCounter',{'id':this.$route.query.id,'isAdding':false})
        		this.pluginObj.likeCounter--
        		}
        		this.toggleLike=!this.toggleLike
        		
        	},
        	goHomePage : function(){
        		window.open(this.pluginObj.homepageUrl)
        	},
        	goDemo: function(){
        		window.open(this.pluginObj.demoUrl)
        	},
        	getTags: function(){
        		let self = this
        		this.$http.get(basePath+'/api/getTagByPluginItemId?id='+this.$route.query.id).then(function(response){
        			let data = response.data
        			if(data.status==0){
        				data.pluginTagList.forEach(function(element){
        					self.tags.push(element)
        				})
        			}
        		},function(response){

        		})
        	},
        	getFileDownload:function(){
        		window.location.href=basePath+'/pluginfiles/'+this.pluginObj.fileUrl
        	},
        	getShareLink: function(type){
        		let url = this.getBasePath() + '/#/detail?id=' + this.pluginObj.id
        		let title = '['+this.pluginObj.type+(this.pluginObj.type=='VUE'?'组件':'插件') + ']'+this.pluginObj.name
        		let description = this.pluginObj.description
        		if(type=='qzone'){
        			window.open(`http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${description}`)
        		} else if(type=='douban'){
        			window.open(`http://shuo.douban.com/!service/share?href=${url}&name=${title}&text=${description}`)
        		} else if(type=='weibo'){
        			window.open(`http://service.weibo.com/share/share.php?url=${url}&title=${title}`)
        		} else if(type=='facebook'){
        			window.open(`https://www.facebook.com/sharer/sharer.php?s=100&p[title]=${title}p[summary]=${description}&p[url]=${url}`)
        		} else if(type='googleplus'){
        			window.open(`https://plus.google.com/share?url=${url}&t=${title}`)
        		} else if(type='twitter'){
        			window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`)
        		}
        	},
        	toggleWechatModal: function(){
        		let qrcodeModal = document.getElementById('qrcodeModal')
        		!~qrcodeModal.className.indexOf('show')?qrcodeModal.className+= ' show' : (qrcodeModal.className=qrcodeModal.className.replace('show','')) 

        	}

        }
	}
</script>